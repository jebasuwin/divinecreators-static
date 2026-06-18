import { formIntegration } from "../config/formIntegration";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone) => /^[\d\s+\-()]{7,20}$/.test(phone);

export const validateContactForm = (data) => {
  const errors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!data.service) {
    errors.service = "Please select a service.";
  }

  if (!data.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  if (!data.consent) {
    errors.consent = "Please agree to be contacted about your enquiry.";
  }

  return errors;
};

/**
 * Submit contact form data.
 * Currently simulates success. See src/config/formIntegration.js for setup.
 */
export const submitContactForm = async (data) => {
  const { provider } = formIntegration;

  if (provider === "simulated") {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, preview: Boolean(data.fullName) };
  }

  /* EmailJS integration example:
  if (provider === "emailjs") {
    const emailjs = await import("@emailjs/browser");
    await emailjs.send(
      formIntegration.emailjs.serviceId,
      formIntegration.emailjs.templateId,
      data,
      formIntegration.emailjs.publicKey
    );
    return { success: true };
  }
  */

  /* Formspree integration example:
  if (provider === "formspree") {
    const response = await fetch(formIntegration.formspree.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Submission failed");
    return { success: true };
  }
  */

  /* Web3Forms integration example:
  if (provider === "web3forms") {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: formIntegration.web3forms.accessKey,
        ...data,
      }),
    });
    const result = await response.json();
    if (!result.success) throw new Error("Submission failed");
    return { success: true };
  }
  */

  throw new Error(`Unknown form provider: ${provider}`);
};
