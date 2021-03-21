const express = require('express');
const mongoose = require('mongoose');
const router = require('./src/router');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv:'; //'mongodb://localhost/mern_deploy'

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch(error => {
    console.log(error.reason);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/posts', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
