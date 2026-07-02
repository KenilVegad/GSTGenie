
const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
// const admin = require('firebase-admin');
// const twilio = require('twilio');

// // Twilio configuration
// const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Replace with your Account SID
// const authToken = 'YOUR_TWILIO_AUTH_TOKEN';   // Replace with your Auth Token
// const client = new twilio(accountSid, authToken);
// const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER'; // Replace with your Twilio phone number


// Get all reminders
router.get('/', async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.json(reminders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new reminder
router.post('/', async (req, res) => {
    const reminder = new Reminder({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });

    try {
        const newReminder = await reminder.save();

        // // Send a push notification
        // const message = {
        //     notification: {
        //         title: 'New Compliance Reminder',
        //         body: newReminder.title
        //     },
        //     token: 'YOUR_REGISTRATION_TOKEN' // Replace with the actual registration token
        // };

        // admin.messaging().send(message)
        //     .then((response) => {
        //         console.log('Successfully sent message:', response);
        //     })
        //     .catch((error) => {
        //         console.log('Error sending message:', error);
        //     });

        res.status(201).json(newReminder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Send a test message
router.post('/send-message', async (req, res) => {
    const { message, phoneNumber } = req.body;

    if (!message || !phoneNumber) {
        return res.status(400).json({ message: 'Message and phone number are required' });
    }

    try {
        // // Send a push notification
        // const notification = {
        //     notification: {
        //         title: 'Test Message',
        //         body: message
        //     },
        //     token: 'YOUR_REGISTRATION_TOKEN' // Replace with the actual registration token
        // };

        // const pushResponse = await admin.messaging().send(notification);
        // console.log('Successfully sent push notification:', pushResponse);

        // // Send an SMS
        // const smsResponse = await client.messages.create({
        //     body: message,
        //     from: twilioPhoneNumber,
        //     to: phoneNumber
        // });
        // console.log('Successfully sent SMS:', smsResponse.sid);

        res.status(200).json({
            message: 'Messages sent successfully',
            // pushResponse,
            // smsSid: smsResponse.sid
        });

    } catch (error) {
        console.log('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
});

// Get a specific reminder
router.get('/:id', getReminder, (req, res) => {
    res.json(res.reminder);
});

// Update a reminder
router.patch('/:id', getReminder, async (req, res) => {
    if (req.body.title != null) {
        res.reminder.title = req.body.title;
    }
    if (req.body.description != null) {
        res.reminder.description = req.body.description;
    }
    if (req.body.dueDate != null) {
        res.reminder.dueDate = req.body.dueDate;
    }
    if (req.body.isCompleted != null) {
        res.reminder.isCompleted = req.body.isCompleted;
    }

    try {
        const updatedReminder = await res.reminder.save();
        res.json(updatedReminder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a reminder
router.delete('/:id', getReminder, async (req, res) => {
    try {
        await res.reminder.remove();
        res.json({ message: 'Deleted Reminder' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getReminder(req, res, next) {
    let reminder;
    try {
        reminder = await Reminder.findById(req.params.id);
        if (reminder == null) {
            return res.status(404).json({ message: 'Cannot find reminder' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.reminder = reminder;
    next();
}

module.exports = router;
