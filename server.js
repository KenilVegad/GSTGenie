
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// IMPORTANT: Replace with your credentials.
// You need to create a project in the Google Cloud Console,
// enable the Google Calendar API, and get your credentials.
const credentials = require('./serviceAccountKey.json');

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/calendar.events'],
});

const calendar = google.calendar({ version: 'v3', auth });

app.post('/api/create-event', async (req, res) => {
  try {
    const { summary, description, start, end, attendees } = req.body;

    const event = {
      summary,
      description,
      start: {
        dateTime: start,
        timeZone: 'America/Los_Angeles', // Replace with your timezone
      },
      end: {
        dateTime: end,
        timeZone: 'America/Los_Angeles', // Replace with your timezone
      },
      attendees,
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
