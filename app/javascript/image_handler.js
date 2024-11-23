document.addEventListener("DOMContentLoaded", () => {
  const thumbnailInput = document.getElementById("thumbnail-input");
  const previewImage = document.getElementById("preview-image");

  if (thumbnailInput) {
    thumbnailInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result; // Set the preview image
          previewImage.style.display = "block"; // Make it visible
        };
        reader.readAsDataURL(file);
      } else {
        // If no file is selected, hide the preview
        previewImage.src = '';
        previewImage.style.display = "none";
      }
    });
  }
});