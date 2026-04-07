import { getPermalink, getBlogPermalink, getAsset } from "./utils/permalinks";

export const headerData = {
  links: [
    {
      text: "Blog",
      href: getBlogPermalink(),
    },
    {
      text: "Talks",
      href: getPermalink("/talks"),
    },
    {
      text: "About",
      href: getPermalink("/about"),
    },
  ],
  actions: [],
  socialLinks: [
    {
      ariaLabel: "LinkedIn",
      icon: "tabler:brand-linkedin",
      href: "https://www.linkedin.com/in/alejandropenalorenzo",
    },
    {
      ariaLabel: "GitHub",
      icon: "tabler:brand-github",
      href: "https://github.com/apenlor",
    },
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: "LinkedIn",
      icon: "tabler:brand-linkedin",
      href: "https://www.linkedin.com/in/alejandropenalorenzo",
    },
    {
      ariaLabel: "GitHub",
      icon: "tabler:brand-github",
      href: "https://github.com/apenlor",
    },
    { ariaLabel: "RSS", icon: "tabler:rss", href: getAsset("/rss.xml") },
  ],
  footNote: `
    <a class="text-blue-600 underline dark:text-muted" href="https://apenlor.github.io">Alejandro Pena Lorenzo</a> · All rights reserved.
  `,
};
