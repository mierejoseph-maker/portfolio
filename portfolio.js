const contactForm = document.querySelector(".contact-form");
const newsletterForm = document.querySelector(".newsletter-form");

function showStatus(form, message, type = "") {
  const status = form.querySelector(".form-status");
  if (status) {
    status.textContent = message;
    status.className = `form-status ${type}`.trim();
  }
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector(".contact-submit");
  const endpoint = contactForm.action.replace(
    "https://formsubmit.co/",
    "https://formsubmit.co/ajax/",
  );
  submitButton.disabled = true;
  showStatus(contactForm, "Envoi du message en cours...");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(contactForm),
    });
    const result = await response.json();

    if (
      !response.ok ||
      (result.success !== true && result.success !== "true")
    ) {
      throw new Error("L'envoi a échoué");
    }

    showStatus(
      contactForm,
      "Message envoyé. Merci, je vous répondrai bientôt.",
    );
    contactForm.reset();
  } catch (error) {
    showStatus(
      contactForm,
      "Impossible d'envoyer le message. Réessayez ou écrivez-moi par e-mail.",
      "error",
    );
  } finally {
    submitButton.disabled = false;
  }
});

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  showStatus(newsletterForm, "Inscription confirmée. Merci !");
  newsletterForm.reset();
});
