/**
 * Main JavaScript for Academic Portfolio Website
 * Handles lazy loading, interactivity, and performance optimizations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading for sections
    initLazyLoading();
    
    // Set up smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Inside DOMContentLoaded event listener
    if (document.getElementById('expertise')) {
        initExpertiseSection();
        initTimelineAnimation();
    }

    // Initialize publications section functionality if it exists
    if (document.getElementById('publications')) {
        initPublicationCounters();
        initPublicationsSection();
        initCitationAnimation();
    }
    // Initialize consultation section if it exists
    if (document.getElementById('consult')) {
        initConsultationSection();
        animateServicesOnScroll();
    }

    // Initialize contact section if it exists
    if (document.getElementById('contact')) {
        initContactSection();
    }
    
    // Initialize footer links
    initFooterLinks();

    initBackToTopButton();
    
    // Add no-js class to handle JavaScript disabled scenarios
    document.documentElement.classList.remove('no-js');
    
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading for sections
    initLazyLoading();
    
    // Set up smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize publications section functionality if it exists
    if (document.getElementById('publications')) {
        initPublicationCounters();
        initPublicationsSection();
        initCitationAnimation();
    }
    
    // Initialize expertise section if it exists
    if (document.getElementById('expertise')) {
        initExpertiseSection();
        initTimelineAnimation();
    }
    
    // Initialize teaching section if it exists
    if (document.getElementById('teaching')) {
        initTeachingSection();
        initPhilosophyAnimation();
    }
    
    // Add no-js class to handle JavaScript disabled scenarios
    document.documentElement.classList.remove('no-js');
});

/**
 * Initialize intersection observer for lazy loading sections
 */
function initLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });
    
    // Observe all lazy sections
    document.querySelectorAll('.lazy-section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Set up smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip empty links
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL but don't add to browser history
                history.replaceState(null, null, targetId);
            }
        });
    });
}

/**
 * Initialize publication counter animations
 */
