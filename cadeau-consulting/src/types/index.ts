// Shared TypeScript interfaces

export type NavLink = {
  href: string;
  key: string;
  label: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  role: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType; // Optional if you pass icons as props
};

export type Publication = {
  title: string;
  subtitle?: string;
  journal?: string;
  role: string;
  date: string;
  link?: string | null;
  description: string;
};