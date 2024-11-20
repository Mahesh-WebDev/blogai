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

  // 
  const genaiRadio = document.getElementById("genai-radio");
  const manualRadio = document.getElementById("manual-radio");
  const genaiButtonContainer = document.getElementById("genai-button-container");
  const generateButton = document.getElementById("generate-button");
  const loadingIndicator = document.getElementById("loadingIndicator");

  // Initial check if GenAi is selected
  if (genaiRadio && genaiButtonContainer) {
    if (genaiRadio.checked) {
      genaiButtonContainer.style.display = "block"; // Show button if GenAi is selected
    } else {
      genaiButtonContainer.style.display = "none"; // Hide button otherwise
    }

    // Add event listeners to handle radio button change
    genaiRadio.addEventListener("change", function() {
      if (genaiRadio.checked) {
        genaiButtonContainer.style.display = "block"; // Show the button when GenAi is selected
      }
    });

    manualRadio.addEventListener("change", function() {
      if (manualRadio.checked) {
        genaiButtonContainer.style.display = "none"; // Hide the button when Manual is selected
      }
    });
  }

  // Add event listener for the "Generate Content" button click
  if (generateButton) {
    generateButton.addEventListener("click", function() {
      // Disable the button and show the loading indicator
      generateButton.disabled = true;
      loadingIndicator.style.display = "block";  // Show the loading indicator
      const title = titleInput.value;
  
      if (title) {
        fetch('/blogs/generate_blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({ title: title })
        })
        .then(response => response.json())
        .then(data => {
          if (data.body) {
            bodyInput.value = data.body;
            bodyCounter.textContent = `${bodyInput.value.length} / ${bodyInput.maxLength}`;
            // Re-enable the button and hide the loading indicator
            generateButton.disabled = false;
            loadingIndicator.style.display = "none";
          }
        })
        .catch(error => {
          console.error('Error:', error)
         // Re-enable the button and hide the loading indicator in case of an error
          generateButton.disabled = false;
          loadingIndicator.style.display = "none";
        });
        
      } else {
        alert('Please enter a title.');
      }
    });
  }
});