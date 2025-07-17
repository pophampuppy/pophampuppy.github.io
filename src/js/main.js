// Main JavaScript file 

document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and inject HTML content
    const loadComponent = (componentPath, targetElementId) => {
        // Determine base path based on current page URL
        const isBlogPage = window.location.pathname.includes('/blog/');
        const basePath = isBlogPage ? '../' : '';
        const fullPath = `${basePath}${componentPath}`;

        return fetch(fullPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${fullPath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const targetElement = document.getElementById(targetElementId);
                if (targetElement) {
                    targetElement.innerHTML = data;
                } else {
                    console.error(`Element with ID '${targetElementId}' not found.`);
                }
            })
            .catch(error => console.error("Error loading component:", error));
    };

    // Load navbar and footer
    loadComponent("layout/navbar.html", "navbar-container")
        .then(() => {
            // Mobile nav toggle functionality
            const nav = document.querySelector("#navbar-container ul");
            const navToggle = document.querySelector(".mobile-nav-toggle");
            nav.setAttribute("data-visible", false);

            if (navToggle) {
                navToggle.addEventListener("click", () => {
                    const isVisible = nav.getAttribute("data-visible");
                    if (isVisible === "false") {
                        nav.setAttribute("data-visible", true);
                        navToggle.setAttribute("aria-expanded", true);
                        document.body.classList.add("nav-open"); // Lock scroll
                    } else {
                        nav.setAttribute("data-visible", false);
                        navToggle.setAttribute("aria-expanded", false);
                        document.body.classList.remove("nav-open"); // Unlock scroll
                    }
                });
            }

            // Language switcher functionality
            const localeSwitcher = document.getElementById("locale-switcher");
            if(localeSwitcher) {
                localeSwitcher.addEventListener("click", () => {
                    const currentLang = document.documentElement.lang;
                    const newLang = currentLang === 'en' ? 'es' : 'en';
                    setLanguage(newLang);
                });
            }
        });
    loadComponent("layout/footer.html", "footer-container");

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        const elements = document.querySelectorAll('[data-lang-en], [data-lang-es]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                el.innerText = text;
            }
        });
    };

    // Set initial language
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);

    // Corporate Survey Submission
    const corporateSurveyForm = document.getElementById("corporate-survey-form");
    if (corporateSurveyForm) {
        corporateSurveyForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const submitButton = corporateSurveyForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const lead = {
                "Name": document.getElementById("corporate-company-name").value,
                "Industry": document.getElementById("corporate-industry").value,
                "Primary Contact": document.getElementById("corporate-contact-name").value,
                "Email": document.getElementById("corporate-contact-email").value,
                "Size": document.getElementById("corporate-company-size").value
            };

            sendToAirtable('Corporates', lead)
                .then(() => {
                    const messageDiv = document.getElementById('corporate-form-submission-message');
                    messageDiv.textContent = "Thank you for your submission! We'll be in touch soon.";
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = 'green';
                    corporateSurveyForm.reset();
                })
                .catch(error => {
                    console.error("An error occurred during form submission:", error);
                    const messageDiv = document.getElementById('corporate-form-submission-message');
                    messageDiv.textContent = "Sorry, something went wrong. Please try again later.";
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = 'red';
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                });
        });
    }

    // Startup Survey Submission
    const startupSurveyForm = document.getElementById("startup-survey-form");
    if (startupSurveyForm) {
        startupSurveyForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const submitButton = startupSurveyForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const lead = {
                "Name": document.getElementById("startup-name").value,
                "Employees": document.getElementById("startup-company-size").value,
                "Main Contact": document.getElementById("startup-contact-name").value,
                "Industry": document.getElementById("startup-industry").value
            };
            
            sendToAirtable('Startups', lead)
                .then(() => {
                    const messageDiv = document.getElementById('startup-form-submission-message');
                    messageDiv.textContent = "Thank you for your submission! We'll be in touch soon.";
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = 'green';
                    startupSurveyForm.reset();
                })
                .catch(error => {
                    console.error("An error occurred during form submission:", error);
                    const messageDiv = document.getElementById('startup-form-submission-message');
                    messageDiv.textContent = "Sorry, something went wrong. Please try again later.";
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = 'red';
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            const lead = {
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
                wants_call: formData.get("wants_call") === "true",
                newsletter: formData.get("newsletter") === "true",
                created_at: new Date().toISOString()
            };

            // Chain the promises for all integrations
            sendToSupabase(lead)
                .then(() => sendToZoho(lead))
                .then(() => sendToAirtable(lead))
                .then(() => sendToNotion(lead))
                .then(() => {
                    alert("Thank you for your message! We'll be in touch soon.");
                })
                .catch(error => {
                    console.error("An error occurred during form submission:", error);
                    alert("Sorry, something went wrong. Please try again later.");
                })
                .finally(() => {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
        });
    }

    // On-scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Animate counters if the element is a stats bar
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let current = 0;
                    const increment = target / 100;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Bubble Animation Continuity
    function setBubbleAnimationOffsets() {
        const bubbles = document.querySelectorAll('.background-shapes span');
        if (!bubbles.length) return;
        // Use a persistent timestamp for animation offset
        let start = localStorage.getItem('bubblesStart');
        if (!start) {
            start = Date.now();
            localStorage.setItem('bubblesStart', start);
        }
        const now = Date.now();
        const elapsed = (now - start) / 1000; // seconds
        const durations = [35, 25, 45, 30, 38, 22, 40];
        const baseDelays = [-5, -15, 0, -22, -8, -10, -2];
        bubbles.forEach((bubble, i) => {
            const duration = durations[i % durations.length];
            // Calculate where in the animation cycle we are
            const offset = (elapsed % duration);
            // Set the animation delay so the bubble is at the right spot
            bubble.style.animationDelay = `${baseDelays[i] - offset}s`;
        });
    }
    setBubbleAnimationOffsets();
    window.addEventListener('pageshow', setBubbleAnimationOffsets);

}); 