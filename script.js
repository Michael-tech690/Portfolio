// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Typing effect
const typingElement = document.getElementById('typing-effect');
const professionElement = document.getElementById('profession');
const text = "Welcome to My Portfolio";
const professions = ["Web Developer", "UI/UX Designer", "Problem Solver"];
let index = 0;
let professionIndex = 0;

function typeText() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (index > 0) {
        typingElement.innerHTML = text.substring(0, index - 1);
        index--;
        setTimeout(eraseText, 50);
    } else {
        setTimeout(typeText, 1000);
    }
}

function changeProfession() {
    professionElement.textContent = professions[professionIndex];
    professionIndex = (professionIndex + 1) % professions.length;
}

typeText();
setInterval(changeProfession, 3000);

// Sticky header
const header = document.querySelector('header');
const sticky = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

window.addEventListener('scroll', stickyHeader);

// Project showcase
const projects = [
    { id: 1, title: "Project 1", category: "web", image: "page1.jpg", description: "A web application for managing tasks." },
    { id: 2, title: "Project 2", category: "app", image: "page2.jpg", description: "A mobile app for tracking fitness goals." },
    { id: 3, title: "Project 3", category: "design", image: "page3.jpg", description: "A branding project for a local business." },
    { id: 4, title: "Project 4", category: "web", image: "page4.jpg", description: "An e-commerce website for a clothing brand." }
];

const projectsContainer = document.querySelector('.projects');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(projectsToRender) {
    projectsContainer.innerHTML = '';
    projectsToRender.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.dataset.category = project.category;
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="#" class="btn">View Project</a>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

renderProjects(projects);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);
        renderProjects(filteredProjects);
    });
});

// Skills chart
const ctx = document.getElementById('skills-chart').getContext('2d');
new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'UI/UX Design', 'Python'],
        datasets: [{
            label: 'Skills',
            data: [90, 85, 80, 75, 70, 65],
            backgroundColor: 'rgba(14, 125, 146, 0.2)',
            borderColor: 'rgba(14, 125, 146, 1)',
            pointBackgroundColor: 'rgba(14, 125, 146, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(14, 125, 146, 1)'
        }]
    },
    options: {
        scale: {
            ticks: { beginAtZero: true, max: 100 }
        }
    }
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function showError(input, message) {
    const errorElement = input.nextElementSibling.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(input) {
    const errorElement = input.nextElementSibling.nextElementSibling;
    errorElement.style.display = 'none';
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        hideError(nameInput);
    }

    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    } else {
        hideError(emailInput);
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else {
        hideError(messageInput);
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });
        contactForm.reset();
        alert('Thank you for your message. I will get back to you soon!');
    }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for animations
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Lazy loading images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('loading');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

