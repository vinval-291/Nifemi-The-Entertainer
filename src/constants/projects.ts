export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  fullDesc: string;
  services: string[];
  results?: string[];
  gallery?: string[];
}

export const PROJECTS: Project[] = [
  { 
    id: '1', 
    slug: 'probina-nigeria',
    title: 'Probina Nigeria Limited', 
    category: 'PR Campaigns', 
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2670&auto=format&fit=crop',
    desc: 'Digital Marketing & Social Media Management for plumbing and tiling materials supply.',
    fullDesc: 'Shine Brite Entertainment worked with Probina Nigeria Limited to build and strengthen their digital presence across social media platforms. The focus of the project was to increase brand awareness and promote their plumbing and tiling materials to contractors, builders, and home owners.',
    services: [
      'Social media management',
      'Product marketing campaigns',
      'Brand awareness campaigns',
      'Promotional video production',
      'Instagram and social media content creation'
    ],
    results: [
      'Positioned Probina as a trusted supplier within the industry.',
      'Increased engagement with major building contractors.',
      'Successfully launched 3 new product lines via social media campaign.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  { 
    id: '2', 
    slug: 'the-city-pod',
    title: 'The City Pod', 
    category: 'Media', 
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2574&auto=format&fit=crop',
    desc: 'Podcast production focusing on Lagos culture, entrepreneurship, and Nigerian stories.',
    fullDesc: 'The City Pod is a podcast platform that focuses on conversations around Lagos culture, entrepreneurship, and global Nigerian stories. Hosted and produced by Nifemi, it highlights modern business culture and media trends.',
    services: [
      'Podcast Hosting',
      'Production Management',
      'Content Strategy',
      'Social Media Distribution'
    ],
    results: [
      'Built a consistent listener base of high-value creative professionals.',
      'Featured top-tier guests from the Nigerian tech and art scenes.',
      'Secured sponsorship for the second season.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=2670&auto=format&fit=crop'
    ]
  },
  { 
    id: '3', 
    slug: 'sme-digital-growth',
    title: 'SME Digital Growth', 
    category: 'Branding', 
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2674&auto=format&fit=crop',
    desc: 'Social media marketing strategy and online advertising for local small businesses.',
    fullDesc: 'Shine Brite Entertainment has worked with various small businesses to improve their digital presence and brand visibility through content creation and marketing strategies.',
    services: [
      'Social media marketing strategy',
      'Online advertising campaigns',
      'Brand awareness content',
      'Promotional video production'
    ],
    results: [
      'Improved brand credibility for emerging local entrepreneurs.',
      'Increased customer reach via targeted digital ads.',
      'Developed scalable content templates for clients.'
    ]
  },
  { 
    id: '4', 
    slug: 'business-promo-series',
    title: 'Business Promo Series', 
    category: 'Events', 
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2670&auto=format&fit=crop',
    desc: 'Promotional video production and brand storytelling for entrepreneurs.',
    fullDesc: 'Shine Brite Entertainment produced promotional video content for businesses looking to showcase their products and services online. The goal was to create visually engaging content suitable for Instagram, Facebook, and YouTube.',
    services: [
      'Promotional video production',
      'Video editing',
      'Brand storytelling content',
      'Social media marketing videos'
    ],
    results: [
      'Helped businesses present their services professionally.',
      'Increased conversion rates for video-based social ads.',
      'Streamlined video production workflow for rapid deployment.'
    ]
  },
  { 
    id: '5', 
    slug: 'creator-content-lab',
    title: 'Creator Content Lab', 
    category: 'Media', 
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2670&auto=format&fit=crop',
    desc: 'Influencer collaborations and entertainment-based storytelling content.',
    fullDesc: 'Through his personal brand, Nifemi creates digital media content designed to engage audiences through storytelling, entertainment, and commentary.',
    services: [
      'Storytelling content',
      'Entertainment videos',
      'Social media content',
      'Influencer collaborations'
    ],
    results: [
      'Engaged audience through unique cultural commentary.',
      'Successfully promoted brands through influencer marketing campaigns.',
      'Built a recognizable personal brand identity.'
    ]
  },
  { 
    id: '6', 
    slug: 'sanctuary-of-life',
    title: 'Sanctuary of Life Ministries', 
    category: 'Media Production', 
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop',
    desc: 'Live media distribution and production strategy for religious broadcasting.',
    fullDesc: 'Revitalizing the media approach for Sanctuary of Life Ministries, Nifemi developed a comprehensive strategy for live event coverage and digital content distribution, ensuring their message reached a global audience with production-grade quality.',
    services: [
      'Live Stream Strategy',
      'Media Production',
      'Digital Broadcast Management',
      'Audience Engagement'
    ],
    results: [
      'Standardized live broadcast quality across all platforms.',
      'Increased global digital reach by 40% over 6 months.',
      'Established a sustainable internal media production workflow.'
    ]
  },
  { 
    id: '7', 
    slug: 'flux-logistix',
    title: 'Flux Logistix', 
    category: 'Strategy', 
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop',
    desc: 'Brand storytelling and content strategy for supply chain logistics.',
    fullDesc: 'Partnering with Flux Logistix, the focus was to humanize the complex world of logistics. Through strategic storytelling and content development, we showcased the human effort behind every successful delivery, building trust with corporate clients.',
    services: [
      'Brand Storytelling',
      'Content Strategy',
      'Corporate Communications',
      'B2B Marketing'
    ],
    results: [
      'Developed a unique brand voice in a traditional industry.',
      'Created a library of high-impact corporate storytelling assets.',
      'Improved digital client acquisition through narrative-driven LinkedIn content.'
    ]
  },
  { 
    id: '8', 
    slug: 'flux-energy',
    title: 'Flux Energy', 
    category: 'PR Campaigns', 
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop',
    desc: 'Corporate media relations and strategic communications for the energy sector.',
    fullDesc: 'Managing media relations for Flux Energy, Nifemi navigated the intersection of corporate interests and public perception. The goal was to establish Flux Energy as a forward-thinking leader in the regional energy space through strategic press placements and narrative control.',
    services: [
      'Corporate Media Relations',
      'Press Release Distribution',
      'Reputation Management',
      'Strategic Communications'
    ],
    results: [
      'Secured placements in top-tier industry publications.',
      'Successfully managed public communication during major infrastructure transitions.',
      'Enhanced regional brand authority through targeted PR initiatives.'
    ]
  },
  { 
    id: '9', 
    slug: 'city-105-1fm',
    title: 'City 105.1fm', 
    category: 'Media', 
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop',
    desc: 'Content production and social engagement for lifestyle radio broadcasting.',
    fullDesc: 'Collaborating with City 105.1fm, Nifemi worked at the pulse of Lagos radio culture. The focus was on bridge the gap between traditional FM broadcasting and digital social engagement, creating content that lives beyond the airwaves.',
    services: [
      'Content Production',
      'Social Media Engagement',
      'Digital Strategy',
      'Cross-Platform Storytelling'
    ],
    results: [
      'Increased social media follower interaction rates by 25%.',
      'Produced award-nominated digital segments for radio shows.',
      'Pioneered integrated FM-to-Digital listener participation models.'
    ]
  }
];
