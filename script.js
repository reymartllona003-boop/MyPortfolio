// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinkItems = document.querySelectorAll('.nav-link');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only process if href is more than just '#'
        if (href && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add a subtle highlight effect to the About Me section when clicked
                if (href === '#about') {
                    const heroRight = document.querySelector('.hero-right');
                    heroRight.style.animation = 'none';
                    setTimeout(() => {
                        heroRight.style.animation = 'fadeInRight 0.8s ease-out';
                    }, 10);
                }
            }
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Parallax effect disabled per user request

// Tab switching functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding panel
        const tabId = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// VIEW MORE button functionality
const viewMoreBtn = document.querySelector('.cta-btn');
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
        // Scroll to portfolio section
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // If portfolio section doesn't exist yet, show message
            alert('Portfolio section coming soon!\n\nThis will showcase my projects and work.');
        }
    });
}

// ============================================
// PROJECT DETAILS MODAL FUNCTIONALITY
// ============================================

// Project data with detailed information
const projectData = {
    'kilo-bot': {
        category: 'EMBEDDED SYSTEMS',
        title: 'Smart AI Kilo Bot: Intelligent Weighing and Pricing System',
        image: 'images/kilo-bot.png',
        description: 'An innovative weighing system that combines AI technology with precision measurement to automatically identify items and calculate pricing. Features a modern touchscreen interface for seamless user interaction.',
        details: {
            overview: 'The Smart AI Kilo Bot is an advanced weighing system designed to revolutionize retail and market operations by combining artificial intelligence with precision measurement technology.',
            features: [
                'AI-powered item recognition and classification',
                'Automatic price calculation based on weight and item type',
                'Real-time inventory tracking and analytics',
                'High-precision load cell sensors for accurate measurements',
                'User-friendly interface with visual feedback'
            ],
            technologies: ['Raspberry Pi',
                'Python',
                'Yolo 11',
                'Touch Display',
                'Load Cell Sensors']
        }
    },
    'smart-locker': {
        category: 'IoT',
        title: 'Smart Locker System using Raspberry Pi',
        image: 'images/smart-locker.png',
        description: 'The Smart Locker System using Raspberry Pi is an automated, security-focused multi-locker setup that stores items through a name-and-password login. It provides a fast, organized, and reliable way to manage access for two or more lockers while ensuring enhanced protection and privacy.',
        details: {
            overview: 'The Smart Locker System provides a modern, secure storage solution with IoT connectivity, allowing remote monitoring and management of locker access.',
            features: [
                'Secure keypad authentication system',
                'LED status indicators for visual feedback',
                'Remote monitoring via IoT connectivity',
                'User access logging and tracking',
                'Automated lock/unlock mechanisms',
                'Real-time notifications and alerts'
            ],
            technologies: ['Raspberry Pi', 'Python', 'IoT Protocols', 'Electronic Locks', 'LED Indicators', 'Keypad Interface']
        }
    },
    'curesecure': {
        category: 'SOFTWARE DEVELOPMENT',
        title: 'CureSecure: Pharmacy POS & Inventory System',
        image: 'images/curesecure-team.png',
        image2: 'images/curesecure-dashboard.png',
        description: 'A comprehensive pharmacy management solution built with C# WinForms, featuring point-of-sale functionality, real-time inventory tracking, and detailed analytics for efficient pharmacy operations.',
        details: {
            overview: 'CureSecure is a complete pharmacy management system designed to streamline operations, from sales transactions to inventory management and analytics.',
            features: [
                'Comprehensive point-of-sale (POS) functionality',
                'Real-time inventory tracking and management',
                'Detailed sales and analytics dashboard',
                'Medicine expiration date monitoring',
                'Customer transaction history',
                'Automated low-stock alerts and reporting'
            ],
            technologies: ['C#', 'WinForms', 'SQL Server', 'Crystal Reports', '.NET Framework', 'Database Management']
        }
    },
    'vital-sign': {
        category: 'RESEARCH',
        title: 'Four-in-One Vital Sign Sensor with BMI Calculation using AI and IoT',
        image: 'images/vital-sign.jpg',
        image2: 'images/vital-sign-collage.jpg',
        description: 'Advanced health monitoring device that measures multiple vital signs simultaneously, integrates BMI calculations, and uses AI algorithms to predict health risks through IoT connectivity.',
        details: {
            overview: 'An innovative health monitoring kiosk that combines multiple vital sign measurements with AI-powered health risk prediction and BMI calculation capabilities.',
            features: [
                'Four-in-one vital sign measurement (heart rate, blood pressure, temperature, oxygen saturation)',
                'Automated BMI calculation with height and weight sensors',
                'AI-powered health risk prediction algorithms',
                'IoT connectivity for remote health monitoring',
                'Touchscreen interface for easy patient interaction',
            ],
            technologies: ['Arduino/Raspberry Pi', 'Medical Sensors', 'AI/Machine Learning', 'IoT Protocols', 'Python', 'Web Development']
        }
    }
};

// Get modal elements
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.getElementById('modalImage');
const modalImage2 = document.getElementById('modalImage2');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDetails = document.getElementById('modalDetails');
const projectLinks = document.querySelectorAll('.project-link');

// Add click event to all project links
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            // Populate modal with project data
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalCategory.textContent = project.category;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;

            // Handle second image if it exists
            if (project.image2) {
                modalImage2.src = project.image2;
                modalImage2.style.display = 'block';
            } else {
                modalImage2.style.display = 'none';
            }

            // Build details section
            let detailsHTML = `
                <h3>Project Overview</h3>
                <p style="color: var(--text-light); line-height: 1.8; margin-bottom: 1.5rem;">${project.details.overview}</p>
                
                <h3>Key Features</h3>
                <ul>
                    ${project.details.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <h3>Technologies Used</h3>
                <div class="tech-stack">
                    ${project.details.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            `;

            modalDetails.innerHTML = detailsHTML;

            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal when clicking X
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add click event to all work cards in the gallery
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            // Populate modal with project data
            modalCategory.textContent = project.category;
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalImage.src = project.image;

            // Show or hide second image
            if (project.image2) {
                modalImage2.src = project.image2;
                modalImage2.style.display = 'block';
            } else {
                modalImage2.style.display = 'none';
            }

            // Populate details
            if (project.details) {
                let detailsHTML = `<h3>Project Overview</h3><p>${project.details.overview}</p>`;

                if (project.details.features) {
                    detailsHTML += '<h3>Key Features</h3><ul>';
                    project.details.features.forEach(feature => {
                        detailsHTML += `<li>${feature}</li>`;
                    });
                    detailsHTML += '</ul>';
                }

                if (project.details.technologies) {
                    detailsHTML += '<h3>Technologies Used</h3><div class="tech-stack">';
                    project.details.technologies.forEach(tech => {
                        detailsHTML += `<span class="tech-tag">${tech}</span>`;
                    });
                    detailsHTML += '</div>';
                }

                modalDetails.innerHTML = detailsHTML;
            }

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});
