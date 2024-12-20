
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// EXTERNAL LINKS
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");

    // Select all links with a specific class or all <a> tags
    const links = document.querySelectorAll("a.external-link");

    links.forEach(link => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });
    
    // VISIT COUNTER
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount)
    {
        visitCount = getRandomInt(1000);
    }
    else
    {
        visitCount = parseInt(visitCount) + 1;
    }
    localStorage.setItem('visitCount', visitCount);
    var visitCounterElement = document.getElementById('visit-counter');
    if (visitCounterElement) visitCounterElement.textContent = 'YOU ARE VISITOR #' + visitCount;
    else console.log("Cannot find visit-counter");
    
    // MOBILE
    function isMobile()
    {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    // Display the under construction message if on mobile
    if (isMobile())
    {
        const constructionDiv = document.getElementById('construction');
        constructionDiv.style.display = 'block'; // Show the message
        document.body.innerHTML = ''; // Clear other content
        document.body.appendChild(constructionDiv); // Add the under construction div
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectItem = entry.target;
                const projectGif = projectItem.querySelector(".project-item-gif");

                // Check if GIF is already prefetched
                if (projectGif && !projectGif.dataset.prefetched) {
                    const projectName = projectItem.dataset.projectName;
                    const animatedImage = `images/${projectName}.gif`;
                    
                    const img = new Image();
                    img.src = animatedImage;
                    
                    projectGif.dataset.prefetchedGif = animatedImage;
                    projectGif.dataset.prefetched = "true";

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
        
        // Set the static image
        projectImage.style.backgroundImage = `url('images/${projectName}.png')`;
        
        // Hover in: Use the prefetched GIF if available
        const projectGif = projectItem.querySelector(".project-item-gif");
        if (projectGif)
        {
            projectItem.addEventListener("mouseover", () => {
                const prefetchedGif = projectGif.dataset.prefetchedGif || `images/${projectName}.gif`;
                projectGif.style.backgroundImage = `url('${prefetchedGif}')`;
                projectGif.style.opacity = "1";
            });

            // Hover out: Switch back to the static image
            projectItem.addEventListener("mouseout", () => {
                projectGif.style.opacity = "0";
                // setTimeout(() => {
                //     projectGif.style.backgroundImage = "none";
                // }, 500); 
            });
        }

        observer.observe(projectItem);
    });
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction()
{
    let mybutton = document.getElementById("top-button");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
    {
        mybutton.style.display = "block";
    }
    else
    {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
