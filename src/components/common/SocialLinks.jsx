import { businessInfo } from "../../data/businessInfo";
import { getAvailableSocialIcons } from "../../utils/socialLinks";

const defaultIcons = [
  { key: "instagram", icon: "bi-instagram", label: "Instagram" },
  { key: "facebook", icon: "bi-facebook", label: "Facebook" },
  { key: "linkedin", icon: "bi-linkedin", label: "LinkedIn" },
  { key: "youtube", icon: "bi-youtube", label: "YouTube" },
  { key: "x", icon: "bi-twitter-x", label: "X" },
];

const SocialLinks = ({ className = "social-row", icons = defaultIcons }) => {
  const available = getAvailableSocialIcons(businessInfo.socialLinks, icons);

  if (available.length === 0) return null;

  return (
    <div className={className}>
      {available.map(({ key, icon, label }) => (
        <a
          key={key}
          href={businessInfo.socialLinks[key]}
          aria-label={`Follow DIVINECREATORS on ${label}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`bi ${icon}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
