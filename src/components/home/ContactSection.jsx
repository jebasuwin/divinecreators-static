import { useState } from "react";
import { businessInfo } from "../../data/businessInfo";
import { contactServiceOptions } from "../../data/services";
import { validateContactForm, submitContactForm } from "../../utils/contactForm";
import SocialLinks from "../common/SocialLinks";

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
};

const ContactSection = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <section id="contact" className="contact-section" aria-labelledby="contact-page-heading">
      <div className="contact-section__inner">
        <header className="contact-section__intro reveal reveal-up">
          <span className="contact-section__eyebrow eyebrow">Contact Us</span>
          <h2 id="contact-page-heading" className="contact-section__title">
            Let&apos;s Build Something That Grows Your Business
          </h2>
          <p className="contact-section__subtitle">
            Tell us about your requirements and our team will contact you with the right solution.
          </p>
          <div className="contact-section__divider" aria-hidden="true" />
        </header>

        <div className="contact-grid">
          <aside className="contact-info-card reveal reveal-up">
            <span className="contact-info-card__label">Contact Details</span>
            <h3 className="contact-info-card__title">Start a Conversation With Our Team.</h3>
            <p className="contact-info-card__text">
              Whether you need better search visibility, more qualified leads, a stronger social presence or YouTube growth support, we are here to help.
            </p>

            <div className="contact-detail-list">
              {contactItems.map((item) => (
                <div className="contact-detail-row" key={item.label}>
                  <div className="contact-detail-icon" aria-hidden="true">
                    <i className={`bi ${item.icon}`} />
                  </div>
                  <div>
                    <span className="contact-detail-label">{item.label}</span>
                    <div className="contact-detail-value">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>

            <SocialLinks className="contact-social" />
          </aside>

          <div className="contact-form-card reveal reveal-up">
            {submitted ? (
              <div className="contact-form-success" role="status">
                <i className="bi bi-check-circle-fill" aria-hidden="true" />
                <h3>Thank you</h3>
                <p>Your enquiry has been recorded in this preview.</p>
              </div>
            ) : (
              <>
                <header className="contact-form-card__header">
                  <span className="contact-form-card__label">Send Us an Enquiry</span>
                  <h3 className="contact-form-card__title">We&apos;re here to help.</h3>
                  <p className="contact-form-card__desc">
                    Share your requirements and our team will contact you.
                  </p>
                </header>

                {errors.form && (
                  <div className="contact-form__alert" role="alert">{errors.form}</div>
                )}

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-grid">
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

                    <div className="contact-form__field form-field--full">
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

                    <div className="contact-form__field form-field--full">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Tell us about your project..."
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

                    <div className="form-field--full contact-form-actions">
                      <button
                        type="submit"
                        className="contact-submit-button"
                        disabled={submitting}
                      >
                        {submitting ? "Sending..." : "Submit Enquiry"}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
