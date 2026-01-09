
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const contactRoutes = require('./routes/contactRoutes');

const app = express();


app.use(cors({
  origin: "https://contact-management-frontend-z1da.onrender.com", 
  methods: ["GET", "POST","PUT","DELETE"],        
  credentials: true                
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contactsdb';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error(' MongoDB Connection Error:', err));


app.use('/api/contacts', contactRoutes);



app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact Management API',
    version: '1.0.0',
    endpoints: {
     
      contacts: '/api/contacts'
    }
  });
});


app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl
  });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` API available at http://localhost:${PORT}/api/contacts`);
 
});
