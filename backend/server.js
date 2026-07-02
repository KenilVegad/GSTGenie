
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (replace with your connection string)
const dbURI = 'mongodb://localhost:27017/compliance-reminders';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// API Routes
app.get('/', (req, res) => {
    res.send('Compliance Reminder API');
});

// Reminder routes
const reminderRoutes = require('./routes/reminders');
app.use('/api/reminders', reminderRoutes);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
