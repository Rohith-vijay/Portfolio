export interface NavItem {
  label: string;
  href: string;
  shortcut: string;
}

export const navigationItems: NavItem[] = [
  { label: "Welcome", href: "#welcome", shortcut: "G W" },
  { label: "About", href: "#about", shortcut: "G A" },
  { label: "Skills", href: "#skills", shortcut: "G S" },
  { label: "Projects", href: "#projects", shortcut: "G P" },
  { label: "Experience", href: "#experience", shortcut: "G E" },
  { label: "Contact", href: "#contact", shortcut: "G C" },
];
