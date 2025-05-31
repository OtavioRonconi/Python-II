
        // Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active-nav');
                    });
                    this.classList.add('active-nav');
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Animated counter for stats
        function animateCounter(elementId, target, duration = 2000) {
            const element = document.getElementById(elementId);
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 16);
        }
        
        // Intersection Observer for stats animation
        const statsSection = document.querySelector('section.bg-blue-600');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter('years-count', 13);
                    animateCounter('vehicles-count', 1250);
                    animateCounter('clients-count', 3200);
                    animateCounter('services-count', 5800);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);

        // Form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            
            // Show success message (in a real app, you would send this to a server)
            alert(`Obrigado, ${name}! Sua mensagem sobre "${subject}" foi enviada com sucesso. Entraremos em contato em breve no e-mail ${email}.`);
            
            // Reset form
            this.reset();
        });

        // Simple map implementation (in a real app, you would use Google Maps or similar)
        function initMap() {
            const mapElement = document.getElementById('map');
            
            // Create a simple map representation
            mapElement.innerHTML = `
                <div style="background-color: #e5e7eb; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <i class="fas fa-map-marker-alt text-4xl text-red-500 mb-2"></i>
                        <p class="text-gray-700 font-medium">Av. Automotiva, 1234</p>
                        <p class="text-gray-500">São Paulo - SP</p>
                    </div>
                </div>
            `;
        }
        
        // Initialize map when page loads
        window.onload = initMap;