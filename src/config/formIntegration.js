/**
 * Contact Form Integration Configuration
 *
 * PRODUCTION INTEGRATION REQUIRED:
 * The site currently runs in preview mode with provider "simulated".
 * Enquiries are NOT sent to DIVINECREATORS until a real provider is configured
 * and the matching block in src/utils/contactForm.js is enabled.
 *
 * Choose one of the options below, update provider, then test end-to-end
 * before going live.
 *
 * --- EmailJS ---
 * 1. Create an account at https://www.emailjs.com/
 * 2. Set up a service and email template
 * 3. Install: npm install @emailjs/browser
 * 4. Add your public key, service ID and template ID below
 * 5. Uncomment the EmailJS block in contactForm.js
 *
 * --- Formspree ---
 * 1. Create a form at https://formspree.io/
 * 2. Add your form endpoint below
 * 3. Uncomment the Formspree block in contactForm.js
 *
 * --- Web3Forms ---
 * 1. Get an access key at https://web3forms.com/
 * 2. Add your access key below
 * 3. Uncomment the Web3Forms block in contactForm.js
 */

export const formIntegration = {
  provider: "simulated", // 'simulated' | 'emailjs' | 'formspree' | 'web3forms'

  emailjs: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  },

  formspree: {
    endpoint: "https://formspree.io/f/YOUR_FORM_ID",
  },

  web3forms: {
    accessKey: "YOUR_WEB3FORMS_ACCESS_KEY",
  },
};
