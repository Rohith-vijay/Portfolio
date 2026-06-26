export interface SocialLink {
  name: string;
  url: string;
  icon: "Github" | "Linkedin" | "Mail" | "FileText";
}

export const socials: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Rohith-vijay", // Default fallback or configured name
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/rohith-vijay", // Default fallback
    icon: "Linkedin",
  },
  {
    name: "Email",
    url: "mailto:rohithvijay.cse@gmail.com",
    icon: "Mail",
  },
];
