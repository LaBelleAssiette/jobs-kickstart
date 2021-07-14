require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const ip = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 8080;

const ingredientsRoutes = require('./routes/ingredients.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', ingredientsRoutes);

mongoose.connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
)
    .then(() => console.log('Connected to MongoDB !'))
    .catch((err) => console.log('Failed to connect to MongoDB !' + err));

mongoose.connection.on('open', () => {
  console.log(`Server is running on port ${PORT}`);
  app.listen(PORT, ip);
});


