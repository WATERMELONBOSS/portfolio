$(document).ready(function () {
  // Sticky header + Active section update
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });
function toggleMenu() {
  const navLinks = document.querySelector(".navbar ul");
  navLinks.classList.toggle("active");
}
  // Typed.js hero effect
  const typed = new Typed(".typed-text", {
    strings: ["Hello 👋", "I’m Milan Srinivas"],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1000,
    showCursor: true,
    loop: false,
  });

const hobbyTabs = document.querySelectorAll(".tab");
const hobbyDisplay = document.getElementById("hobby-display");

const hobbyData = {
  pet: {
    desc: "I'm a proud parent to five amazing dogs—Rottweilers and Labradors—we’ve raised them since they were playful little pups. Over the years, I’ve grown into a professional dog handler, traveling across India with my Rottweilers to compete in championship shows where they've earned multiple Best of Breed and Champion titles. Together with my dad, we run a KCI-registered kennel, a passion project we’ve built with love, discipline, and deep respect for the breeds.",
    media: ["media/Hobbies/pet-1.mp4", "media/Hobbies/pet-2.mp4", "media/Hobbies/pet-3.mp4"]
  },
travel: {
  desc: "I love traveling, trekking, and surfing—anything that gets me outdoors and off the grid. I've been lucky to explore indoor skydiving in Bahrain, wildlife safaris in Masai Mara, and misty hikes in Sakleshpur, among many other adventures. I continue to travel and meet new people whenever I get the chance—it's my way of collecting stories, cultures, and memories.",
  media: ["media/Hobbies/travel-1.jpeg", "media/Hobbies/travel-2.jpeg", "media/Hobbies/travel-3.mp4", "media/Hobbies/travel-4.mp4", "media/Hobbies/travel-5.mp4"]
},
  track: {
    desc: "I’m an adrenaline junkie with a deep love for motorcycles. Ever since I turned 18, I’ve been working to sharpen my skills—training with CRA Motorsports, getting certified as an intermediate track rider, and racing whenever I can. I ride a modded KTM RC 390 that I use to push my limits and keep learning on the track.",
    media: ["media/Hobbies/track-1.jpeg", "media/Hobbies/track-2.mp4", "media/Hobbies/track-3.mp4"]
  },
  fitness: {
    desc: "I'm a regular gymgoer and hit the gym 4–5 times a week. I love learning the science behind training and exploring new workout styles—I also box to mix things up. Outside the gym, I enjoy road cycling and often go on rides with local cycling groups to explore new routes and places.",
    media: ["media/Hobbies/fitness-1.jpeg", "media/Hobbies/fitness-2.png", "media/Hobbies/fitness-3.png", "media/Hobbies/fitness-4.jpeg"]
  }
};

let currentMediaIndex = 0;
let currentHobby = "pet";
let autoplayInterval = null;

function renderHobby(hobbyKey) {
  currentHobby = hobbyKey;
  currentMediaIndex = 0;
  const { desc } = hobbyData[hobbyKey];

  hobbyDisplay.innerHTML = `
    <div class="dots" id="carousel-dots"></div>
    <div class="hobby-carousel">
      <button class="carousel-btn left">&#8592;</button>
      <div class="carousel-media" id="carousel-media"></div>
      <button class="carousel-btn right">&#8594;</button>
    </div>
    <p class="hobby-desc">${desc}</p>
  `;


  loadMedia();
  addCarouselListeners();
  addSwipeSupport();
}