function initPublicationCounters() {
    // Select all counter elements
    const counterElements = document.querySelectorAll('.counter-value');
    
    // Set up intersection observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When counter comes into view
            if (entry.isIntersecting) {
                // Get the target value from data attribute
                const target = parseInt(entry.target.dataset.countTarget);
                const suffix = entry.target.dataset.countSuffix || '';
                const duration = 2000; // Animation duration in milliseconds
                const increment = Math.ceil(target / (duration / 16)); // Approximately 60fps
                
                // Start the counter at 0
                let current = 0;
                const element = entry.target;
                
                // Animate the counter
                const timer = setInterval(() => {
                    current += increment;
                    
                    // If we've reached or exceeded the target
                    if (current >= target) {
                        element.textContent = target + suffix;
                        clearInterval(timer);
                    } else {
                        element.textContent = current + suffix;
                    }
                }, 16);
                
                // Unobserve after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all counter elements
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Initialize publications section functionality
 */
function initPublicationsSection() {
    // Initialize search functionality
    initPublicationsSearch();
    
    // Initialize filter functionality
    initPublicationsFilters();
    
    // Initialize load more buttons
    initLoadMoreButtons();
    
    // Track active tab for analytics
    trackPublicationTabViews();
}

/**
 * Initialize load more buttons for publications
 */
function initLoadMoreButtons() {
    // Articles Load More
    const loadMoreArticlesBtn = document.getElementById('load-more-articles');
    if (loadMoreArticlesBtn) {
        loadMoreArticlesBtn.addEventListener('click', () => {
            const hiddenArticles = document.getElementById('hidden-articles');
            const articlesContainer = document.getElementById('articles-container');
            const loadMoreContainer = document.getElementById('articles-load-more');
            
            if (hiddenArticles) {
                // Move all hidden articles to the main container
                while (hiddenArticles.firstChild) {
                    articlesContainer.appendChild(hiddenArticles.firstChild);
                }
                
                // Hide the load more button
                loadMoreContainer.style.display = 'none';
            }
        });
    }
    
    // Conferences Load More
    const loadMoreConferencesBtn = document.getElementById('load-more-conferences');
    if (loadMoreConferencesBtn) {
        loadMoreConferencesBtn.addEventListener('click', () => {
            const hiddenConferences = document.getElementById('hidden-conferences');
            const conferencesContainer = document.getElementById('conferences-container');
            const loadMoreContainer = document.getElementById('conferences-load-more');
            
            if (hiddenConferences) {
                // Move all hidden conferences to the main container
                while (hiddenConferences.firstChild) {
                    conferencesContainer.appendChild(hiddenConferences.firstChild);
                }
                
                // Hide the load more button
                loadMoreContainer.style.display = 'none';
            }
        });
    }
    
    // Patents Load More
    const loadMorePatentsBtn = document.getElementById('load-more-patents');
    if (loadMorePatentsBtn) {
        loadMorePatentsBtn.addEventListener('click', () => {
            const hiddenPatents = document.getElementById('hidden-patents');
            const patentsContainer = document.getElementById('patents-container');
            const loadMoreContainer = document.getElementById('patents-load-more');
            
            if (hiddenPatents) {
                // Move all hidden patents to the main container
                while (hiddenPatents.firstChild) {
                    patentsContainer.appendChild(hiddenPatents.firstChild);
                }
                
                // Hide the load more button
                loadMoreContainer.style.display = 'none';
            }
        });
    }
}

/**
 * Initialize citation graph animation
 */
function initCitationAnimation() {
    const citationChart = document.getElementById('citation-chart');
    
    if (citationChart) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate each bar sequentially
                    const bars = citationChart.querySelectorAll('.citation-bar');
                    
                    bars.forEach((bar, index) => {
                        // Set the CSS variable for target height
                        const height = bar.getAttribute('data-height');
                        bar.style.setProperty('--target-height', height + 'px');
                        
                        // Add animation with delay based on index
                        setTimeout(() => {
                            bar.style.height = height + 'px';
                            bar.classList.add('animate');
                        }, index * 200); // 200ms delay between each bar
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.6
        });
        
        observer.observe(citationChart);
    }
}

/**
 * Initialize publications search functionality
 */
function initPublicationsSearch() {
    const searchInput = document.getElementById('publication-search');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Get all publication items in all tabs
        const publicationItems = document.querySelectorAll('.publication-item');
        
        publicationItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                // Highlight the matching text
                if (searchTerm !== '') {
                    highlightText(item, searchTerm);
                } else {
                    // Remove highlights if search is cleared
                    removeHighlights(item);
                }
                
                // Show the item
                item.style.display = '';
            } else {
                // Hide the item
                item.style.display = 'none';
            }
        });
    });
}

/**
 * Highlight search term in publication item
 * @param {HTMLElement} item - Publication item element
 * @param {string} term - Search term to highlight
 */
function highlightText(item, term) {
    // First remove any existing highlights
    removeHighlights(item);
    
    // Find elements to highlight text in
    const titleEl = item.querySelector('h3');
    const descEl = item.querySelector('p');
    
    // Highlight in title
    if (titleEl) {
        const titleText = titleEl.textContent;
        if (titleText.toLowerCase().includes(term)) {
            titleEl.innerHTML = titleText.replace(
                new RegExp(term, 'gi'),
                match => `<span class="search-highlight">${match}</span>`
            );
        }
    }
    
    // Highlight in description
    if (descEl) {
        const descText = descEl.textContent;
        if (descText.toLowerCase().includes(term)) {
            descEl.innerHTML = descText.replace(
                new RegExp(term, 'gi'),
                match => `<span class="search-highlight">${match}</span>`
            );
        }
    }
}

/**
 * Remove highlights from publication item
 * @param {HTMLElement} item - Publication item element
 */
function removeHighlights(item) {
    const highlights = item.querySelectorAll('.search-highlight');
    highlights.forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize(); // Combine adjacent text nodes
    });
}

/**
 * Initialize publications filter functionality
 */
