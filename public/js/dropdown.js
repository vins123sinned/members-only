const menuButton = document.querySelector(".menu-button");
const menuDropdown = document.querySelector(".menu-dropdown");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("open");
  menuDropdown.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {
  if (
    !menuDropdown.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    menuButton.classList.remove("open");
    menuDropdown.classList.add("hidden");
  }
});
