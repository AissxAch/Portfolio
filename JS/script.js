// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); 
    alert('Right-click is disabled on this page.');
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    // Add transition class first
    body.classList.add('transition');
    // Then apply dark mode
    setTimeout(() => {
        body.classList.add('dark-mode');
        icon.classList.replace('bx-moon', 'bx-sun');
    }, 10);
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    // Add transition class
    body.classList.add('transition');
    
    setTimeout(() => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'light');
        }
        
        // Remove transition class after the animation
        setTimeout(() => {
            body.classList.remove('transition');
        }, 500);
    }, 10);
});