function initPublicationsFilters() {
    // Year filter
    const yearFilter = document.getElementById('publication-year');
    if (yearFilter) {
        yearFilter.addEventListener('change', filterPublications);
    }
    
    // Sort filter
    const sortFilter = document.getElementById('publication-sort');
    if (sortFilter) {
        sortFilter.addEventListener('change', sortPublications);
    }
}

/**
 * Filter publications based on selected filters
 */
function filterPublications() {
    const yearFilter = document.getElementById('publication-year');
    const selectedYear = yearFilter ? yearFilter.value : '';
    
    // Get all publication items across all tabs
    const publicationItems = document.querySelectorAll('.publication-item');
    
    publicationItems.forEach(item => {
        // Look for year in the item's data attribute or text content
        const itemYear = item.getAttribute('data-year') || 
                        item.querySelector('.text-sm.text-secondary-500')?.textContent.match(/\b(20\d{2})\b/)?.[1];
        
        if (!selectedYear || (itemYear && itemYear.includes(selectedYear))) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Sort publications based on selected sort option
 */
function sortPublications() {
    const sortFilter = document.getElementById('publication-sort');
    const sortOption = sortFilter ? sortFilter.value : 'recent';
    
    // Sort in each visible tab
    const tabContainers = [
        document.getElementById('articles-container'),
        document.getElementById('conferences-container'),
        document.getElementById('patents-container'),
        document.querySelectorAll('[x-show="activeTab === \'books\'"]')[0]
    ];
    
    tabContainers.forEach(container => {
        if (!container) return;
        
        // Get all publication items
        const publicationItems = Array.from(container.querySelectorAll('.publication-item'));
        
        // Remove all publication items
        publicationItems.forEach(item => item.remove());
        
        // Sort publication items
        publicationItems.sort((a, b) => {
            if (sortOption === 'recent') {
                const yearA = a.getAttribute('data-year') || 
                             a.querySelector('.text-sm.text-secondary-500')?.textContent.match(/\b(20\d{2})\b/)?.[1] || '';
                const yearB = b.getAttribute('data-year') || 
                             b.querySelector('.text-sm.text-secondary-500')?.textContent.match(/\b(20\d{2})\b/)?.[1] || '';
                return yearB.localeCompare(yearA);
            } else if (sortOption === 'cited') {
                const citationsA = getCitationCount(a);
                const citationsB = getCitationCount(b);
                return citationsB - citationsA;
            } else if (sortOption === 'title') {
                const titleA = a.querySelector('h3')?.textContent.trim() || '';
                const titleB = b.querySelector('h3')?.textContent.trim() || '';
                return titleA.localeCompare(titleB);
            }
            return 0;
        });
        
        // Re-append sorted items
        publicationItems.forEach(item => {
            container.appendChild(item);
        });
    });
}

/**
 * Get citation count from publication item
 * @param {HTMLElement} publicationItem 
 * @returns {number}
 */
function getCitationCount(publicationItem) {
    const citationText = publicationItem.querySelector('.text-sm.text-secondary-500')?.textContent || '';
    const citationMatch = citationText.match(/(\d+)\s+citations?/i);
    return citationMatch ? parseInt(citationMatch[1]) : 0;
}

/**
 * Get active publication tab
 * @returns {string}
 */
function getActivePublicationTab() {
    // This is a simplified version since we're using Alpine.js for tab state
    const tabs = ['articles', 'books', 'conferences', 'patents'];
    for (const tab of tabs) {
        const tabContent = document.querySelector(`[x-show="activeTab === '${tab}'"]`);
        if (tabContent && window.getComputedStyle(tabContent).display !== 'none') {
            return tab;
        }
    }
    return 'articles';
}

/**
 * Track publication tab views for analytics
 */
function trackPublicationTabViews() {
    const tabButtons = document.querySelectorAll('[x-data] button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.textContent.trim();
            console.log(`Publication tab viewed: ${tabName}`);
            // This would connect to your real analytics service
        });
    });
}

