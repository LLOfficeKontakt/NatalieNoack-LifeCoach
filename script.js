const THEME_KEY = "life-coach-theme";
const toggleButtons = document.querySelectorAll("[data-theme-toggle]");
const navToggleButtons = document.querySelectorAll("[data-nav-toggle]");
const backToTopButton = document.querySelector("[data-back-to-top]");
const checkButtons = document.querySelectorAll("[data-check]");
const checkResult = document.querySelector("[data-check-result]");

const checkMessages = {
  ruhig:
    "Impuls: Setzen Sie heute eine klare Grenze und atmen Sie 3 Minuten bewusst durch, bevor Sie reagieren.",
  gesund:
    "Impuls: Planen Sie eine 15-Minuten-Pause ohne Bildschirm – Ihr Nervensystem dankt es Ihnen.",
  klar: "Impuls: Schreiben Sie die 3 wichtigsten Entscheidungen für diese Woche auf und priorisieren Sie neu.",
};

const applyTheme = (theme) => {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.removeAttribute("data-theme");
  }
};

const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme("dark");
}

const toggleTheme = () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
};

toggleButtons.forEach((button) => {
  button.addEventListener("click", toggleTheme);
});

navToggleButtons.forEach((button) => {
  const nav = button.closest(".nav");
  const menu = nav ? nav.querySelector("[data-nav-menu]") : null;
  if (!menu) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
});

if (checkButtons.length > 0 && checkResult) {
  checkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.check;
      const message = checkMessages[key];
      checkButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      checkResult.textContent = message || "";
    });
  });
}

if (backToTopButton) {
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      backToTopButton.classList.add("is-visible");
    } else {
      backToTopButton.classList.remove("is-visible");
    }
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
