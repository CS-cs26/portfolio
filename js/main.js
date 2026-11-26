const projectsGrid = document.getElementById("projects-grid");
const cardTemplate = document.getElementById("project-card-template");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeBtn = document.getElementById("theme-btn");
const greeting = document.getElementById("greeting");
const copyBtn = document.getElementById("copy-btn");

function renderProjects(list) {
  projectsGrid.replaceChildren();

  list.forEach((project) => {
    const clone = cardTemplate.content.cloneNode(true);

    const img = clone.querySelector(".project-img");
    img.src = project.image;
    img.alt = project.title;

    clone.querySelector(".project-title").textContent = project.title;
    clone.querySelector(".project-desc").textContent = project.description;

    const tagsBox = clone.querySelector(".project-tags");
    project.tags.forEach((tagText) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tagText;
      tagsBox.appendChild(span);
    });

    const demoLink = clone.querySelector(".demo-link");
    if (project.demo) {
      demoLink.href = project.demo;
    } else {
      demoLink.remove();
    }

    clone.querySelector(".code-link").href = project.code;

    projectsGrid.appendChild(clone);
  });
}

renderProjects(projects);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");

    const category = btn.dataset.category;
    if (category === "all") {
      renderProjects(projects);
    } else {
      const filtered = projects.filter((p) => p.category === category);
      renderProjects(filtered);
    }
  });
});

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.textContent = theme === "dark" ? "الوضع الفاتح ☀️" : "الوضع الداكن 🌙";
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

const hour = new Date().getHours();
if (greeting) {
  greeting.textContent = hour < 12 ? "صباح الخير، أهلاً بك في موقعي ☀️" : "مساء الخير، أهلاً بك في موقعي ✨";
}

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("s448003213@uqu.edu.sa");
    copyBtn.textContent = "تم نسخ البريد ✓";
    setTimeout(() => {
      copyBtn.textContent = "نسخ البريد";
    }, 2000);
  });
}

const sections = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

sections.forEach((sec) => observer.observe(sec));

const navLinks = document.querySelectorAll(".nav-links a");
const trackedSections = document.querySelectorAll("main section[id]");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

trackedSections.forEach((sec) => navObserver.observe(sec));