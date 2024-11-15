function toggleSection(sectionId)
{
    const sections = document.querySelectorAll('section');
    
    sections.forEach(function(section)
    {
        section.style.display = 'none';
    });
    
    const section = document.getElementById(sectionId);
    section.style.display = 'block';
}

// window.onload = function()
// {
//     toggleSection('about');
// };



// VISIT COUNTER
// let visitCount = localStorage.getItem('visitCount');
// if (!visitCount) {
//   visitCount = 1;
// } else {
//   visitCount = parseInt(visitCount) + 1;
// }
// localStorage.setItem('visitCount', visitCount);
// document.getElementById('visit-counter').textContent = 'Visits: ' + visitCount;



// // ACTIVE NAVLINK
// const navLinks = document.querySelectorAll('.navbar a');

// function removeActiveClass() {
//   navLinks.forEach(link => {
//     link.classList.remove('active');
//   });
// }

// // Function to set the 'active' class on the current section's link
// function setActiveLink() {
//   navLinks.forEach(link => {
//     const section = document.querySelector(link.getAttribute('href'));
//     const rect = section.getBoundingClientRect();

//     // Check if section is in the viewport
//     if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
//       removeActiveClass();
//       link.classList.add('active');
//     }
//   });
// }


// // Listen for scroll events
// window.addEventListener('scroll', setActiveLink);

// // Initialize active link when the page loads
// setActiveLink();


// EXTERNAL LINKS
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Select all links with a specific class or all <a> tags
    const links = document.querySelectorAll("a.external-link");

    links.forEach(link => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
});