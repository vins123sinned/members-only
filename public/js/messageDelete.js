const deleteButtons = document.querySelectorAll(".delete-button");
const formCancelButton = document.querySelector(".form-cancel-button");
const formDeleteButton = document.querySelector(".form-delete-button");
const deleteConfirmationSection = document.querySelector(
  ".delete-confirmation-section",
);
const deleteConfirmationForm = document.querySelector(
  ".delete-confirmation-form",
);

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    deleteConfirmationSection.classList.remove("hidden");
    deleteConfirmationForm.action = `messages/delete/${button.dataset.id}`;
  });
});

formCancelButton.addEventListener("click", () => {
  deleteConfirmationSection.classList.add("hidden");
  deleteConfirmationForm.removeAttribute("action");
});

// MOVE THIS TO THE JS FOLDER LATER