/**
 * Performance optimizations for image loading
 */
function optimizeImages() {
    // Add loading="lazy" attribute to images not in viewport
    const lazyImages = document.querySelectorAll('img:not([loading])');
    
    lazyImages.forEach(img => {
        // Skip profile image which is above the fold
        if (!img.classList.contains('profile-image')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Ensure all images have dimensions to prevent layout shifts
        if (!img.getAttribute('width') && !img.getAttribute('height')) {
            img.setAttribute('width', '100%');
            img.style.height = 'auto';
        }
    });
}

/**
 * Handle mobile menu toggling
 */
function handleMobileMenu() {
    const menuButton = document.querySelector('[aria-label="Toggle menu"]');
    const menuItems = document.querySelector('.mobile-menu');
    
    if (menuButton && menuItems) {
        menuButton.addEventListener('click', () => {
            const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !expanded);
            menuItems.classList.toggle('hidden');
        });
    }
}

/**
 * Track page analytics (placeholder for future implementation)
 */
function trackAnalytics() {
    // This would be connected to a real analytics service in production
    console.log('Page viewed:', window.location.pathname);
    
    // Track section visibility
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Section viewed:', entry.target.id);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Call additional initializations for production environment
if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
    optimizeImages();
    trackAnalytics();
}
/**
 * Expertise & Recognition Section JavaScript
 * Handles animations and interactivity for the expertise section
 */

// Function to initialize expertise section functionality
function initExpertiseSection() {
    // Initialize skills radar animation
    initSkillsRadarAnimation();
    
    // Initialize skill point tooltips
    initSkillPointTooltips();
}

/**
 * Initialize the animation for the skills radar chart
 */
