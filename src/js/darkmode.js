export function initializeDarkMode() {
  const button = document.querySelector("#darkModeBtn");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (!button) return;

  updateButtonText();

  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateButtonText();
  });

  function updateButtonText() {
    button.textContent = document.body.classList.contains("dark")
      ? "Light"
      : "Dark";
  }
}
