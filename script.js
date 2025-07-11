// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")
const body = document.body

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem("theme") || "dark"
body.classList.add(currentTheme + "-theme")
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme")
    body.classList.add("light-theme")
    localStorage.setItem("theme", "light")
    updateThemeIcon("light")
  } else {
    body.classList.remove("light-theme")
    body.classList.add("dark-theme")
    localStorage.setItem("theme", "dark")
    updateThemeIcon("dark")
  }
})

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
  } else {
    themeIcon.className = "fas fa-moon"
  }
}

// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function updateActiveNavLink() {
  let current = ""
  const scrollPosition = window.pageYOffset + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === current) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", updateActiveNavLink)

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".about-text, .about-card, .skill-item, .project-card, .timeline-item, .contact-card",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll(".skill-progress")
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBar = entry.target
        const width = skillBar.getAttribute("data-width")
        skillBar.style.width = width + "%"
      }
    })
  },
  { threshold: 0.5 },
)

skillBars.forEach((bar) => {
  skillObserver.observe(bar)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`
  }
})

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const subtitle = document.querySelector(".hero-subtitle")
  if (subtitle) {
    const originalText = subtitle.textContent
    typeWriter(subtitle, originalText, 80)
  }
})

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Smooth reveal animation for timeline items
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateX(0)"
      }
    })
  },
  { threshold: 0.3 },
)

document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.style.opacity = "0"
  item.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"
  item.style.transition = "all 0.6s ease"
  timelineObserver.observe(item)
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.backdropFilter = "blur(15px)"
  } else {
    navbar.style.backdropFilter = "blur(10px)"
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Intersection Observer for counting animation
const countElements = document.querySelectorAll(".stat-number")
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalNumber = target.textContent.replace("+", "")
        animateCount(target, 0, Number.parseInt(finalNumber), 2000)
        countObserver.unobserve(target)
      }
    })
  },
  { threshold: 0.5 },
)

countElements.forEach((el) => {
  countObserver.observe(el)
})

function animateCount(element, start, end, duration) {
  let startTime = null
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const current = Math.floor(progress * (end - start) + start)
    element.textContent = current + "+"
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}

// Add smooth transitions for theme switching
document.addEventListener("DOMContentLoaded", () => {
  // Add transition classes to elements that should animate during theme switch
  const elementsToTransition = document.querySelectorAll(
    "body, .navbar, .hero, .about, .skills, .projects, .experience, .contact, .footer, .about-card, .skill-item, .project-card, .timeline-content, .contact-card",
  )

  elementsToTransition.forEach((el) => {
    el.style.transition = "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease"
  })
})

// Resume download functionality
document.addEventListener("DOMContentLoaded", () => {
  const resumeBtn = document.querySelector(".experience-cta .btn-resume")

  if (resumeBtn) {
    resumeBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Create a temporary link element for download
      const link = document.createElement("a")
      link.href = "resume dharmaraj.pdf" // Updated to match the actual file name
      link.download = "Dharmaraj_Kumar_Resume.pdf"

      // For demo purposes, show an alert
      //alert("Resume download would start here. In a real implementation, you would link to your actual PDF file.")

      // Uncomment the lines below when you have an actual PDF file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }
})

document.querySelectorAll(".contact-card").forEach((card) => {
  const url = card.getAttribute("data-link")
  if (url) {
    card.style.cursor = "pointer"
    card.addEventListener("click", () => {
      window.open(url, "_blank") // Use _blank for new tab
    })
  }
})
