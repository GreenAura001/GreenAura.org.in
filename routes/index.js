const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Function to get testimonials data
function getTestimonials() {
  try {
    const testimonialsPath = path.join(__dirname, '..', 'public', 'data', 'testimonials.json');
    const testimonialsData = fs.readFileSync(testimonialsPath, 'utf8');
    return JSON.parse(testimonialsData);
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return { testimonials: [] };
  }
}

// Home page
router.get('/', (req, res) => {
  const testimonials = getTestimonials();
  res.render('index', { 
    title: 'Green Aura',
    image: "../images/hero-bg.jpg",
    activeRoute: 'home',
    testimonials: testimonials.testimonials // Pass testimonials to the template
  });
});

// Services page
router.get('/services', (req, res) => {
  res.render('services', { 
    title: 'Our Services - Green Aura',
    activeRoute: 'services'
  });
});

// Portfolio page
router.get('/portfolio', (req, res) => {
  res.render('portfolio', { 
    title: 'Our Portfolio - Green Aura',
    activeRoute: 'portfolio'
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us - Green Aura',
    activeRoute: 'about'
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us - Green Aura',
    activeRoute: 'contact'
  });
});

// Contact form submission
router.post('/contact', (req, res) => {
  // Here you would typically handle the form submission
  // e.g., send an email, store in database, etc.
  console.log('Form submission:', req.body);
  res.render('contact', { 
    title: 'Contact Us - Green Aura',
    activeRoute: 'contact',
    message: 'Thank you for your message. We will get back to you soon!'
  });
});

module.exports = router;