import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const ContactForm = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleString();

    const payload = {
      ...formData,
      time,
    };

    emailjs
    .send(
        'service_6s8k59i',
        'template_bclueju',
        payload,
        'E9vb1jRf2CGY2Rnbl'
      )
      .then(() => {
        toast.success('Message sent successfully! Please check your email, including the Spam folder.');
        setFormData({ name: '', email: '', title: '', message: '' });
      })
      .catch((error) => {
        console.error(error.text);
        toast.error('Something went wrong. Please try again!');
      });
      
  };

  // Tailwind classes based on theme
  const inputBase = 'w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2';
  const inputTheme = theme === 'dark'
    ? 'bg-gray-800 text-white border-gray-700 focus:ring-blue-400'
    : 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500';

  const labelTheme = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  const formBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 p-8 rounded-lg shadow-lg ${formBg} mb-8`}>
      <div>
        <label className={`block text-sm font-medium mb-1 ${labelTheme}`}>Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className={`${inputBase} ${inputTheme}`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${labelTheme}`}>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`${inputBase} ${inputTheme}`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${labelTheme}`}>Subject / Title</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className={`${inputBase} ${inputTheme}`}
        />
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${labelTheme}`}>Message</label>
        <textarea
          name="message"
          required
          rows={2}
          value={formData.message}
          onChange={handleChange}
          className={`${inputBase} ${inputTheme}`}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
