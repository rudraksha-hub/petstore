// Enhanced JavaScript for Hum Tum Aur Poonch Pet Grooming Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractiveElements();
    initializeFloatingEmojis();
    initializeBackToTop();
    initializeServiceInteractions();
    initializeTestimonialEffects();
    initializeContactInteractions();
    
    console.log('🐾 Hum Tum Aur Poonch website loaded successfully!');
});

// Navigation functionality - FIXED
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // FIXED: Handle all navigation and button clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"], .hero__cta, .btn');
        
        if (target) {
            const href = target.getAttribute('href');
            
            // Handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (navToggle) navToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            }
            
            // Handle hero CTA button specifically
            if (target.classList.contains('hero__cta')) {
                e.preventDefault();
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = servicesSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Handle phone and email links
            if (href && href.startsWith('tel:')) {
                showNotification('📞 Opening phone app to call +91 7600243900', 'success');
            }
            
            if (href && href.startsWith('mailto:')) {
                showNotification('📧 Opening email client...', 'success');
            }
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && 
            !navToggle.contains(e.target) && 
            !navMenu.contains(e.target) && 
            !e.target.closest('.nav__link')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll effects - ENHANCED
function initializeScrollEffects() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background effect
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Handle back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (scrollTop > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        lastScrollTop = scrollTop;
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Update active navigation link based on scroll position - FIXED
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animation effects using Intersection Observer
function initializeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .contact-card, .pricing-card, .service-highlight'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered delay for grid items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        element.style.animationFillMode = 'both';
        
        observer.observe(element);
    });
}

// Interactive elements - ENHANCED
function initializeInteractiveElements() {
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card, .pricing-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 15px 35px rgba(255, 127, 80, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn, .contact-btn, .social-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        button.addEventListener('click', function() {
            // Create click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Service item interactive effects - ENHANCED
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const price = this.querySelector('.service-price');
            if (price) {
                price.style.transform = 'scale(1.15)';
                price.style.color = '#FF6347';
                price.style.fontWeight = 'bold';
                price.style.transition = 'all 0.3s ease';
            }
            
            // Add glow effect
            this.style.boxShadow = '0 0 15px rgba(255, 127, 80, 0.3)';
            this.style.backgroundColor = 'rgba(255, 127, 80, 0.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const price = this.querySelector('.service-price');
            if (price) {
                price.style.transform = 'scale(1)';
                price.style.color = '';
                price.style.fontWeight = '';
            }
            this.style.boxShadow = '';
            this.style.backgroundColor = '';
        });
    });
}

// Floating emojis animation - ENHANCED
function initializeFloatingEmojis() {
    const emojis = document.querySelectorAll('.emoji-float');
    
    emojis.forEach((emoji, index) => {
        // Random initial positions
        const randomX = Math.random() * (window.innerWidth - 50);
        const randomY = Math.random() * (window.innerHeight - 50);
        
        emoji.style.left = randomX + 'px';
        emoji.style.top = randomY + 'px';
        emoji.style.transition = 'all 8s ease-in-out';
        
        // Add random movement
        function moveEmoji() {
            const newX = Math.random() * (window.innerWidth - 50);
            const newY = Math.random() * (window.innerHeight - 50);
            
            emoji.style.left = newX + 'px';
            emoji.style.top = newY + 'px';
        }
        
        setInterval(moveEmoji, 8000 + (index * 1000)); // Staggered timing
        
        // Add hover effect
        emoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(2) rotate(360deg)';
            this.style.opacity = '1';
            this.style.zIndex = '999';
            this.style.transition = 'all 0.5s ease';
        });
        
        emoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.opacity = '0.3';
            this.style.zIndex = '1';
        });
    });
}

// Back to top functionality - FIXED
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// Service interactions - ENHANCED
function initializeServiceInteractions() {
    // Pricing calculator effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            const price = this.querySelector('.pricing-value');
            const service = this.querySelector('.pricing-header');
            if (price && service) {
                const priceText = price.textContent;
                const serviceText = service.textContent;
                showNotification(`💰 ${serviceText}: ${priceText} - Call +91 7600243900 to book!`, 'info');
            }
        });
    });

    // Package highlights
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        const badge = card.querySelector('.package-badge');
        if (badge) {
            setInterval(() => {
                badge.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 200);
            }, 3000);
        }
    });

    // Service category animations
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.6s ease';
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        title.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = '';
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Include list interactions
    const includeItems = document.querySelectorAll('.includes-list li');
    includeItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const checkIcon = this.querySelector('.fas');
            if (checkIcon) {
                checkIcon.style.transform = 'scale(1.3) rotate(360deg)';
                checkIcon.style.color = '#FFD700';
                checkIcon.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const checkIcon = this.querySelector('.fas');
            if (checkIcon) {
                checkIcon.style.transform = 'scale(1) rotate(0deg)';
                checkIcon.style.color = '';
            }
        });
    });
}

