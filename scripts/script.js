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

document.addEventListener("DOMContentLoaded", () => {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectItem = entry.target;
                const projectImage = projectItem.querySelector(".project-item-image");
                const projectName = projectItem.dataset.projectName;

                // Check if GIF is already prefetched
                if (!projectImage.dataset.prefetched) {
                    const animatedImage = `images/${projectName}.gif`;

                    // Prefetch the GIF
                    const img = new Image();
                    img.onload = () => {
                        // GIF exists, save the URL
                        projectImage.dataset.prefetchedGif = animatedImage;
                        projectImage.dataset.prefetched = "true";
                    };
                    img.onerror = () => {
                        // GIF does not exist, fallback to PNG
                        projectImage.dataset.prefetched = "true";
                    };
                    img.src = animatedImage;

                    // Unobserve after prefetching
                    observer.unobserve(projectItem);
                }
            }
        });
    }, { threshold: 0.1 });

    // Select all project items and observe them
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach(projectItem => {
        const projectImage = projectItem.querySelector(".project-item-image");
        const projectName = projectItem.dataset.projectName;
        
        // Set the initial background image
        const staticImage = `images/${projectName}.png`;
        projectImage.style.backgroundImage = `url('${staticImage}')`;
        
        // Hover in: Use the prefetched GIF if available
        projectItem.addEventListener("mouseover", () => {
            const gif = projectImage.dataset.prefetchedGif;
            if (gif) {
                projectImage.style.backgroundImage = `url('${gif}')`;
            }
        });

        // Hover out: Switch back to the static image
        projectItem.addEventListener("mouseout", () => {
            projectImage.style.backgroundImage = `url('images/${projectName}.png')`;
        });

        observer.observe(projectItem);
    });
});