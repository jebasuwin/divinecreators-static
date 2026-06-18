export const isSocialLinkAvailable = (url) =>
  typeof url === "string" && url.trim() !== "" && url.trim() !== "#";

export const getAvailableSocialIcons = (socialLinks, icons) =>
  icons.filter(({ key }) => isSocialLinkAvailable(socialLinks[key]));
