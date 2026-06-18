import { useState } from "react";
import SEO from "../components/common/SEO";
import PrimaryButton from "../components/common/PrimaryButton";
import { pageSeo } from "../data/seoConfig";
import { businessInfo, getWhatsAppLink } from "../data/businessInfo";
import { contactServiceOptions } from "../data/services";
import { validateContactForm, submitContactForm } from "../utils/contactForm";
import SocialLinks from "../components/common/SocialLinks";
import { getBreadcrumbSchema } from "../utils/schema";

const contactItems = [
  {
    icon: "bi-telephone",
    label: "Phone",
    content: <a href={businessInfo.phoneLink}>{businessInfo.phoneDisplay}</a>,
  },
  {
    icon: "bi-envelope",
    label: "Email",
    content: <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>,
  },
  {
    icon: "bi-whatsapp",
    label: "WhatsApp",
    content: (
      <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
        Chat with us
      </a>
    ),
  },
  {
    icon: "bi-geo-alt",
    label: "Address",
    content: businessInfo.location,
  },
  {
    icon: "bi-clock",
    label: "Working hours",
    content: businessInfo.workingHours,
  },
];

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  consent: false,
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const breadcrumb = [{ label: "Home", path: "/" }, { label: "Contact" }];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData(initialFormState);
    } catch {
      setErrors({ form: "Something went wrong. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={pageSeo.contact.title}
        description={pageSeo.contact.description}
        path={pageSeo.contact.path}
        schema={getBreadcrumbSchema(breadcrumb)}
      />

      <section className="contact-section">
        <div className="contact-shell">
          <aside className="contact-info-panel">
            <span className="contact-info-panel__label">Contact Details</span>
            <h1 className="contact-info-panel__title">Start a Conversation With Our Team.</h1>
            <p className="contact-info-panel__text">
              Whether you need better search visibility, more qualified leads, a stronger social presence or YouTube growth support, we are here to help.
            </p>

            <div className="contact-info-panel__details">
              {contactItems.map((item) => (
                <div className="contact-detail-item" key={item.label}>
                  <div className="contact-detail-item__icon" aria-hidden="true">
                    <i className={`bi ${item.icon}`} />
                  </div>
                  <div className="contact-detail-item__body">
                    <div className="contact-detail-item__label">{item.label}</div>
                    <div className="contact-detail-item__value">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>

            <SocialLinks className="contact-social" />
          </aside>

          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-form-success" role="status">
                <i className="bi bi-check-circle-fill" aria-hidden="true" />
                <h2>Thank you</h2>
                <p>Your enquiry has been recorded in this preview.</p>
              </div>
            ) : (
              <>
                <header className="contact-form-panel__header">
                  <span className="contact-form-panel__rule" aria-hidden="true" />
                  <span className="contact-form-panel__label">Send Us an Enquiry</span>
                  <h2 className="contact-form-panel__title">We&apos;re here to help.</h2>
                  <p className="contact-form-panel__desc">
                    Share your requirements and our team will contact you.
                  </p>
                </header>

                {errors.form && (
                  <div className="contact-form__alert" role="alert">{errors.form}</div>
                )}

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        className={errors.fullName ? "is-invalid" : ""}
                        value={formData.fullName}
                        onChange={handleChange}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && (
                        <span className="contact-form__error" id="fullName-error">{errors.fullName}</span>
                      )}
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        className={errors.email ? "is-invalid" : ""}
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <span className="contact-form__error" id="email-error">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className={errors.phone ? "is-invalid" : ""}
                        value={formData.phone}
                        onChange={handleChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && (
                        <span className="contact-form__error" id="phone-error">{errors.phone}</span>
                      )}
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="company">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="service">Service Required *</label>
                    <select
                      id="service"
                      name="service"
                      className={errors.service ? "is-invalid" : ""}
                      value={formData.service}
                      onChange={handleChange}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? "service-error" : undefined}
                    >
                      <option value="">Select a service</option>
                      {contactServiceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.service && (
                      <span className="contact-form__error" id="service-error">{errors.service}</span>
                    )}
                  </div>

                  <div className="contact-form__field">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Write your message"
                      className={errors.message ? "is-invalid" : ""}
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <span className="contact-form__error" id="message-error">{errors.message}</span>
                    )}
                  </div>

                  <div className="form-consent">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      className={errors.consent ? "is-invalid" : ""}
                      checked={formData.consent}
                      onChange={handleChange}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                    />
                    <label htmlFor="consent">
                      I agree to be contacted about my enquiry. <span aria-hidden="true">*</span>
                    </label>
                    {errors.consent && (
                      <span className="contact-form__error contact-form__error--block" id="consent-error">
                        {errors.consent}
                      </span>
                    )}
                  </div>

                  <PrimaryButton type="submit" showArrow>
                    {submitting ? "Sending..." : "Submit Enquiry"}
                  </PrimaryButton>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