function initSkillsRadarAnimation() {
    const skillPolygon = document.querySelector('.skill-polygon');
    
    if (!skillPolygon) return;
    
    // Create observer for the radar chart
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When visible, add animation class
                skillPolygon.classList.add('radar-animate');
                
                // Also animate skill points
                const skillPoints = document.querySelectorAll('.skill-point');
                skillPoints.forEach((point, index) => {
                    setTimeout(() => {
                        point.classList.add('skill-point-animate');
                    }, index * 200); // Stagger the animations
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe the polygon
    observer.observe(skillPolygon);
}

/**
 * Initialize tooltips for skill points in the radar chart
 */
function initSkillPointTooltips() {
    const skillPoints = document.querySelectorAll('.skill-point');
    const tooltip = document.getElementById('skill-tooltip');
    
    if (!skillPoints.length || !tooltip) return;
    
    skillPoints.forEach(point => {
        // Show tooltip on hover
        point.addEventListener('mouseenter', (e) => {
            // Get skill data from data attributes
            const skillName = point.getAttribute('data-skill');
            const skillLevel = point.getAttribute('data-level');
            
            // Update tooltip content
            tooltip.querySelector('.skill-name').textContent = skillName;
            tooltip.querySelector('.skill-level').textContent = skillLevel;
            
            // Position tooltip near the point
            const rect = point.getBoundingClientRect();
            const radarRect = document.querySelector('.skills-radar').getBoundingClientRect();
            
            tooltip.style.top = `${rect.top - radarRect.top - 60}px`;
            tooltip.style.left = `${rect.left - radarRect.left + 10}px`;
            
            // Show the tooltip
            tooltip.classList.remove('hidden');
        });
        
        // Hide tooltip on mouse leave
        point.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });
}

/**
 * Initialize timeline animation for awards and recognition
 */
function initTimelineAnimation() {
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    
    if (!timelineEntries.length) return;
    
    // Create observer for timeline entries
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When visible, add animation class
                entry.target.classList.add('timeline-animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe each timeline entry
    timelineEntries.forEach(entry => {
        observer.observe(entry);
    });
}

// Call initExpertiseSection function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize expertise section if it exists
    if (document.getElementById('expertise')) {
        initExpertiseSection();
        initTimelineAnimation();
    }
});
/**
 * Teaching & Courses Section JavaScript
 * Handles animations and interactivity for the teaching section
 */

// Function to initialize teaching section functionality
function initTeachingSection() {
    // Initialize teaching stats counters
    initTeachingStatsCounters();
    
    // Initialize testimonial cards animation
    initTestimonialAnimation();
    
    // Add hover effects to course cards
    addCourseCardEffects();
    
    // Initialize tab transition animations
    initTabAnimations();
}

/**
 * Initialize stats counters animation
 */
function initTeachingStatsCounters() {
    const counterElements = document.querySelectorAll('#teaching .counter-value');
    
    // Set up intersection observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When counter comes into view
            if (entry.isIntersecting) {
                // Get the target value from data attribute
                const target = parseFloat(entry.target.dataset.countTarget);
                const suffix = entry.target.dataset.countSuffix || '';
                const duration = 2000; // Animation duration in milliseconds
                
                // Determine if the value is a decimal
                const isDecimal = target % 1 !== 0;
                const increment = isDecimal ? 0.1 : Math.ceil(target / (duration / 16));
                
                // Start the counter at 0
                let current = 0;
                const element = entry.target;
                
                // Animate the counter
                const timer = setInterval(() => {
                    current += increment;
                    
                    // If we've reached or exceeded the target
                    if (current >= target) {
                        element.textContent = isDecimal ? target.toFixed(1) + suffix : target + suffix;
                        clearInterval(timer);
                    } else {
                        element.textContent = isDecimal ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
                    }
                }, 16);
                
                // Unobserve after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe all counter elements
    counterElements.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Initialize testimonial animation on scroll
 */
function initTestimonialAnimation() {
    const testimonials = document.querySelectorAll('#teaching .testimonial-card');
    
    if (!testimonials.length) return;
    
    // Create observer for testimonials
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with staggered delay
                setTimeout(() => {
                    entry.target.classList.add('testimonial-visible');
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe each testimonial
    testimonials.forEach(testimonial => {
        observer.observe(testimonial);
    });
}

/**
 * Add hover effects to course cards
 */
function addCourseCardEffects() {
    const courseCards = document.querySelectorAll('#teaching .bg-white.rounded-xl');
    
    courseCards.forEach(card => {
        card.classList.add('course-card');
    });
}

/**
 * Initialize tab transition animations
 */
function initTabAnimations() {
    const tabButtons = document.querySelectorAll('#teaching [x-data] button');
    
    tabButtons.forEach(button => {
        button.classList.add('platform-tab');
        
        // Add transition effect when clicking tabs
        button.addEventListener('click', () => {
            // Apply ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('tab-ripple');
            button.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Initialize teaching philosophy item animation
 */
function initPhilosophyAnimation() {
    const philosophyItems = document.querySelectorAll('#teaching .flex.items-start');
    
    philosophyItems.forEach(item => {
        item.classList.add('philosophy-item');
    });
}

// Call initTeachingSection function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize teaching section if it exists
    if (document.getElementById('teaching')) {
        initTeachingSection();
        initPhilosophyAnimation();
    }
});
/**
 * Consultation Services Section JavaScript
 * Handles animations and interactivity for the consultation section
 */

// Function to initialize consultation section functionality
function initConsultationSection() {
    // Initialize service cards hover effects
    initServiceCards();
    
    // Initialize process timeline animations
    initProcessTimeline();
    
    // Initialize testimonial animations
    initTestimonialCards();
    
    // Initialize package card animations
    initPackageCards();
    
    // Add CTA button effect
    initCtaButton();
}

/**
 * Initialize service cards animations
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('#consult .service-card');
    const industryCards = document.querySelectorAll('#consult .industry-card');
    
    // Add animation classes if not already present
    serviceCards.forEach(card => {
        if (!card.classList.contains('service-card')) {
            card.classList.add('service-card');
        }
    });
    
    industryCards.forEach(card => {
        if (!card.classList.contains('industry-card')) {
            card.classList.add('industry-card');
        }
    });
}

/**
 * Initialize process timeline animations on scroll
 */
function initProcessTimeline() {
    const processSteps = document.querySelectorAll('#consult .relative.flex.flex-col.md\\:flex-row');
    const processDetails = document.querySelectorAll('#consult .process-detail');
    const timelineDots = document.querySelectorAll('#consult .h-10.w-10.rounded-full.bg-primary-600');
    
    if (!processSteps.length) return;
    
    // Add timeline-dot class to dots
    timelineDots.forEach(dot => {
        dot.classList.add('timeline-dot');
    });
    
    // Add process-step class to steps
    processSteps.forEach(step => {
        step.classList.add('process-step');
    });
    
    // Create observer for process steps
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Also animate the detail box inside this step
                const detail = entry.target.querySelector('.process-detail');
                if (detail) {
                    detail.classList.add('animated');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe each process step
    processSteps.forEach(step => {
        observer.observe(step);
    });
}

/**
 * Initialize testimonial cards animations
 */
function initTestimonialCards() {
    const testimonialCards = document.querySelectorAll('#consult .testimonial-card');
    
    if (!testimonialCards.length) return;
    
    // Create observer for testimonials
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with staggered delay
                setTimeout(() => {
                    entry.target.classList.add('testimonial-visible');
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe each testimonial
    testimonialCards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * Initialize package card animations
 */
function initPackageCards() {
    const packageCards = document.querySelectorAll('#consult .package-card');
    
    // Find the middle/featured package
    if (packageCards.length >= 3) {
        // The middle package (index 1 in a 3-card layout) is typically featured
        packageCards[1].classList.add('featured');
    }
    
    // Add animation classes if not already present
    packageCards.forEach(card => {
        if (!card.classList.contains('package-card')) {
            card.classList.add('package-card');
        }
    });
}

/**
 * Initialize CTA button animation
 */
function initCtaButton() {
    const ctaButtons = document.querySelectorAll('#consult a[href="#contact"]');
    
    ctaButtons.forEach(button => {
        button.classList.add('cta-button');
    });
}

/**
 * Animate services on scroll
 */
function animateServicesOnScroll() {
    const services = document.querySelectorAll('#consult .service-card');
    
    if (!services.length) return;
    
    // Create observer for services
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with staggered delay
                setTimeout(() => {
                    entry.target.classList.add('service-visible');
                }, index * 150);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each service
    services.forEach(service => {
        observer.observe(service);
    });
}

// Call initConsultationSection function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize consultation section if it exists
    if (document.getElementById('consult')) {
        initConsultationSection();
        animateServicesOnScroll();
    }
});
/**
 * Contact Section JavaScript
 * Handles form submission and validation for the contact section
 */

// Function to initialize contact section functionality
function initContactSection() {
    // Initialize form validation and submission
    initContactForm();
    
    // Add animation classes to elements
    initContactAnimations();
    
    // Initialize social link hover effects
    initSocialLinks();
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Add form-field class to all form inputs for styling
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.classList.add('form-field');
    });
    
    // Add submit-button class to submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.classList.add('submit-button');
    }
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if form is valid
        if (!validateForm(contactForm)) {
            showErrorMessage("Please fill in all required fields correctly.");
            return;
        }
        
        // Show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            `;
        }
        
        // In a real implementation, you would send the form data to a server here
        // For now, we'll simulate a successful submission after a delay
        setTimeout(function() {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showSuccessMessage("Your message has been sent successfully! I'll get back to you soon.");
            
            // Reset button state
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = `
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Message
                `;
            }
        }, 1500);
    });
}

/**
 * Validate the contact form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    
    // Required fields
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    
    // Check if required fields are filled
    if (!name.value.trim()) {
        highlightInvalidField(name);
        isValid = false;
    } else {
        removeInvalidHighlight(name);
    }
    
    if (!email.value.trim()) {
        highlightInvalidField(email);
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        highlightInvalidField(email);
        isValid = false;
    } else {
        removeInvalidHighlight(email);
    }
    
    if (!message.value.trim()) {
        highlightInvalidField(message);
        isValid = false;
    } else {
        removeInvalidHighlight(message);
    }
    
    return isValid;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Highlight an invalid form field
 * @param {HTMLElement} field - The field to highlight
 */
function highlightInvalidField(field) {
    field.classList.add('border-red-500');
    field.classList.add('bg-red-50');
    
    // Add shake animation
    field.classList.add('animate-shake');
    
    // Remove shake animation after it completes
    setTimeout(() => {
        field.classList.remove('animate-shake');
    }, 500);
}

/**
 * Remove highlight from a valid field
 * @param {HTMLElement} field - The field to remove highlight from
 */
function removeInvalidHighlight(field) {
    field.classList.remove('border-red-500');
    field.classList.remove('bg-red-50');
}

/**
 * Show a success message below the form
 * @param {string} message - The success message to show
 */
function showSuccessMessage(message) {
    // Remove any existing messages
    removeMessages();
    
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'mt-4 p-4 bg-green-100 text-green-800 rounded-lg success-message';
    successMessage.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/**
 * Show an error message below the form
 * @param {string} message - The error message to show
 */
function showErrorMessage(message) {
    // Remove any existing messages
    removeMessages();
    
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'mt-4 p-4 bg-red-100 text-red-800 rounded-lg error-message';
    errorMessage.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(errorMessage, contactForm.nextSibling);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

/**
 * Remove all message elements
 */
function removeMessages() {
    document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());
}

/**
 * Initialize contact section animations
 */
function initContactAnimations() {
    // Add contact-info-icon class to contact info icons
    const contactInfoIcons = document.querySelectorAll('#contact .flex-shrink-0.h-10.w-10.rounded-full');
    contactInfoIcons.forEach(icon => {
        icon.classList.add('contact-info-icon');
    });
    
    // Add contact-info-item class to contact info items
    const contactInfoItems = document.querySelectorAll('#contact .flex.items-start');
    contactInfoItems.forEach(item => {
        item.classList.add('contact-info-item');
    });
    
    // Add map-container class to map container
    const mapContainer = document.querySelector('#contact .aspect-w-16');
    if (mapContainer) {
        mapContainer.classList.add('map-container');
    }
}

/**
 * Initialize social link hover effects
 */
function initSocialLinks() {
    // Add social-link class to social links
    const socialLinks = document.querySelectorAll('#contact .flex.flex-col.items-center');
    socialLinks.forEach(link => {
        link.classList.add('social-link');
    });
}

// Call initContactSection function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact section if it exists
    if (document.getElementById('contact')) {
        initContactSection();
    }
});
/**
 * Initialize footer social links animations
 */
function initFooterLinks() {
    // Add social-link class to footer social links
    const socialLinks = document.querySelectorAll('footer a[aria-label]');
    socialLinks.forEach(link => {
        link.classList.add('social-link');
    });
}
/**
 * Back to Top Button Functionality
 */
function initBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    let hasBeenVisible = false;
    
    // Show/hide button based on scroll position
    function toggleBackToTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldShow = scrollTop > 300; // Show after scrolling 300px
        
        if (shouldShow && !backToTopButton.classList.contains('visible')) {
            backToTopButton.classList.add('visible');
            
            // Add pulse animation on first appearance
            if (!hasBeenVisible) {
                backToTopButton.classList.add('pulse');
                hasBeenVisible = true;
                
                // Remove pulse class after animation
                setTimeout(() => {
                    backToTopButton.classList.remove('pulse');
                }, 1500);
            }
        } else if (!shouldShow && backToTopButton.classList.contains('visible')) {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Optional: Track analytics
        console.log('Back to top button clicked');
    }
    
    // Event listeners
    window.addEventListener('scroll', throttle(toggleBackToTopButton, 100));
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Keyboard accessibility
    backToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

/**
 * Throttle function to improve scroll performance
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize back to top button when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing initialization code ...
    
    // Add this line to your existing DOMContentLoaded event
    initBackToTopButton();
});