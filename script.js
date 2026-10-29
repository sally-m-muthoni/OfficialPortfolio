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

const projectGrid = document.querySelector("[data-project-grid]");
const projectMessage = document.querySelector("[data-project-message]");
const profileImage = document.querySelector("[data-profile-image]");

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path}: ${response.status}`);
  }
  return response.json();
}

function isSafeMediaUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  const url = value.trim();
  if (url.startsWith("/") && !url.startsWith("//")) {
    return true;
  }

  try {
    const parsedUrl = new URL(url, window.location.href);
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";
  } catch {
    return false;
  }
}

function createExternalLink(label, value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    const link = document.createElement("a");
    link.href = url.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(document.createTextNode(label));

    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = " ↗";
    link.append(arrow);
    return link;
  } catch {
    return null;
  }
}

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";

  const preview = document.createElement("div");
  preview.className = `project-preview ${index % 2 === 0 ? "preview-purple" : "preview-pink"}`;

  if (isSafeMediaUrl(project.image)) {
    const image = document.createElement("img");
    image.className = "project-screenshot";
    image.src = project.image.trim();
    image.alt = `${project.title} project overview`;
    image.loading = "lazy";
    preview.append(image);
  } else {
    const label = document.createElement("span");
    label.className = "preview-label";
    label.textContent = "PROJECT OVERVIEW";
    preview.append(label);
    const symbol = document.createElement("span");
    symbol.className = "preview-symbol";
    symbol.setAttribute("aria-hidden", "true");
    symbol.textContent = "✳";
    preview.append(symbol);
  }
  card.append(preview);

  const details = document.createElement("div");
  details.className = "project-details";
  const heading = document.createElement("div");
  if (typeof project.category === "string" && project.category.trim()) {
    const category = document.createElement("p");
    category.className = "project-category";
    category.textContent = project.category.trim();
    heading.append(category);
  }
  const title = document.createElement("h3");
  title.textContent = project.title.trim();
  heading.append(title);
  details.append(heading);

  const arrow = document.createElement("span");
  arrow.className = "project-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  details.append(arrow);

  if (typeof project.description === "string" && project.description.trim()) {
    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.description.trim();
    details.append(description);
  }

  const links = document.createElement("div");
  links.className = "project-links";
  const githubLink = createExternalLink("GitHub repository", project.githubUrl);
  const liveLink = createExternalLink("Live website", project.liveUrl);
  if (githubLink) links.append(githubLink);
  if (liveLink) links.append(liveLink);
  if (links.childElementCount > 0) details.append(links);

  card.append(details);
  return card;
}

async function renderProjects() {
  if (!projectGrid || !projectMessage) return;

  try {
    const projects = await loadJson("content/projects.json");
    if (!Array.isArray(projects)) {
      throw new Error("Project content must be a list.");
    }

    const validProjects = projects.filter((project) => {
      const valid = project && typeof project.title === "string" && project.title.trim();
      if (!valid) console.error("Skipping a project with no title.", project);
      return valid;
    });

    projectGrid.replaceChildren(...validProjects.map(createProjectCard));
    projectMessage.hidden = validProjects.length > 0;
    projectMessage.textContent = validProjects.length > 0
      ? ""
      : "Projects are coming soon. Please check back later.";
  } catch (error) {
    console.error("Unable to load portfolio projects.", error);
    projectMessage.textContent = "Projects could not be loaded. Please try again later.";
  }
}

async function loadProfileImage() {
  if (!profileImage) return;

  try {
    const profile = await loadJson("content/profile.json");
    if (isSafeMediaUrl(profile.portrait)) {
      profileImage.src = profile.portrait.trim();
    } else {
      throw new Error("The profile picture path is missing or invalid.");
    }
  } catch (error) {
    console.error("Unable to load the profile picture setting.", error);
  }
}

renderProjects();
loadProfileImage();
