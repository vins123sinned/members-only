const deleteButtons = document.querySelectorAll(".delete-button");
const formCancelButton = document.querySelector(".form-cancel-button");
const formDeleteButton = document.querySelector(".form-delete-button");
const deleteConfirmationSection = document.querySelector(
  ".delete-confirmation-section",
);
const deleteConfirmationForm = document.querySelector(
  ".delete-confirmation-form",
);
const overlay = document.querySelector(".overlay");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    deleteConfirmationSection.classList.remove("hidden");
    overlay.classList.remove("hidden");
    deleteConfirmationForm.action = `messages/delete/${button.dataset.id}`;
  });
});

formCancelButton.addEventListener("click", () => {
  deleteConfirmationSection.classList.add("hidden");
  overlay.classList.add("hidden");
  deleteConfirmationForm.removeAttribute("action");
});