function loadMedia() {
  stopAutoplay(); // Always stop before loading
  const media = hobbyData[currentHobby].media[currentMediaIndex];
  const mediaContainer = document.getElementById("carousel-media");
  const isVideo = media.endsWith(".mp4");

  const mediaHTML = isVideo
    ? `<video src="${media}" class="carousel-item fade-in" controls playsinline></video>`
    : `<img src="${media}" alt="${currentHobby}" class="carousel-item fade-in" />`;

  const dotsHTML = hobbyData[currentHobby].media.map((_, idx) => `
    <span class="dot ${idx === currentMediaIndex ? 'active-dot' : ''}" data-index="${idx}"></span>
  `).join("");

  // Set media
  mediaContainer.innerHTML = `${mediaHTML}`;

  // Set dots in separate container
  const dotsContainer = document.getElementById("carousel-dots");
  dotsContainer.innerHTML = dotsHTML;



  // Optional fade-in effect delay
  setTimeout(() => {
    const item = document.querySelector(".carousel-item");
    if (item) item.classList.add("loaded");
  }, 50);

  // Dot navigation
  document.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", () => {
      currentMediaIndex = parseInt(dot.dataset.index);
      loadMedia();
    });
  });

  // if (isVideo) {
  //   const video = document.querySelector("video");
  //   video.addEventListener("ended", () => {
  //     currentMediaIndex = (currentMediaIndex + 1) % hobbyData[currentHobby].media.length;
  //     loadMedia();
  //   });
  // } else {
  //   startAutoplay(); // Only for images
  // }
}

let autoplayEnabled = false; // set to true to enable

function startAutoplay() {
  if (!autoplayEnabled) return;
  stopAutoplay();
  autoplayInterval = setInterval(() => {
    currentMediaIndex = (currentMediaIndex + 1) % hobbyData[currentHobby].media.length;
    loadMedia();
  }, 4000);
}
function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function addCarouselListeners() {
  document.querySelector(".carousel-btn.left").addEventListener("click", () => {
    currentMediaIndex = (currentMediaIndex - 1 + hobbyData[currentHobby].media.length) % hobbyData[currentHobby].media.length;
    loadMedia();
  });

  document.querySelector(".carousel-btn.right").addEventListener("click", () => {
    currentMediaIndex = (currentMediaIndex + 1) % hobbyData[currentHobby].media.length;
    loadMedia();
  });
}

function addSwipeSupport() {
  const mediaContainer = document.getElementById("carousel-media");
  let startX = 0;

  mediaContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  mediaContainer.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      currentMediaIndex = (diff > 0)
        ? (currentMediaIndex - 1 + hobbyData[currentHobby].media.length) % hobbyData[currentHobby].media.length
        : (currentMediaIndex + 1) % hobbyData[currentHobby].media.length;
      loadMedia();
    }
  });
}

// Tab switching
hobbyTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    hobbyTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderHobby(tab.dataset.hobby);
  });
});

renderHobby("travel");


  // Accordion toggle logic
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      item.classList.toggle("active");
    });
  });

  // Scroll Reveal Animations
  ScrollReveal({
    distance: "50px",
    duration: 1000,
    easing: "ease-out",
    origin: "bottom",
    reset: false,
  });

  ScrollReveal().reveal(".hero-section", { origin: "top" });
  ScrollReveal().reveal(".about-section", { delay: 100 });
  ScrollReveal().reveal(".skills-section .skill", { interval: 100 });
  ScrollReveal().reveal(".hobbies-section", { delay: 100 });
  ScrollReveal().reveal(".accordion-item", { interval: 100 });
  ScrollReveal().reveal(".project-card", { interval: 100 });
  ScrollReveal().reveal(".contact-section", { delay: 100 });

  // Google Sheets form submission
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec";
  const form = document.forms["submitToGoogleSheet"];
  const msg = document.getElementById("msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });

  // Dark/Light Mode Toggle
  const toggleBtn = document.getElementById("theme-toggle");

function isLightMode() {
  return document.body.classList.contains("light");
}

// Set initial icon based on current theme
toggleBtn.innerHTML = isLightMode()
  ? '<i class="fas fa-sun"></i>'
  : '<i class="fas fa-moon"></i>';

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.innerHTML = isLightMode()
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  });
});
tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  background: {
    color: {
      value: "#121212"
    }
  },
  particles: {
    number: {
      value: 60
    },
    color: {
      value: "#fed700"
    },
    links: {
      enable: true,
      color: "#fed700",
      distance: 120
    },
    move: {
      enable: true,
      speed: 1
    },
    size: {
      value: 2
    }
  }
});


// Active section tracker
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
  
}
// ✅ Hamburger toggle (only one listener)
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
// Close mobile menu on nav link click
document.querySelectorAll(".navbar ul li a").forEach(link => {
  link.addEventListener("click", () => {
    const navbar = document.querySelector(".navbar ul");
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }
  });
});
