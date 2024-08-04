document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.height = ripple.style.width =
      Math.max(rect.width, rect.height) + "px";
    button.appendChild(ripple);
    ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + "px";
    ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + "px";
    ripple.classList.add("show");
    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".percentage-input");

  inputs.forEach((input) => {
    // Function to update the input background based on value
    function updateBackground() {
      let value = parseFloat(input.value);

      // Ensure value is between 0 and 100
      value = Math.max(0, Math.min(100, value));

      // Update background size to reflect the percentage
      input.style.backgroundSize = `${value}% 100%`;
    }

    // Function to hide value when not hovering
    function hideValue() {
      input.classList.add("blur");
      input.style.color = "transparent";
    }

    // Function to show value when hovering
    function showValue() {
      input.classList.remove("blur");
      input.style.color = "";
      updateBackground();
    }

    // Initialize default background size and hide value
    updateBackground();
    hideValue();

    // Add event listeners to update background on input
    input.addEventListener("input", updateBackground);
    input.addEventListener("change", updateBackground);

    // Add event listeners to hide and show value on mouseover and mouseout
    input.addEventListener("mouseover", showValue);
    input.addEventListener("mouseout", hideValue);
  });
});

// Function to save content to localStorage
function saveContentToLocalStorage() {
  const elements = document.querySelectorAll(
    '[contenteditable="true"], .percentage-input, .education-item, .element-experience'
  );
  elements.forEach((element) => {
    const key = element.getAttribute("data-key");

    if (element.tagName === "INPUT") {
      localStorage.setItem(key, element.value);
    } else {
      if (
        element.classList.contains("education-item") ||
        element.classList.contains("element-experience")
      ) {
        localStorage.setItem(
          key,
          element.classList.contains("active-education") ||
            element.classList.contains("cart-active")
        );
      } else {
        localStorage.setItem(key, element.innerText);
      }
    }
  });
}

// Function to load content from localStorage
function loadContentFromLocalStorage() {
  let activeEducationExists = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const element = document.querySelector(`[data-key="${key}"]`);

    if (element) {
      if (element.tagName === "INPUT") {
        element.value = value;
        element.style.backgroundSize = `${element.value}% 100%`;
      } else {
        if (
          element.classList.contains("education-item") ||
          element.classList.contains("element-experience")
        ) {
          if (value === "true") {
            if (element.classList.contains("education-item")) {
              element.classList.add("active-education");
              activeEducationExists = true;
            } else if (element.classList.contains("element-experience")) {
              element.classList.add("cart-active");
            }
          } else {
            if (element.classList.contains("education-item")) {
              element.classList.remove("active-education");
            } else if (element.classList.contains("element-experience")) {
              element.classList.remove("cart-active");
            }
          }
        } else {
          element.innerText = value;
        }
      }
    }
  }

  const educationItem1 = document.querySelector('[data-key="education-item1"]');
  if (
    educationItem1 &&
    activeEducationExists &&
    localStorage.getItem("education-item1") === true
  ) {
    educationItem1.classList.remove("active-education");
  }
}

// Save content on blur and input change events
document.addEventListener("DOMContentLoaded", () => {
  loadContentFromLocalStorage();
  const elements = document.querySelectorAll(
    '[contenteditable="true"], .percentage-input, .education-item, .element-experience'
  );
  elements.forEach((element) => {
    if (element.classList.contains("education-item")) {
      element.addEventListener("click", () => {
        document.querySelectorAll(".education-item").forEach((item) => {
          item.classList.remove("active-education");
        });
        element.classList.add("active-education");
        saveContentToLocalStorage();
      });
    }

    if (element.classList.contains("element-experience")) {
      element.addEventListener("click", () => {
        document.querySelectorAll(".element-experience").forEach((item) => {
          item.classList.remove("cart-active");
        });
        element.classList.add("cart-active");
        saveContentToLocalStorage();
      });
    }

    element.addEventListener("input", saveContentToLocalStorage);
  });
});

document.getElementById("download-pdf").addEventListener("click", function () {
  var element = document.querySelector(".container");
  var opt = {
    margin: 0,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, windowWidth: 1000 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(element).set(opt).save();
});

document.addEventListener("DOMContentLoaded", (event) => {
  const experienceElements = document.querySelectorAll(".element-experience");

  experienceElements.forEach((element) => {
    element.addEventListener("click", () => {
      experienceElements.forEach((el) => el.classList.remove("cart-active"));
      element.classList.add("cart-active");
    });
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const experienceElements = document.querySelectorAll(".education-item");

  experienceElements.forEach((element) => {
    element.addEventListener("click", () => {
      experienceElements.forEach((el) =>
        el.classList.remove("active-education")
      );
      element.classList.add("active-education");
    });
  });
});
