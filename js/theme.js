
    // Prelodaer

    window.addEventListener("load", function() {
        document.body.classList.add("loaded");
    });

    // Navbar Change The Active on Click
    window.addEventListener("load", function() {
        const navLinks = document.querySelectorAll(".nav-link");
        
        navLinks.forEach(function(link) {
          link.addEventListener("click", function(event) {
            event.preventDefault();
            
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              const targetOffsetTop = targetElement.offsetTop;
              
              window.scrollTo({
                top: targetOffsetTop,
                behavior: "smooth"
              });
              
              // Remove active class from all links
              navLinks.forEach(function(link) {
                link.classList.remove("active");
              });
              
              // Add active class to clicked link
              link.classList.add("active");
            }
          });
        });
      });

      // Change Navbar Active on Scroll
      window.addEventListener("load", function() {
        const navLinks = document.querySelectorAll(".nav-link");
        
        function changeActiveLink() {
          const scrollPosition = window.scrollY;
          
          navLinks.forEach(function(link) {
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              const targetOffsetTop = targetElement.offsetTop;
              const targetHeight = targetElement.offsetHeight;
              
              if (scrollPosition >= targetOffsetTop && scrollPosition < targetOffsetTop + targetHeight) {
                // Remove active class from all links
                navLinks.forEach(function(link) {
                  link.classList.remove("active");
                });
                
                // Add active class to corresponding link
                link.classList.add("active");
              }
            }
          });
        }
        
        // Call the function on initial load
        changeActiveLink();
        
        // Call the function on scroll
        window.addEventListener("scroll", changeActiveLink);
      });




