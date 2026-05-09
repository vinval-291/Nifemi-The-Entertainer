export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  content: string;
  createdAt: any;
}

export interface BlogPost {
  id: string | number;
  slug: string;
  date: string;
  category: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  status: 'published' | 'draft';
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'future-of-pr-digital-world',
    date: 'MAY 12 / 2024',
    category: 'Insight',
    title: 'The Future of PR in a Post-Digital World',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop',
    excerpt: 'How the shift from platforms to communities is redefining how we think about brand authority and public sentiment.',
    content: `
      <p>The traditional pillars of public relations—press releases, media relations, and crisis management—are undergoing a seismic shift. In what we call the "post-digital" world, the line between technology and human interaction has blurred to the point of invisibility. Brands are no longer talking to "users" or "customers"; they are engaging with communities.</p>
      
      <h2>From Platforms to People</h2>
      <p>For the last decade, PR strategy was platform-centric. We asked, "How do we win on Instagram?" or "What is our Twitter strategy?" Today, the question has changed to, "How do we add value to this community?" Whether it's a Discord server, a WhatsApp group, or a niche subreddit, authority is now earned through participation, not just presence.</p>
      
      <h2>The Rise of Radical Transparency</h2>
      <p>Information travels faster than light. Attempting to hide a corporate misstep is now a strategy for failure. The new PR mandate is radical transparency. Brands that own their mistakes and document their progress in real-time are the ones that build lasting influence. Influence is no longer about who has the loudest voice, but who has the most trusted one.</p>
      
      <h2>Conclusion</h2>
      <p>The future of PR belongs to the storytellers who understand that data is just the skeleton of a narrative. To truly impact culture, you must breathe life into that data through empathy, community engagement, and a visionary creative direction.</p>
    `,
    readTime: '6 min',
    author: 'Nifemi Ajisefinni',
    status: 'published'
  },
  {
    id: 2,
    slug: 'build-cultural-brand-scratch',
    date: 'APR 28 / 2024',
    category: 'Strategy',
    title: 'How to Build a Cultural Brand from Scratch',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop',
    excerpt: 'Brands are no longer just products; they are symbols of identity. Learn the framework for building a brand that speaks for its audience.',
    content: `
      <p>In a saturated market, functional superiority is rarely enough. To win, a brand must transcend its product category and become a cultural marker. Think about why people wear Nike or drink Starbucks; it's rarely just about the shoe or the coffee—it's about what those brands say about the person consuming them.</p>
      
      <h2>Find the Cultural Tension</h2>
      <p>Every great brand solves a cultural tension. Nike solved the tension between athletic aspiration and everyday laziness. Apple solved the tension between complex technology and human creativity. To build a cultural brand, you must identify a tension your audience feels and position your brand as the resolution to that tension.</p>
      
      <h2>Language and Aesthetic</h2>
      <p>Cultural brands have their own lexicon and visual language. They don't follow trends; they set them by being specific. Your brand aesthetic should feel like a world that people want to inhabit. Consistency across every touchpoint—from your website to your packaging—is what builds the "gravity" of your brand.</p>
      
      <h2>Community over Audience</h2>
      <p>An audience watches; a community participates. Moving from a broadcast model to a conversational model is essential. Empower your early adopters to become ambassadors. Give them the tools to tell your story in their own voices.</p>
    `,
    readTime: '8 min',
    author: 'Nifemi Ajisefinni',
    status: 'published'
  },
  {
    id: 3,
    slug: 'why-minimalist-design-wins',
    date: 'MAR 15 / 2024',
    category: 'Design',
    title: 'Why Minimalist Design Wins Every Time',
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2670&auto=format&fit=crop',
    excerpt: 'The psychological impact of negative space and how it translates to luxury market positioning in the 2020s.',
    content: `
      <p>Minimalism is often misunderstood as simply "less stuff." In reality, effective minimalism is the intentional highlighting of what matters by removing everything that doesn't. In the luxury sector, minimalism is synonymous with confidence. Only a brand that is sure of its value can afford to be quiet.</p>
      
      <h2>The Psychology of Space</h2>
      <p>Negative space isn't empty; it's a breathing room for the viewer's mind. When we see a cluttered design, our brain works overtime to process the noise. When we see a minimalist design, our focus is immediately directed to the hero element. This sense of order and focus creates a psychological feeling of premium quality.</p>
      
      <h2>Timelessness vs. Trend</h2>
      <p>Maximalist designs are often tied to specific eras and can feel dated within years. Minimalist design, by sticking to fundamental principles of balance and typography, tends to age much better. This is why the world's most enduring brands—from Braun to Prada—lean into minimalist principles.</p>
    `,
    readTime: '5 min',
    author: 'Nifemi Ajisefinni',
    status: 'published'
  },
  {
    id: 4,
    slug: 'navigating-new-media-nigeria',
    date: 'FEB 20 / 2024',
    category: 'Media',
    title: 'Navigating the New Media Landscape in Nigeria',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop',
    excerpt: 'A deep dive into the evolving relationship between traditional media houses and independent digital creators.',
    content: `
      <p>The Nigerian media scene is currently one of the most vibrant and complex in the world. We are seeing a complete democratization of information, where a creator with a smartphone can have more influence than a legacy television station. Navigating this requires a new playbook.</p>
      
      <h2>The Creator Economy</h2>
      <p>Individual creators are the new media houses. In Nigeria, personalities drive engagement more than platforms do. For brands, this means moving away from traditional ad placements and towards genuine partnerships with creators who have built authentic trust with their audience.</p>
      
      <h2>Digital-First Journalism</h2>
      <p>News no longer breaks on the 9 PM broadcast; it breaks on X (formerly Twitter) and Instagram. Media organizations that have successfully transitioned are the ones that treat digital not as a secondary outlet, but as the primary battlefield. The focus has shifted from being the first to report, to being the most accurate and engaging in the digital space.</p>
    `,
    readTime: '7 min',
    author: 'Nifemi Ajisefinni',
    status: 'published'
  }
];
