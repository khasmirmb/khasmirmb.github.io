// Preloader
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Parallax effect on section number watermarks
window.addEventListener("scroll", function () {
  var sections = document.querySelectorAll("section[data-section-num]");
  var scrollY = window.scrollY;
  sections.forEach(function (sec) {
    var top = sec.offsetTop;
    var offset = (scrollY - top) * 0.08;
    sec.style.setProperty("--parallax-y", offset + "px");
  });
});

// Blur-up profile image
document.addEventListener("DOMContentLoaded", function () {
  var img = document.querySelector(".about-photo");
  if (!img) return;
  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", function () {
      img.classList.add("loaded");
    });
  }
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

// Scroll reveal animations using IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  var reveals = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-flip, .reveal-blur, .reveal-curtain");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for older browsers
    reveals.forEach(function (el) { el.classList.add("active"); });
  }
});


// Music toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  var musicToggle = document.getElementById("musicToggle");
  var bgMusic = document.getElementById("bgMusic");
  
  if (!musicToggle || !bgMusic) return;

  // Always show toggle as active by default
  musicToggle.classList.add("active");

  // Try to autoplay immediately
  bgMusic.play().catch(function() {
    // Browser blocked autoplay — start on first user interaction
  });

  // Start music on ANY first interaction if not already playing
  function startMusicOnInteraction() {
    if (bgMusic.paused && localStorage.getItem("musicPlaying") !== "false") {
      bgMusic.play().catch(function() {});
    }
    document.removeEventListener("click", startMusicOnInteraction);
    document.removeEventListener("scroll", startMusicOnInteraction);
    document.removeEventListener("keydown", startMusicOnInteraction);
  }
  document.addEventListener("click", startMusicOnInteraction);
  document.addEventListener("scroll", startMusicOnInteraction);
  document.addEventListener("keydown", startMusicOnInteraction);

  // Toggle music on button click
  musicToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    if (bgMusic.paused) {
      bgMusic.play().then(function() {
        musicToggle.classList.add("active");
        localStorage.setItem("musicPlaying", "true");
      }).catch(function() {});
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("active");
      localStorage.setItem("musicPlaying", "false");
    }
  });
});
