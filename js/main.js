// App Initializer & UI Interactions
document.addEventListener("DOMContentLoaded", () => {
  // 1. Render Skills
  renderSkills();

  // 2. Render Projects
  renderProjects();

  // 3. Initialize Three.js Scene
  if (typeof HeroScene !== "undefined") {
    new HeroScene();
  }

  // 4. Initialize GSAP Animations
  if (typeof AnimationController !== "undefined") {
    new AnimationController();
  }

  // 5. Initialize Custom Cursor & Interactions
  initCursor();

  // 6. Mobile Menu Logic
  initMobileMenu();

  // 7. Modal Listeners
  initModalListeners();
});

function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container || !PORTFOLIO_DATA) return;

  container.innerHTML = PORTFOLIO_DATA.skills
    .map(
      (s) => `
    <div class="skill-card reveal-on-scroll">
      <i class="bi ${s.icon} skill-icon"></i>
      <h3 class="skill-category-title">${s.category}</h3>
      <div class="skill-tags">
        ${s.tags.map((t) => `<span class="skill-tag">${t}</span>`).join("")}
      </div>
    </div>
  `,
    )
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container || !PORTFOLIO_DATA) return;

  container.innerHTML = PORTFOLIO_DATA.projects
    .map(
      (p) => `
    <div class="project-card reveal-on-scroll" data-project-id="${p.id}">
      <div class="project-number">${p.num}</div>
      <div class="project-content">
        <div class="project-header">
          <h3 class="project-title">${p.title}</h3>
          <span class="project-category">${p.category}</span>
        </div>
        <p class="project-description">${p.description}</p>
        <div class="project-tech-stack">
          ${p.tech.map((t) => `<span class="project-tech-item">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

function initCursor() {
  const dot = document.getElementById("cursor-dot");
  const follower = document.getElementById("cursor-follower");

  if (!dot || !follower || window.innerWidth <= 768) return;

  window.addEventListener("mousemove", (e) => {
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
  });

  const hoverables = document.querySelectorAll(
    "a, button, .project-card, .skill-card",
  );
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => follower.classList.add("active"));
    el.addEventListener("mouseleave", () =>
      follower.classList.remove("active"),
    );
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

function initModalListeners() {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-content-body");
  const closeBtn = document.getElementById("modal-close");

  if (!modal || !modalBody) return;

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (card) {
      const pId = card.dataset.projectId;
      const project = PORTFOLIO_DATA.projects.find((p) => p.id === pId);
      if (project) {
        modalBody.innerHTML = `
          <div class="modal-category">${project.category}</div>
          <h2 class="modal-title">${project.title}</h2>
          <p class="modal-body-text">${project.description}</p>
          <h4 style="margin-bottom:10px; font-family:var(--font-heading);">Technologies Used:</h4>
          <div class="modal-tech-list">
            ${project.tech.map((t) => `<span class="project-tech-item">${t}</span>`).join("")}
          </div>
        `;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// 3D Card Tilt Effect on Hover
function initCardTilt() {
  const card = document.getElementById("profile-card");
  if (!card || window.innerWidth <= 768) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -12;
    const tiltY = (x / (rect.width / 2)) * 12;

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  initCardTilt();
});
