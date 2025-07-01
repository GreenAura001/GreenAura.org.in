    // Mobile menu toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
      const mobileToggle = document.getElementById('mobile-toggle');
      const navMenu = document.getElementById('nav-menu');
      
      if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
          navMenu.classList.toggle('active');
          mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
          });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
          if (!mobileToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
          }
        });
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