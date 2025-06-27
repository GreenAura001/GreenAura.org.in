document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Animation for menu icon
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
      });
    }
    
    // Auto-hide success messages after 5 seconds
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
      setTimeout(function() {
        successMessage.style.opacity = '0';
        setTimeout(function() {
          successMessage.style.display = 'none';
        }, 500);
      }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Dynamic Testimonials
    const testimonialSlider = document.getElementById('testimonial-slider');
    const testimonialDots = document.getElementById('testimonial-dots');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    if (testimonialSlider) {
      let testimonials = [];
      let currentTestimonialIndex = 0;
      
      // Fetch testimonials from JSON file
      fetch('/data/testimonials.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          testimonials = data.testimonials;
          if (testimonials.length > 0) {
            renderTestimonials();
            setupTestimonialControls();
          } else {
            testimonialSlider.innerHTML = '<p>No testimonials available.</p>';
          }
        })
        .catch(error => {
          console.error('Error fetching testimonials:', error);
          testimonialSlider.innerHTML = '<p>Failed to load testimonials. Please try again later.</p>';
        });
      
      // Render testimonials
      function renderTestimonials() {
        // Clear loader
        testimonialSlider.innerHTML = '';
        
        // Create testimonial elements
        testimonials.forEach((testimonial, index) => {
          const testimonialElement = document.createElement('div');
          testimonialElement.className = 'testimonial';
          testimonialElement.style.display = index === currentTestimonialIndex ? 'block' : 'none';
          testimonialElement.style.opacity = index === currentTestimonialIndex ? '1' : '0';
          
          const testimonialContent = `
            <div class="testimonial-content">
              <p>"${testimonial.text}"</p>
              <div class="client">
                ${testimonial.image ? `<img src="${testimonial.image}" alt="${testimonial.name}" class="client-image">` : ''}
                <div class="client-info">
                  <span class="name">${testimonial.name}</span>
                  <span class="location">${testimonial.location}</span>
                </div>
              </div>
            </div>
          `;
          
          testimonialElement.innerHTML = testimonialContent;
          testimonialSlider.appendChild(testimonialElement);
        });
        
        // Create dots for pagination
        testimonialDots.innerHTML = '';
        testimonials.forEach((_, index) => {
          const dot = document.createElement('span');
          dot.className = `dot ${index === currentTestimonialIndex ? 'active' : ''}`;
          dot.addEventListener('click', () => goToTestimonial(index));
          testimonialDots.appendChild(dot);
        });
      }
      
      // Setup controls
      function setupTestimonialControls() {
        if (prevButton && nextButton) {
          prevButton.addEventListener('click', () => {
            goToTestimonial((currentTestimonialIndex - 1 + testimonials.length) % testimonials.length);
          });
          
          nextButton.addEventListener('click', () => {
            goToTestimonial((currentTestimonialIndex + 1) % testimonials.length);
          });
        }
        
        // Auto rotate testimonials
        setInterval(() => {
          if (!document.hidden) { // Only rotate when page is visible
            goToTestimonial((currentTestimonialIndex + 1) % testimonials.length);
          }
        }, 6000);
      }
      
      // Go to specific testimonial
      function goToTestimonial(index) {
        const testimonialElements = testimonialSlider.querySelectorAll('.testimonial');
        const dots = testimonialDots.querySelectorAll('.dot');
        
        // Hide current testimonial
        if (testimonialElements[currentTestimonialIndex]) {
          testimonialElements[currentTestimonialIndex].style.opacity = '0';
          setTimeout(() => {
            testimonialElements[currentTestimonialIndex].style.display = 'none';
            
            // Show new testimonial
            currentTestimonialIndex = index;
            testimonialElements[currentTestimonialIndex].style.display = 'block';
            
            setTimeout(() => {
              testimonialElements[currentTestimonialIndex].style.opacity = '1';
            }, 50);
            
            // Update dots
            dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === currentTestimonialIndex);
            });
          }, 300);
        }
      }
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Get all required inputs
        const requiredInputs = contactForm.querySelectorAll('[required]');
        
        // Check each required input
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            
            // Add error class
            input.classList.add('error');
            
            // Create error message if doesn't exist
            let errorMsg = input.parentNode.querySelector('.error-message');
            if (!errorMsg) {
              errorMsg = document.createElement('div');
              errorMsg.className = 'error-message';
              errorMsg.textContent = 'This field is required';
              input.parentNode.appendChild(errorMsg);
            }
          } else {
            // Remove error class
            input.classList.remove('error');
            
            // Remove error message if exists
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) {
              errorMsg.remove();
            }
          }
        });
        
        // Email validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailInput.value)) {
            isValid = false;
            
            // Add error class
            emailInput.classList.add('error');
            
            // Create error message if doesn't exist
            let errorMsg = emailInput.parentNode.querySelector('.error-message');
            if (!errorMsg) {
              errorMsg = document.createElement('div');
              errorMsg.className = 'error-message';
              errorMsg.textContent = 'Please enter a valid email address';
              emailInput.parentNode.appendChild(errorMsg);
            } else {
              errorMsg.textContent = 'Please enter a valid email address';
            }
          }
        }
        
        // Prevent form submission if invalid
        if (!isValid) {
          e.preventDefault();
        }
      });
      
      // Clear error messages on input
      contactForm.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
          // Remove error class
          this.classList.remove('error');
          
          // Remove error message if exists
          const errorMsg = this.parentNode.querySelector('.error-message');
          if (errorMsg) {
            errorMsg.remove();
          }
        });
      });
    }
    
    // Add animation to feature cards when they come into view
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
      const observeFeatures = () => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        
        featureCards.forEach(card => {
          observer.observe(card);
        });
      };
      
      // Check if IntersectionObserver is supported
      if ('IntersectionObserver' in window) {
        observeFeatures();
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        featureCards.forEach(card => {
          card.classList.add('animate');
        });
      }
    }
  });

  // scripts/scroll-bar.js
