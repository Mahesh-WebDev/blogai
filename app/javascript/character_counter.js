document.addEventListener("DOMContentLoaded", () => {
  // Title input counter
  const titleInput = document.getElementById("title-input");
  const titleCounter = document.getElementById("title-counter");

  if (titleInput) {
    titleInput.addEventListener("input", () => {
      titleCounter.textContent = `${titleInput.value.length} / ${titleInput.maxLength}`;
    });
  }
  
  // Body input counter
  const bodyInput = document.getElementById("body-input");
  const bodyCounter = document.getElementById("body-counter");
  
  if (bodyInput) {
    bodyInput.addEventListener("input", () => {
      bodyCounter.textContent = `${bodyInput.value.length} / ${bodyInput.maxLength}`;
    });
  }
});