document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.querySelector("#mobileMenuButton");
  const navLinks = document.querySelector("#navLinks");

  mobileMenuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenuButton.textContent = isOpen ? "×" : "☰";
  });

  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      mobileMenuButton.setAttribute("aria-expanded", "false");
      mobileMenuButton.textContent = "☰";
    });
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      galleryItems.forEach((item) => {
        const category = item.dataset.category;
        item.hidden = filter !== "all" && category !== filter;
      });
    });
  });

  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.closest(".faq-item");
      const isOpen = faqItem.classList.toggle("open");

      question.setAttribute("aria-expanded", String(isOpen));
    });
  });

  const form = document.querySelector("#estimateForm");
  const formSteps = document.querySelectorAll(".form-step");
  const stepCount = document.querySelector("#stepCount");
  const successState = document.querySelector("#successState");
  const formHeader = document.querySelector(".form-header");

  let currentStep = 1;

  function showStep(step) {
    currentStep = step;

    formSteps.forEach((stepElement) => {
      stepElement.classList.toggle(
        "active",
        Number(stepElement.dataset.step) === currentStep
      );
    });

    stepCount.textContent = `Step ${currentStep} of 3`;
  }

  function validateCurrentStep() {
    const activeStep = document.querySelector(
      `.form-step[data-step="${currentStep}"]`
    );

    const fields = activeStep.querySelectorAll("input, select, textarea");

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }

    return true;
  }

  document.querySelectorAll("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!validateCurrentStep()) return;

      if (currentStep < 3) {
        showStep(currentStep + 1);
      }
    });
  });

  document.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateCurrentStep()) return;

    form.hidden = true;
    formHeader.querySelector("h3").textContent = "You're on the list.";
    stepCount.hidden = true;
    successState.hidden = false;
  });
});
