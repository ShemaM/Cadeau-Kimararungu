// src/constants/index.ts

export const SITE_INFO = {
  name: 'Cadeau Héritier Consulting', // [cite: 186]
  tagline: 'Forced Migration Research, Policy & Community Engagement.', // [cite: 187]
  email: 'Cadeauheritier01@gmail.com', // [cite: 189]
  phone: '+254 (0) 720-086-133',     // [cite: 189]
  address: 'Nairobi, Kenya • Great Lakes Region', // [cite: 188]
  role: 'Policy & Research Advisor', // [cite: 32]
};

export const NAV_LINKS = [
  { href: '/about', key: 'about', label: 'About' }, // 
  { href: '/services', key: 'services', label: 'Services' }, //  Matches folder '/services'
  { href: '/publications', key: 'publications', label: 'Publications' }, //  Matches folder '/publications'
  { href: '/contact', key: 'contact', label: 'Contact' }, // [cite: 246]
];

export const FOOTER_LINKS = [
  {
    title: 'Focus Areas',
    links: [
      'Migration Governance', // [cite: 7]
      'Community Engagement', // [cite: 6]
      'Refugee Protection',   // [cite: 8]
      'Digital Refugee Economies', // [cite: 74]
    ],
  },
  {
    title: 'Fieldwork Hubs',
    links: [
      'Nairobi (Urban)', // [cite: 8]
      'Kakuma Refugee Camp', // [cite: 15]
      'Eastern DRC', // [cite: 92]
      'Great Lakes Region', // [cite: 3]
    ],
  },
];