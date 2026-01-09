
const Contact = require('../models/Contact');


const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching contacts', 
      error: error.message 
    });
  }
};


const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact not found' 
      });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching contact', 
      error: error.message 
    });
  }
};


const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        message: 'Name, email, and phone are required' 
      });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message: message || ''
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error creating contact', 
      error: error.message 
    });
  }
};


const updateContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, message },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact not found' 
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error updating contact', 
      error: error.message 
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact not found' 
      });
    }

    res.status(200).json({ 
      message: 'Contact deleted successfully',
      deletedContact: contact
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting contact', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};