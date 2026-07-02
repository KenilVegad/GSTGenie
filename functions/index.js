const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const twilio = require("twilio");

admin.initializeApp();

// Set API keys from Firebase config
sgMail.setApiKey(functions.config().sendgrid.key);
const twilioClient = twilio(
  functions.config().twilio.sid,
  functions.config().twilio.token
);

// Firestore collections
const db = admin.firestore();
const usersCollection = db.collection("users");
const remindersCollection = db.collection("reminders");

/**
 * @name dailyReminderCheckLogic
 * @description Logic for checking reminders and sending notifications.
 */
const dailyReminderCheckLogic = async () => {
    const now = admin.firestore.Timestamp.now();
    const sevenDaysFromNow = admin.firestore.Timestamp.fromMillis(
      now.toMillis() + 7 * 24 * 60 * 60 * 1000
    );
    const threeDaysFromNow = admin.firestore.Timestamp.fromMillis(
      now.toMillis() + 3 * 24 * 60 * 60 * 1000
    );

    const reminders = await remindersCollection
      .where("date", ">=", now)
      .where("date", "<=", sevenDaysFromNow)
      .get();

    if (reminders.empty) {
      console.log("No upcoming reminders.");
      return null;
    }

    reminders.forEach(async (reminderDoc) => {
      const reminder = reminderDoc.data();
      const user = await usersCollection.doc(reminder.userId).get();

      if (!user.exists) {
        console.log(`User not found for reminder: ${reminderDoc.id}`);
        return;
      }

      const userPrefs = user.data().notifications;
      const reminderDate = reminder.date.toDate();
      const daysUntil = Math.round((reminderDate - now.toDate()) / (1000 * 60 * 60 * 24));

      if (daysUntil === 7 || daysUntil === 3 || daysUntil === 0) {
        if (userPrefs.email) {
          sendEmail(reminder.email, reminder.task, daysUntil);
        }
        if (userPrefs.sms) {
          sendSms(reminder.phone, reminder.task, daysUntil);
        }
        if (userPrefs.whatsapp) {
          sendWhatsapp(reminder.phone, reminder.task, daysUntil);
        }
        if (userPrefs.push) {
          sendPushNotification(reminder.userId, reminder.task, daysUntil);
        }
      }
    });
}

/**
 * @name testReminders
 * @description Manually triggers the reminder check logic for testing.
 */
exports.testReminders = functions.https.onRequest(async (req, res) => {
  try {
    await dailyReminderCheckLogic();
    res.status(200).send("Reminder check initiated successfully!");
  } catch (error) {
    console.error("Error initiating reminder check:", error);
    res.status(500).send("An error occurred while initiating the reminder check.");
  }
});

/**
 * @name dailyReminderCheck
 * @description Runs daily to check for upcoming reminders and send notifications.
 */
exports.dailyReminderCheck = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    await dailyReminderCheckLogic();
  });

// Helper functions to send notifications

function sendEmail(email, task, daysUntil) {
  const msg = {
    to: email,
    from: "reminders@your-domain.com", // Use your verified SendGrid email
    subject: `Reminder: ${task}`,
    text: `You have a task coming up in ${daysUntil} days: ${task}`,
  };
  sgMail.send(msg).then(() => console.log("Email sent.")).catch(err => console.error(err));
}

function sendSms(phone, task, daysUntil) {
  twilioClient.messages
    .create({
      body: `Reminder: You have a task coming up in ${daysUntil} days: ${task}`,
      from: functions.config().twilio.phone_number,
      to: phone,
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
}

function sendWhatsapp(phone, task, daysUntil) {
  twilioClient.messages
    .create({
      body: `Reminder: You have a task coming up in ${daysUntil} days: ${task}`,
      from: `whatsapp:${functions.config().twilio.whatsapp_number}`,
      to: `whatsapp:${phone}`,
    })
    .then(message => console.log(message.sid))
    .catch(err => console.error(err));
}

async function sendPushNotification(userId, task, daysUntil) {
    const user = await usersCollection.doc(userId).get();
    const fcmToken = user.data().fcmToken; // Assuming you store the FCM token in the user's document

    if (fcmToken) {
        const payload = {
            notification: {
                title: "Upcoming Reminder",
                body: `You have a task coming up in ${daysUntil} days: ${task}`,
            },
        };

        try {
            await admin.messaging().sendToDevice(fcmToken, payload);
            console.log("Push notification sent successfully.");
        } catch (error) {
            console.error("Error sending push notification:", error);
        }
    }
}
