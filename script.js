// Select the button used to switch light/dark mode.
const themeToggleButton = document.getElementById("themeToggle");

// When clicked, toggle the 'dark-mode' class on the <body> element.
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Update button text so users can see current mode action.
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggleButton.textContent = isDarkMode ? "Light" : "Dark";
});

// Smooth scrolling for all in-page navigation links.
const navAnchors = document.querySelectorAll('a[href^="#"]');

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      event.preventDefault();
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