document.addEventListener('DOMContentLoaded', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
      // Calculate scroll percentage
      const winScroll = window.pageYOffset || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      // Update scroll progress bar width
      scrollProgress.style.width = scrolled + '%';
  });
});

// Simple Hero Section JavaScript for Green Aura
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for CTA buttons (if they're anchor links)
    const ctaButtons = document.querySelectorAll('.cta-buttons a');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply smooth scroll for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Simple fade-in animation on page load
    const heroContent = document.querySelector('.hero .container');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Basic analytics tracking
    function trackEvent(action, element) {
        console.log(`Green Aura Hero: ${action} on ${element}`);
        
        // Add your analytics code here
        // Example: gtag('event', action, { event_category: 'Hero', event_label: element });
    }
    
    // Track button clicks
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button Click', buttonText);
        });
    });
});

        function openGmailCompose() {
            const email = 'contact@greenaura.in';
            const subject = encodeURIComponent('Garden Consultation Inquiry');
            const body = encodeURIComponent('Hi Green Aura Team,\n\nI am interested in your garden consultation services. Please contact me to discuss my requirements.\n\nThank you!');
            
            // Detect device type
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isAndroid = /Android/i.test(navigator.userAgent);
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            
            if (isMobile) {
                // For mobile devices, prioritize opening the Gmail app
                if (isAndroid) {
                    // Android Gmail app deep link
                    const androidGmailUrl = `intent://send?to=${email}&subject=${subject}&body=${body}#Intent;scheme=mailto;package=com.google.android.gm;end`;
                    window.location.href = androidGmailUrl;
                } else if (isIOS) {
                    // iOS Gmail app deep link
                    const iosGmailUrl = `googlegmail://co?to=${email}&subject=${subject}&body=${body}`;
                    window.location.href = iosGmailUrl;
                    
                    // Fallback for iOS if Gmail app is not installed
                    setTimeout(() => {
                        // Try default iOS mail app
                        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                    }, 2000);
                } else {
                    // Other mobile devices - try Gmail app, then mailto
                    const gmailAppUrl = `googlegmail://co?to=${email}&subject=${subject}&body=${body}`;
                    window.location.href = gmailAppUrl;
                    
                    setTimeout(() => {
                        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                    }, 2000);
                }
            } else {
                // Desktop - open Gmail popup compose window
                const gmailPopupUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}&tf=1`;
                
                try {
                    const newWindow = window.open(gmailPopupUrl, '_blank');
                    
                    // Fallback to mailto if popup is blocked
                    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                    }
                } catch (e) {
                    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                }
            }
        }
        function toggleFAQ(button) {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        }