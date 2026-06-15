export function initializeDarkMode() {
  const button =
    document.querySelector("#darkModeBtn");

  if (!button) return;

  const current =
    localStorage.getItem("theme");

  if (current === "dark") {
    document.body.classList.add("dark");
  }

  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const theme =
      document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", theme);
  });
}