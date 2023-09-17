const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config');

const app = express();
const PORT = config.port || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Start the server
mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB at ${config.dbUrl}`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