// Testimonial effects - ENHANCED WITH STAR RATINGS
function initializeTestimonialEffects() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        // Rating stars animation - FIXED
        const stars = card.querySelectorAll('.testimonial-rating .fas');
        
        // Ensure stars are visible and properly styled
        stars.forEach(star => {
            star.style.color = '#FFD700';
            star.style.fontSize = '1.2rem';
            star.style.marginRight = '2px';
        });
        
        card.addEventListener('mouseenter', function() {
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.3) rotate(360deg)';
                    star.style.color = '#FF7F50';
                    star.style.transition = 'all 0.3s ease';
                }, index * 100);
            });
            
            // Add card glow effect
            this.style.boxShadow = '0 15px 35px rgba(255, 127, 80, 0.2)';
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            stars.forEach(star => {
                star.style.transform = 'scale(1) rotate(0deg)';
                star.style.color = '#FFD700';
            });
            
            this.style.boxShadow = '';
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add reading effect
        const text = card.querySelector('.testimonial-text');
        if (text) {
            card.addEventListener('click', function() {
                text.style.fontSize = '1.1em';
                text.style.color = '#FF7F50';
                text.style.fontWeight = 'bold';
                text.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    text.style.fontSize = '';
                    text.style.color = '';
                    text.style.fontWeight = '';
                }, 3000);
            });
        }
    });
}

// Contact interactions - FIXED
function initializeContactInteractions() {
    // Phone number interactions
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            showNotification('📞 Opening phone app to call +91 7600243900...', 'success');
            
            // Add calling animation
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'pulse 1s ease infinite';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 2000);
            }
        });
    });

    // Email interactions
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            showNotification('📧 Opening email client for Cuddlesnbubblesludhiana@gmail.com...', 'success');
        });
    });

    // WhatsApp interactions
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            showNotification('💬 Opening WhatsApp...', 'success');
        });
    });

    // Social media interactions
    const socialLinks = document.querySelectorAll('.social-btn');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.classList.contains('instagram') ? 'Instagram' : 
                           this.classList.contains('facebook') ? 'Facebook' : 
                           this.classList.contains('whatsapp') ? 'WhatsApp' : 'Social Media';
            showNotification(`🌐 Opening ${platform}...`, 'info');
        });
    });

    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 8px 25px rgba(255, 127, 80, 0.3)';
                icon.style.transition = 'all 0.3s ease';
            }
            
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '';
            }
            
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Notification system - ENHANCED
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; margin-left: 10px;">&times;</button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 30px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 4000);
}

// Add CSS animations keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .nav__link.active {
        background: linear-gradient(135deg, #FF7F50, #FFA07A);
        color: white !important;
        border-radius: 25px;
    }
`;
document.head.appendChild(style);

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on mobile devices
    if (window.innerWidth <= 768) {
        const floatingEmojis = document.querySelectorAll('.emoji-float');
        floatingEmojis.forEach(emoji => {
            emoji.style.animationDuration = '10s'; // Slower on mobile
        });
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        const animations = document.querySelectorAll('[style*="animation"]');
        animations.forEach(element => {
            if (document.hidden) {
                element.style.animationPlayState = 'paused';
            } else {
                element.style.animationPlayState = 'running';
            }
        });
    });
}

// Initialize performance optimizations
window.addEventListener('load', function() {
    optimizeAnimations();
    
    // Add loading animation
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// Handle window resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('resize', debounce(function() {
    // Recalculate floating emoji positions
    const emojis = document.querySelectorAll('.emoji-float');
    emojis.forEach(emoji => {
        emoji.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        emoji.style.top = Math.random() * (window.innerHeight - 50) + 'px';
    });
}, 250));

console.log('🐾 All interactive features loaded and fixed successfully!');