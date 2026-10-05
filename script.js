"use strict";

const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem("resume-theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;

  if (themeToggle && themeLabel) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Aktifkan ${isDark ? "light" : "dark"} mode`);
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
  }

  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#151d28" : "#f7f8fa");
  }
}

setTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("resume-theme", nextTheme);
    setTheme(nextTheme);
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector("#navigation-links");

if (menuToggle && navigationLinks) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");
    navigationLinks.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Buka navigasi" : "Tutup navigasi");
    navigationLinks.classList.toggle("is-open", !isExpanded);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 681px)").matches) {
      closeMenu();
    }
  });
}
