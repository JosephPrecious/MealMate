export function initializeDarkMode() {
  const button =
    document.querySelector("#darkModeBtn");

  // Apply saved theme immediately
  const savedTheme =
    localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  // If button doesn't exist stop here
  if (!button) return;

  updateButtonText();

  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

    updateButtonText();
  });

  function updateButtonText() {
    if (document.body.classList.contains("dark")) {
      button.textContent = "☀ Light";
    } else {
      button.textContent = "🌙 Dark";
    }
  }
}