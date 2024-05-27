// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const indexRoute = require('./routes/indexroute');
require('dotenv').config();

console.log(process.env.MONGO_URI)
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', indexRoute);
app.use('/api/auth', authRoutes);
// app.use('/api/books', (req, res)=>{
//     console.log(req.path)
//     res.send(req.body)
// });
app.use('/api/books', bookRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
