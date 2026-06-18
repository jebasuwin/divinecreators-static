import { getWhatsAppLink } from "../../data/businessInfo";

const WhatsAppButton = () => (
  <a
    href={getWhatsAppLink()}
    className="whatsapp-float"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
  >
    <i className="bi bi-whatsapp" aria-hidden="true" />
  </a>
);

export default WhatsAppButton;
