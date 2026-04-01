// Preloader
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Custom cursor
document.addEventListener("DOMContentLoaded", function () {
  var dot = document.getElementById("cursorDot");
  var ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  var mouseX = 0, mouseY = 0;
  var ringX = 0, ringY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX - 4 + "px";
    dot.style.top = mouseY - 4 + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  var hoverables = document.querySelectorAll("a, button, input, textarea, .proj-card, .svc-card, .rsm-card");
  hoverables.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      ring.classList.add("hover");
      dot.style.transform = "scale(2)";
    });
    el.addEventListener("mouseleave", function () {
      ring.classList.remove("hover");
      dot.style.transform = "scale(1)";
    });
  });
});


// Word flip animation
document.addEventListener("DOMContentLoaded", function () {
  var words = [
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "Database Management",
    "Desktop Applications",
    "Roblox Studio"
  ];
  var el = document.getElementById("typed-output");
  if (!el) return;

  var index = 0;
  el.textContent = words[0];

  setInterval(function () {
    el.classList.add("flip-out");

    setTimeout(function () {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.classList.remove("flip-out");
      el.classList.add("flip-in");

      setTimeout(function () {
        el.classList.remove("flip-in");
      }, 500);
    }, 400);
  }, 3000);
});

// Navbar scroll effect + back to top
window.addEventListener("scroll", function () {
  var navbar = document.getElementById("mainNav");
  var backToTop = document.getElementById("backToTop");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }
});

// Dynamic footer year
document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("footerYear");
  if (el) el.textContent = new Date().getFullYear();
});

// Smooth scroll for nav links
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");
  var navCollapse = document.getElementById("navbarNav");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var targetId = this.getAttribute("href");
      var target = document.querySelector(targetId);

      if (target) {
        var offset = document.getElementById("mainNav").offsetHeight;
        var top = target.offsetTop - offset;
        window.scrollTo({ top: top, behavior: "smooth" });

        if (navCollapse.classList.contains("show")) {
          var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }

      navLinks.forEach(function (l) { l.classList.remove("active"); });
      this.classList.add("active");
    });
  });

  // Update active nav on scroll
  var sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    var current = "";
    var offset = document.getElementById("mainNav").offsetHeight + 10;

    sections.forEach(function (section) {
      var top = section.offsetTop - offset;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
});

// Side section navigator
document.addEventListener("DOMContentLoaded", function () {
  var sideNav = document.getElementById("sideNav");
  var sideNum = document.getElementById("sideNavNum");
  var upBtn = document.getElementById("sideNavUp");
  var downBtn = document.getElementById("sideNavDown");
  var numbered = document.querySelectorAll("section[data-section-num]");
  var allSections = [document.getElementById("home")];
  numbered.forEach(function (s) { allSections.push(s); });

  var currentIndex = 0;

  function updateSideNav() {
    var scrollY = window.scrollY;
    var navH = document.getElementById("mainNav").offsetHeight;

    // Show/hide
    if (scrollY > 300) {
      sideNav.classList.add("visible");
    } else {
      sideNav.classList.remove("visible");
    }

    // Find current section
    for (var i = allSections.length - 1; i >= 0; i--) {
      if (scrollY >= allSections[i].offsetTop - navH - 50) {
        currentIndex = i;
        break;
      }
    }

    var sec = allSections[currentIndex];
    var num = sec.getAttribute("data-section-num") || "00";
    sideNum.textContent = num;

    var prevSec = allSections[Math.max(0, currentIndex - 1)];
    var nextSec = allSections[Math.min(allSections.length - 1, currentIndex + 1)];
    var prevEl = document.getElementById("sideNavPrev");
    var nextEl = document.getElementById("sideNavNext");
    if (prevEl) prevEl.textContent = prevSec.getAttribute("data-section-num") || "00";
    if (nextEl) nextEl.textContent = nextSec.getAttribute("data-section-num") || "";
  }

  window.addEventListener("scroll", updateSideNav);
  updateSideNav();

  upBtn.addEventListener("click", function () {
    var prev = Math.max(0, currentIndex - 1);
    var target = allSections[prev];
    var offset = document.getElementById("mainNav").offsetHeight;
    window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  });

  downBtn.addEventListener("click", function () {
    var next = Math.min(allSections.length - 1, currentIndex + 1);
    var target = allSections[next];
    var offset = document.getElementById("mainNav").offsetHeight;
    window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
  });
});

// Scroll reveal animations
document.addEventListener("DOMContentLoaded", function () {
  var reveals = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right");

  function checkReveal() {
    var windowHeight = window.innerHeight;
    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", checkReveal);
  checkReveal();
});

// Contact form handling
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var btn = document.getElementById("submitBtn");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    var data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    }).then(function (res) {
      if (res.ok) {
        status.className = "form-status success";
        status.textContent = "Message sent successfully! I'll get back to you soon.";
        form.reset();
      } else {
        status.className = "form-status error";
        status.textContent = "Something went wrong. Please try emailing me directly.";
      }
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    }).catch(function () {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    });
  });
});

// Music toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  var musicToggle = document.getElementById("musicToggle");
  var bgMusic = document.getElementById("bgMusic");
  
  if (!musicToggle || !bgMusic) return;

  // Check if user has set a preference in localStorage
  var hasUserPreference = localStorage.getItem("musicPlaying") !== null;
  var isMusicPlaying = hasUserPreference 
    ? localStorage.getItem("musicPlaying") === "true" 
    : true; // Default to true (autoplay) for new visitors
  
  // Set initial state
  if (isMusicPlaying) {
    musicToggle.classList.add("active");
    // Attempt to autoplay music
    bgMusic.play().catch(function() {
      // Autoplay might be blocked by browser policy
      // Music will play on first user interaction
    });
  }

  // Toggle music on button click
  musicToggle.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play().then(function() {
        musicToggle.classList.add("active");
        localStorage.setItem("musicPlaying", "true");
      }).catch(function(error) {
        console.log("Audio playback error:", error);
      });
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("active");
      localStorage.setItem("musicPlaying", "false");
    }
  });

  // Resume music on any user interaction if it was playing before
  document.addEventListener("click", function() {
    if (bgMusic.paused && localStorage.getItem("musicPlaying") === "true") {
      bgMusic.play().catch(function() {});
    }
  }, { once: true });
});
