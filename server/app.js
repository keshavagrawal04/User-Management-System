require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.status(200).json({ message: "Simple API's For User Management System" });
});

const { userRouter } = require('./routes');
app.use('/api/user', userRouter);

module.exports = app;
