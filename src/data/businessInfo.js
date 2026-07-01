export const businessInfo = {
  name: "DIVINE CREATORS",
  displayName: "DIVINE CREATORS",
  tagline: "We Turn Ideas Into Content That Builds Brands",
  email: "Divinecreatorsofficial@gmail.com",
  phoneDisplay: "+91 6302142813",
  phoneLink: "tel:+916302142813",
  whatsappNumber: "916302142813",
  whatsappMessage:
    "Hello DIVINE CREATORS, I would like to book a free consultation.",
  location: "Sholinganallur, Chennai - 600100",
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
