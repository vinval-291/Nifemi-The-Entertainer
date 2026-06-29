export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  imagePosition?: string;
  desc: string;
  fullDesc: string;
  services: string[];
  results?: string[];
  gallery?: string[];
  videos?: {
    id: number | string;
    title: string;
    type: string;
    embedUrl: string;
    isVertical: boolean;
    thumb?: string;
  }[];
  carousels?: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    images: string[];
  }[];
}

export const PROJECTS: Project[] = [
  { 
    id: '1', 
    slug: 'probina-nigeria',
    title: 'Probina Nigeria Limited', 
    category: 'PR Campaigns', 
    image: 'https://i.postimg.cc/02HvxYyj/probina-1.jpg',
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
      'https://i.postimg.cc/02HvxYyj/probina-1.jpg',
      'https://i.postimg.cc/7YQ4D3ZZ/probina-2.jpg',
      'https://i.postimg.cc/28XYmQSC/probina-3.jpg',
      'https://i.postimg.cc/GhpRZ7dC/probina-5.jpg'
    ],
    videos: [
      {
        id: 1,
        title: 'Probina Nigeria Brand Film',
        type: 'Corporate Showcase',
        embedUrl: 'https://player.vimeo.com/video/1204857332?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: false,
        thumb: 'https://i.postimg.cc/02HvxYyj/probina-1.jpg'
      },
      {
        id: 2,
        title: 'Probina Commercial II',
        type: 'Campaign',
        embedUrl: 'https://player.vimeo.com/video/1204858017?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: true,
        thumb: 'https://i.postimg.cc/7YQ4D3ZZ/probina-2.jpg'
      },
      {
        id: 3,
        title: 'Probina Commercial III',
        type: 'Promotion',
        embedUrl: 'https://player.vimeo.com/video/1204858016?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: true,
        thumb: 'https://i.postimg.cc/28XYmQSC/probina-3.jpg'
      },
      {
        id: 4,
        title: 'Probina Commercial IV',
        type: 'Product Showcase',
        embedUrl: 'https://player.vimeo.com/video/1204858015?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: true,
        thumb: 'https://i.postimg.cc/GhpRZ7dC/probina-5.jpg'
      }
    ]
  },
  { 
    id: '2', 
    slug: 'golden-tulip-commercial',
    title: 'Golden Tulip Commercial', 
    category: 'Branding', 
    image: 'https://i.postimg.cc/yxBmDCfp/golden-tulip.jpg',
    desc: 'High-end brand commercial and video production showcasing luxury hospitality.',
    fullDesc: 'Shine Brite Entertainment produced a premium, visually stunning brand commercial for Golden Tulip, capturing the essence of luxury, professional service, and high-end hospitality. The commercial serves as a centerpiece for their digital marketing and guest acquisition campaigns.',
    services: [
      'Luxury brand commercial production',
      'Video editing and color grading',
      'Art direction & cinematography',
      'Digital marketing campaign strategy'
    ],
    results: [
      'Created a captivating brand film highlighting premium hotel amenities.',
      'Significantly increased social media engagement and room inquiries.',
      'Established a sophisticated visual narrative aligned with luxury expectations.'
    ],
    videos: [
      {
        id: 5,
        title: 'Golden Tulip Brand Commercial',
        type: 'Luxury Hospitality Showcase',
        embedUrl: 'https://player.vimeo.com/video/1204859103?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: true,
        thumb: 'https://i.postimg.cc/yxBmDCfp/golden-tulip.jpg'
      }
    ]
  },
  { 
    id: '3', 
    slug: 'college-of-health-technology',
    title: 'College of Health and Technology', 
    category: 'Events', 
    image: 'https://i.postimg.cc/sfYFqP52/College-of-Heath-and-Science-Technology.jpg',
    desc: 'Promotional video production and brand storytelling for the College of Health and Technology.',
    fullDesc: 'Shine Brite Entertainment produced premium promotional video content for the College of Health and Technology to showcase their state-of-the-art facilities, academic programs, and student life. The project aimed to create a high-impact narrative suited for admissions, public relations, and digital campaigns.',
    services: [
      'Promotional video production',
      'Video editing and color correction',
      'Institutional brand storytelling',
      'Admissions marketing content'
    ],
    results: [
      'Presented the institution\'s academic offerings and modern facilities professionally.',
      'Boosted interest and enrollment inquiries through engaging video segments.',
      'Established a modern visual brand identity for digital communication.'
    ],
    videos: [
      {
        id: 6,
        title: 'College of Health & Science Technology',
        type: 'Educational Showcase',
        embedUrl: 'https://player.vimeo.com/video/1204859102?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: false,
        thumb: 'https://i.postimg.cc/sfYFqP52/College-of-Heath-and-Science-Technology.jpg'
      }
    ]
  },
  { 
    id: '4', 
    slug: 'creator-content-lab',
    title: 'Creator Content Lab', 
    category: 'Media', 
    image: 'https://i.postimg.cc/VkjGftqw/DSC03528.jpg',
    imagePosition: 'center 10%',
    desc: 'Influencer collaborations and entertainment-based storytelling content.',
    fullDesc: 'Through his personal brand, Nifemi creates digital media content designed to engage audiences through storytelling, entertainment, and commentary. As "Nifemi The Entertainer", he brings high energy, exceptional vibes, and viral comedy segments to a global digital audience.',
    services: [
      'Storytelling content',
      'Entertainment videos',
      'Social media content',
      'Influencer collaborations'
    ],
    results: [
      'Engaged audience through unique cultural commentary.',
      'Successfully promoted brands through influencer marketing campaigns.',
      'Built a highly recognizable personal brand identity across platforms.'
    ],
    videos: [
      {
        id: 101,
        title: 'Audacity',
        type: 'Nifemi The Entertainer',
        embedUrl: 'https://www.youtube.com/embed/cdEIy5yrm0A',
        isVertical: true,
        thumb: 'https://img.youtube.com/vi/cdEIy5yrm0A/hqdefault.jpg'
      },
      {
        id: 102,
        title: 'Reminiscing',
        type: 'Nifemi The Entertainer',
        embedUrl: 'https://www.youtube.com/embed/SA_7OI-iKsE',
        isVertical: true,
        thumb: 'https://img.youtube.com/vi/SA_7OI-iKsE/hqdefault.jpg'
      },
      {
        id: 103,
        title: 'Bring BAck our Little Ones',
        type: 'Nifemi The Entertainer',
        embedUrl: 'https://www.youtube.com/embed/eg6rAiIk3pc',
        isVertical: true,
        thumb: 'https://img.youtube.com/vi/eg6rAiIk3pc/hqdefault.jpg'
      },
      {
        id: 104,
        title: 'Energy and Vibes IV',
        type: 'Nifemi The Entertainer',
        embedUrl: 'https://www.youtube.com/embed/KqYaTdudLYM',
        isVertical: true,
        thumb: 'https://img.youtube.com/vi/KqYaTdudLYM/hqdefault.jpg'
      },
      {
        id: 105,
        title: 'TTSNTE Pre-Season introduction S3',
        type: 'Nifemi The Entertainer',
        embedUrl: 'https://www.youtube.com/embed/V4FBD6Ory4E',
        isVertical: false,
        thumb: 'https://img.youtube.com/vi/V4FBD6Ory4E/hqdefault.jpg'
      },
      {
        id: 106,
        title: 'TTSNTE Pre-Season Short Video 1',
        type: 'Nifemi The Entertainer',
        embedUrl: 'https://www.youtube.com/embed/MP73eDwLgZs',
        isVertical: false,
        thumb: 'https://img.youtube.com/vi/MP73eDwLgZs/hqdefault.jpg'
      },
      {
        id: 107,
        title: 'TTSNTE with Mofehintola (TTSNTE S2)',
        type: 'Nifemi The Entertainer',
        embedUrl: 'https://www.youtube.com/embed/0qHfgqCFx1Y',
        isVertical: false,
        thumb: 'https://img.youtube.com/vi/0qHfgqCFx1Y/hqdefault.jpg'
      }
    ]
  },
  { 
    id: '5', 
    slug: 'st-gregory',
    title: 'St Gregory', 
    category: 'Media Production', 
    image: 'https://i.postimg.cc/d3rsyf06/Saint-Gregory-(1-of-10)-jpg.jpg',
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
    ],
    gallery: [
      'https://i.postimg.cc/d3rsyf06/Saint-Gregory-(1-of-10)-jpg.jpg',
      'https://i.postimg.cc/wvSx3z9T/Saint-Gregory-(10-of-10)-jpg.jpg',
      'https://i.postimg.cc/ydw6WK79/Saint-Gregory-(2-of-10)-jpg.jpg',
      'https://i.postimg.cc/tJWqxcgM/Saint-Gregory-(4-of-10)-jpg.jpg',
      'https://i.postimg.cc/j5GqCTRq/Saint-Gregory-(5-of-10)-jpg.jpg',
      'https://i.postimg.cc/4yVf903w/Saint-Gregory-(7-of-10)-jpg.jpg',
      'https://i.postimg.cc/gJfcrpGY/Saint-Gregory-(8-of-10)-jpg.jpg'
    ]
  },
  { 
    id: '6', 
    slug: 'flux-logistix',
    title: 'Flux Logistix', 
    category: 'Strategy', 
    image: 'https://i.postimg.cc/ZYwFsKJb/Flux-self-storage-wall-banner-Flux-Warehouse-wall-design.jpg',
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
    ],
    videos: [
      {
        id: 7,
        title: 'Flux Self Storage',
        type: 'Corporate Showcase',
        embedUrl: 'https://player.vimeo.com/video/1204873351?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: false,
        thumb: 'https://i.postimg.cc/ZYwFsKJb/Flux-self-storage-wall-banner-Flux-Warehouse-wall-design.jpg'
      },
      {
        id: 8,
        title: 'Cold Chain Services',
        type: 'Logistics Motion',
        embedUrl: 'https://player.vimeo.com/video/1204873354?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: false,
        thumb: 'https://i.postimg.cc/BZmc7QJp/WALL-DESIGN-1.png'
      }
    ],
    carousels: [
      {
        id: 'warehouse-leasing',
        title: 'Warehouse Leasing with Flux',
        subtitle: '5 Reasons Why Warehouse Leasing with Flux is Cost-Effective',
        category: 'Cost Optimization',
        images: [
          'https://i.postimg.cc/R01VMWYL/5-Reasons-Why-Warehouse-Leasing-with-Flux-is-Cost-Effective-cover.jpg',
          'https://i.postimg.cc/cCCsMXLB/Artboard-1-copy.jpg',
          'https://i.postimg.cc/rp2wX1f1/Artboard-1-copy-2.jpg',
          'https://i.postimg.cc/3wQx5XtN/Artboard-1-copy-3.jpg',
          'https://i.postimg.cc/GpPhc4fs/Artboard-1-copy-4.jpg',
          'https://i.postimg.cc/sXwjhtsX/Artboard-1-copy-5.jpg',
          'https://i.postimg.cc/VvvYBDkR/Last-Slide.jpg'
        ]
      },
      {
        id: 'air-logistics',
        title: 'Flux Air Logistics',
        subtitle: 'Streamlined global shipping and professional air charter services.',
        category: 'Logistics Campaign',
        images: [
          'https://i.postimg.cc/DzG5mTQ1/Flux-Air-Logistics-Carousel-cover.jpg',
          'https://i.postimg.cc/Sx3Dys9s/Flux-Air-Logistics-Carousel-2.jpg',
          'https://i.postimg.cc/c45cmHFG/Flux-Air-Logistics-Carousel-3.jpg',
          'https://i.postimg.cc/Z52VTRN0/Flux-Air-Logistics-Carousel-4.jpg',
          'https://i.postimg.cc/132J9tF9/Flux-Air-Logistics-Carousel-5.jpg'
        ]
      },
      {
        id: 'vaccine-logistics',
        title: 'Vaccine Cold-Chain Movement',
        subtitle: 'How pharmaceutical brands can move their vaccines safely across Nigeria.',
        category: 'Specialized Shipping',
        images: [
          'https://i.postimg.cc/fb6zjx9Q/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-cover.jpg',
          'https://i.postimg.cc/3wP8Cgv5/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-copy.jpg',
          'https://i.postimg.cc/YSJrf1m5/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-copy-2.jpg',
          'https://i.postimg.cc/N0Ws71Hh/How-Pharmaceuticals-Can-Move-Their-Vaccines-Safely-Across-Nigeria-copy-3.jpg'
        ]
      }
    ]
  },
  { 
    id: '7', 
    slug: 'flux-energy',
    title: 'Flux Energy', 
    category: 'PR Campaigns', 
    image: 'https://i.postimg.cc/ZYwFsKJb/Flux-self-storage-wall-banner-Flux-Warehouse-wall-design.jpg',
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
    ],
    videos: [
      {
        id: 'flux-energy-demo',
        title: 'Flux Energy Corporate Overview (Demo)',
        type: 'Corporate Showcase',
        embedUrl: 'https://player.vimeo.com/video/1204873351?badge=0&autopause=0&player_id=0&app_id=58479',
        isVertical: false,
        thumb: 'https://i.postimg.cc/ZYwFsKJb/Flux-self-storage-wall-banner-Flux-Warehouse-wall-design.jpg'
      }
    ],
    carousels: [
      {
        id: 'customer-service',
        title: 'Happy Customer Service Week',
        subtitle: 'Celebrating our commitment to excellence and seamless delivery.',
        category: 'Celebration',
        images: [
          'https://i.postimg.cc/6pryQb2p/Artboard-1-copy.jpg',
          'https://i.postimg.cc/0yYbNXMz/Artboard-1.jpg',
          'https://i.postimg.cc/Z58CqsBP/Artboard-2.jpg',
          'https://i.postimg.cc/VkqdNZrq/Artboard-2-copy.jpg',
          'https://i.postimg.cc/2SQV59b3/Artboard-2-copy-2.jpg',
          'https://i.postimg.cc/fRcJbqty/Artboard-2-copy-3.jpg',
          'https://i.postimg.cc/T3VpPNLy/Artboard-2-copy-4.jpg',
          'https://i.postimg.cc/y8mkNpgg/Artboard-2-copy-5.jpg',
          'https://i.postimg.cc/x1vcdpJH/Artboard-2-copy-6.jpg',
          'https://i.postimg.cc/wjX7B4yL/Artboard-2-copy-7.jpg'
         ]
       }
     ]
  },
  { 
    id: '8', 
    slug: 'city-105-1fm',
    title: 'City 105.1fm', 
    category: 'Media', 
    image: 'https://i.postimg.cc/ZndZXpbk/city-fm.png',
    desc: 'Content production and social engagement for lifestyle radio broadcasting.',
    fullDesc: 'Collaborating with City 105.1fm, Nifemi worked at the pulse of Lagos radio culture. The focus was on bridging the gap between traditional FM broadcasting and digital social engagement, creating content that lives beyond the airwaves.',
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
