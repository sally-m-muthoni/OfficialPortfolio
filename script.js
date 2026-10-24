const menuToggle = document.querySelector(".menu-toggle");
const topNavigation = document.querySelector(".top-navigation");

if (menuToggle && topNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    topNavigation.classList.toggle("is-open", !isExpanded);
  });

  topNavigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      topNavigation.classList.remove("is-open");
    }
  });
}

const yearElement = document.querySelector("[data-current-year]");
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
      "This form is not connected yet. We’ll set up email delivery once your contact email is added.";
  });
}
