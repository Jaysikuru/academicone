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
    
    // Initialize publications section functionality if it exists
    if (document.getElementById('publications')) {
        initPublicationCounters();
        initPublicationsSection();
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
    console.log("Initializing publication counters");
    // Select all counter elements
    const counterElements = document.querySelectorAll('.counter-value');
    
    if (counterElements.length === 0) {
        console.log("No counter elements found");
        return;
    }
    
    console.log("Found counters:", counterElements.length);
    
    // Set up intersection observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When counter comes into view
            if (entry.isIntersecting) {
                console.log("Counter in view:", entry.target.dataset.countTarget);
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
    
    // Track active tab for analytics
    trackPublicationTabViews();
}

/**
 * Initialize publications search functionality
 */
function initPublicationsSearch() {
    const searchInput = document.getElementById('publication-search');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const activeTab = getActivePublicationTab();
        const publications = document.querySelectorAll(`[x-show="activeTab === '${activeTab}']`);
        
        // If we have access to the publications in the active tab
        if (publications.length === 1) {
            const publicationItems = publications[0].querySelectorAll('.bg-white.rounded-lg');
            
            publicationItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }
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
    const activeTab = getActivePublicationTab();
    const publications = document.querySelectorAll(`[x-show="activeTab === '${activeTab}']`);
    
    if (publications.length === 1) {
        const publicationItems = publications[0].querySelectorAll('.bg-white.rounded-lg');
        
        publicationItems.forEach(item => {
            const yearElement = item.querySelector('.text-sm.text-secondary-500');
            const year = yearElement ? yearElement.textContent.trim() : '';
            
            if (!selectedYear || year.includes(selectedYear)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

/**
 * Sort publications based on selected sort option
 */
function sortPublications() {
    const sortFilter = document.getElementById('publication-sort');
    const sortOption = sortFilter ? sortFilter.value : 'recent';
    const activeTab = getActivePublicationTab();
    const publications = document.querySelectorAll(`[x-show="activeTab === '${activeTab}']`);
    
    if (publications.length === 1) {
        const publicationItems = Array.from(publications[0].querySelectorAll('.bg-white.rounded-lg'));
        const publicationsList = publications[0].querySelector('.space-y-6');
        
        // Remove all publication items
        publicationItems.forEach(item => item.remove());
        
        // Sort publication items
        publicationItems.sort((a, b) => {
            if (sortOption === 'recent') {
                const yearA = a.querySelector('.text-sm.text-secondary-500').textContent.trim();
                const yearB = b.querySelector('.text-sm.text-secondary-500').textContent.trim();
                return yearB.localeCompare(yearA);
            } else if (sortOption === 'cited') {
                const citationsA = getCitationCount(a);
                const citationsB = getCitationCount(b);
                return citationsB - citationsA;
            } else if (sortOption === 'title') {
                const titleA = a.querySelector('h3').textContent.trim();
                const titleB = b.querySelector('h3').textContent.trim();
                return titleA.localeCompare(titleB);
            }
            return 0;
        });
        
        // Re-append sorted items
        publicationItems.forEach(item => {
            publicationsList.appendChild(item);
        });
        
        // Re-append the "Load More" button if it exists
        const loadMoreButton = publications[0].querySelector('.text-center.pt-4');
        if (loadMoreButton) {
            publicationsList.appendChild(loadMoreButton);
        }
    }
}

/**
 * Get citation count from publication item
 * @param {HTMLElement} publicationItem 
 * @returns {number}
 */
function getCitationCount(publicationItem) {
    const citationText = publicationItem.querySelector('.text-sm.text-secondary-500').textContent;
    const citationMatch = citationText.match(/(\d+)\s+citations?/i);
    return citationMatch ? parseInt(citationMatch[1]) : 0;
}

/**
 * Get active publication tab
 * @returns {string}
 */
function getActivePublicationTab() {
    // This is a simplified version since we're using Alpine.js for tab state
    // In a real implementation, we'd query Alpine's state
    const activeTabButton = document.querySelector('[x-data] button[class*="border-primary-500"]');
    if (activeTabButton) {
        const classMatch = activeTabButton.className.match(/activeTab === '(\w+)'/);
        return classMatch ? classMatch[1] : 'articles';
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
 * Expertise Section JavaScript Enhancements
 * Adds interactive functionality to the Expertise & Recognition section
 */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add this section to lazy loading if it exists
  if (document.getElementById('expertise')) {
    initExpertiseSection();
  }
});

/**
 * Initialize the expertise section functionality
 */
function initExpertiseSection() {
  // Initialize counter animations for funding metrics
  initFundingCounters();
  
  // Set up smooth expansion/collapse for knowledge areas
  initKnowledgeAreas();
  
  // Initialize timeline interactions
  initAchievementTimeline();
}

/**
 * Initialize the funding counter animations
 */
function initFundingCounters() {
  // Select all counter elements within the expertise section
  const counterElements = document.querySelectorAll('#expertise .counter-value');
  
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
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            element.textContent = current.toLocaleString() + suffix;
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
 * Initialize expandable knowledge areas
 */
function initKnowledgeAreas() {
  // Use Alpine.js for this functionality
  // The HTML already contains the necessary x-data attributes
}

/**
 * Initialize achievement timeline interactions
 */
function initAchievementTimeline() {
  // Add animation when timeline items come into view
  const timelineItems = document.querySelectorAll('#expertise .timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a slight delay to each item for a cascading effect
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

/**
 * Initialize radar chart animation
 * This is handled by Alpine.js in the HTML, but we could add more complex
 * animations here if needed using a library like D3.js
 */
function initSkillsVisualization() {
  // For now, using the built-in SVG with Alpine.js for transitions
  // Future enhancement: Add D3.js for more complex, animated visualizations
}

/**
 * Add CSS class to timeline items for animation
 * Called from main.js when initializing lazy loading
 */
function addTimelineAnimationClasses() {
  const timelineItems = document.querySelectorAll('#expertise .relative.pl-10');
  
  timelineItems.forEach((item, index) => {
    // Add timeline-item class for selection in the animation function
    item.classList.add('timeline-item');
    
    // Add initial state for animation
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    
    // Add transition properties
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });
}

// Add animation classes when the script loads
addTimelineAnimationClasses();

// Add callback to the visible class to handle animations
document.addEventListener('DOMContentLoaded', () => {
  // Add handler for timeline item animations
  document.addEventListener('animationend', (e) => {
    if (e.target.classList.contains('timeline-item') && 
        e.target.classList.contains('visible')) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
});