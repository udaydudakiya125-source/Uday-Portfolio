const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const themeButtons = document.querySelectorAll(".theme-toggle, .footer-theme");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const canHover = matchMedia("(hover: hover) and (pointer: fine)");
const savedTheme = localStorage.getItem("uday-theme");

function setTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
  document
    .querySelector(".theme-toggle")
    ?.setAttribute("aria-pressed", String(theme === "dark"));
  document
    .querySelector(".theme-toggle")
    ?.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
    );
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#0d0e0e" : "#f5f4f0");
  localStorage.setItem("uday-theme", theme);
}
setTheme(
  savedTheme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
);
themeButtons.forEach((button) =>
  button.addEventListener("click", () =>
    setTheme(body.classList.contains("dark") ? "light" : "dark"),
  ),
);

body.classList.add("js");
requestAnimationFrame(() => body.classList.add("motion-ready"));

function setHeaderState() {
  header.classList.toggle("scrolled", scrollY > 30);
}
setHeaderState();
addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
  body.style.overflow = open ? "hidden" : "";
});
mobileMenu
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => menuToggle?.click()));

document.querySelectorAll(".detail-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const open = panel.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.querySelector("span").textContent = open ? "−" : "+";
  });
});

document.querySelectorAll(".service-list button").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#service").value = button.dataset.service;
    document
      .querySelector("#contact")
      .scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
  }),
);

const motionSections = document.querySelectorAll(".section, .contact");
motionSections.forEach((section) => section.classList.add("motion-section"));
const sectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        sectionObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
);
motionSections.forEach((section) => sectionObserver.observe(section));

const projectObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        projectObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((item) => projectObserver.observe(item));

const navLinks = document.querySelectorAll(".desktop-nav a");
const navSections = ["about", "services", "work", "experience", "contact"].map(
  (id) => document.getElementById(id),
);
const navObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        ),
      );
    }),
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
);
navSections.forEach((section) => section && navObserver.observe(section));

document.querySelectorAll(".project-media").forEach((media) => {
  const projectLink = media
    .closest(".project")
    ?.querySelector(".project-links a[href]");
  if (!projectLink) return;

  media.setAttribute("role", "link");
  media.setAttribute("tabindex", "0");
  media.setAttribute(
    "aria-label",
    `Visit ${projectLink.textContent.replace("↗", "").trim()}`,
  );
  const openProject = () =>
    window.open(projectLink.href, "_blank", "noopener,noreferrer");
  media.addEventListener("click", openProject);
  media.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProject();
  });
});

const winniesSlides = document.querySelectorAll(".winnies-gallery img");
if (winniesSlides.length > 1) {
  let activeSlide = 0;
  setInterval(() => {
    winniesSlides[activeSlide].classList.remove("is-active");
    activeSlide = (activeSlide + 1) % winniesSlides.length;
    winniesSlides[activeSlide].classList.add("is-active");
  }, 4800);
}

const abhiSlides = document.querySelectorAll(".abhi-gallery img");
if (abhiSlides.length > 1) {
  let activeSlide = 0;
  setInterval(() => {
    abhiSlides[activeSlide].classList.remove("is-active");
    activeSlide = (activeSlide + 1) % abhiSlides.length;
    abhiSlides[activeSlide].classList.add("is-active");
  }, 4800);
}

const schoolSlides = document.querySelectorAll(".school-gallery img");
if (schoolSlides.length > 1) {
  let activeSlide = 0;
  setInterval(() => {
    schoolSlides[activeSlide].classList.remove("is-active");
    activeSlide = (activeSlide + 1) % schoolSlides.length;
    schoolSlides[activeSlide].classList.add("is-active");
  }, 4800);
}

if (!reduceMotion.matches && canHover.matches) {
  const heroObject = document.querySelector(".hero-object");
  let heroFrame;
  addEventListener(
    "pointermove",
    (event) => {
      if (!heroObject) return;
      cancelAnimationFrame(heroFrame);
      heroFrame = requestAnimationFrame(() => {
        const x = (event.clientX / innerWidth - 0.5) * 5;
        const y = (event.clientY / innerHeight - 0.5) * 5;
        heroObject.style.transform = `rotate(${-10 + x * 0.35}deg) translate(${x}px, ${y}px)`;
      });
    },
    { passive: true },
  );

  document
    .querySelectorAll(".button-primary, .header-cta")
    .forEach((button) => {
      button.classList.add("magnetic");
      button.addEventListener("pointermove", (event) => {
        const box = button.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width - 0.5) * 5;
        const y = ((event.clientY - box.top) / box.height - 0.5) * 4;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
      button.addEventListener("pointerleave", () => {
        button.style.transform = "";
      });
    });

  const cursor = document.createElement("div");
  cursor.className = "cursor-view";
  cursor.textContent = "VIEW";
  body.append(cursor);
  document.querySelectorAll(".project-media").forEach((media) => {
    media.addEventListener("pointerenter", () =>
      cursor.classList.add("visible"),
    );
    media.addEventListener("pointerleave", () =>
      cursor.classList.remove("visible"),
    );
    media.addEventListener("pointermove", (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
const contactForm = document.querySelector(".contact-form");
contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector(".form-submit");
  const formNote = contactForm.querySelector(".form-note");
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  if (formNote) formNote.textContent = "Sending your message...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      throw new Error(`Form submission failed: ${response.status}`);
    submitButton.textContent = "Message sent";
    if (formNote) formNote.textContent = "Your message was sent successfully.";
    window.location.hash = "top";
    window.location.reload();
  } catch {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    if (formNote)
      formNote.textContent = "Unable to send right now. Please try again.";
    HTMLFormElement.prototype.submit.call(contactForm);
  }
});
const schoolLabel = document.querySelector(".school-nav");
if (schoolLabel?.firstChild)
  schoolLabel.firstChild.nodeValue = "SCHOOL WEBSITE ";
const schoolSubheading = document.querySelector(".school-content b");
if (schoolSubheading)
  schoolSubheading.innerHTML = "ADMISSIONS<br><em>WEBSITE</em>";
const decorativeSchoolButton = document.querySelector(".school-content button");
if (decorativeSchoolButton) {
  decorativeSchoolButton.tabIndex = -1;
  decorativeSchoolButton.setAttribute("aria-hidden", "true");
}
