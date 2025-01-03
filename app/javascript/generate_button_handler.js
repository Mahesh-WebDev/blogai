document.addEventListener("DOMContentLoaded", () => {
    const genaiRadio = document.getElementById("genai-radio");
    const manualRadio = document.getElementById("manual-radio");
    const genaiButtonContainer = document.getElementById("genai-button-container");
    const generateButton = document.getElementById("generate-button");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const errorMessageElement = document.getElementById('error-message');
    const titleInput = document.getElementById("title-input");
    const bodyInput = document.getElementById("body-input");
    const bodyCounter = document.getElementById("body-counter");

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
            fetch('/blogs/generate_blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ title: title })
            })
            .then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                throw new Error(error.error || 'An error occurred');
                });
            }
            return response.json();
            })
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
            errorMessageElement.textContent = error.message;
            errorMessageElement.style.display="block"
            // Re-enable the button and hide the loading indicator in case of an error
            generateButton.disabled = false;
            loadingIndicator.style.display = "none";
            });
        });
    }
});