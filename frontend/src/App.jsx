import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, Phone, MessageSquare, ArrowUpDown } from 'lucide-react';

import Input from './components/Input';
import TextArea from './components/TextArea';
import Alert from './components/Alert';
import ContactCard from './components/ContactCard';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');

  const validators = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9]\d{9}$/,
  };

  useEffect(() => {
    let isMounted = true;

    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${API_URL}/contacts`);
        if (isMounted) {
          setContacts(res.data);
        }
      } catch (error) {
        if (isMounted) {
          console.log(error);
          setAlert({
            type: 'error',
            message: 'Failed to fetch contacts',
          });
        }
      }
    };

    fetchContacts();

    return () => {
      isMounted = false;
    };
  }, []);

 
  const validateField = (name, value) => {
    if (name !== 'message' && !value.trim()) {
      return `${name} is required`;
    }

    if (validators[name] && !validators[name].test(value)) {
      const messages = {
        name: 'Name must be 2–50 letters only',
        email: 'Enter a valid email address',
        phone: 'Phone must be 10 digits starting with 6–9',
      };
      return messages[name];
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setAlert({ type: 'error', message: 'Please fix the errors' });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/contacts`, formData);
      setContacts((prev) => [res.data, ...prev]);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setAlert({ type: 'success', message: 'Contact added successfully' });
    } catch (error) {
      console.log(error);
      setAlert({ type: 'error', message: 'Failed to add contact' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setAlert({ type: 'success', message: 'Contact deleted' });
    } catch (error) {
      console.log(error);
      setAlert({ type: 'error', message: 'Delete failed' });
    }
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    setContacts((prev) => [...prev].reverse());
  };

 
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}

        <div className="grid md:grid-cols-2 gap-6">
         
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Add Contact</h2>

            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
              required
            />

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
            />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              icon={Phone}
              required
              maxLength={10}
              placeholder="9876543210"
            />

            <TextArea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              icon={MessageSquare}
              rows={4}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium ${
                loading
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? 'Saving...' : 'Add Contact'}
            </button>
          </div>

         
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Contacts ({contacts.length})
              </h2>

              <button
                onClick={toggleSort}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {contacts.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                  No contacts yet
                </p>
              ) : (
                contacts.map((contact) => (
                  <ContactCard
                    key={contact._id}
                    contact={contact}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
