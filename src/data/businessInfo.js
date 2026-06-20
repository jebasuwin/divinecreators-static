export const businessInfo = {
  name: "DIVINE CREATORS",
  displayName: "DIVINE CREATORS",
  tagline: "Your Trusted Partner for Digital Growth",
  email: "Divinecreators999@gmail.com",
  phoneDisplay: "+91 63021 42813",
  phoneLink: "tel:+916302142813",
  whatsappNumber: "916302142813",
  whatsappMessage:
    "Hello DIVINE CREATORS, I would like to discuss digital marketing services for my business.",
  location: "Sholinganallur, Chennai – 600100, Tamil Nadu, India",
  workingHours: "Monday to Saturday, 9:30 AM to 6:30 PM",
  socialLinks: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
};

export const getWhatsAppLink = () => {
  const message = encodeURIComponent(businessInfo.whatsappMessage);
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${message}`;
};
