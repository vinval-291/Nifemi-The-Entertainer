import { motion } from 'motion/react';
import { Target, MessageCircle, BarChart3, Presentation } from 'lucide-react';

const SERVICES = [
  {
    icon: <Target size={40} strokeWidth={1.5} />,
    title: 'PR & Media Strategy',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop',
    description: 'I develop comprehensive communication frameworks that build trust, manage reputation, and increase brand authority across digital and traditional media.',
    process: ['Landscape Analysis', 'Narrative Development', 'Media Outreach', 'Crisis Management']
  },
  {
    icon: <Presentation size={40} strokeWidth={1.5} />,
    title: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop',
    description: 'Translating your values into visual excellence. I curate the mood, the look, and the feel of campaigns that command attention and drive culture.',
    process: ['Concept Discovery', 'Moodboarding', 'Photography Direction', 'Visual Identity']
  },
  {
    icon: <BarChart3 size={40} strokeWidth={1.5} />,
    title: 'Brand Positioning',
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2670&auto=format&fit=crop',
    description: 'Carving out your unique space in the market. I help you find your voice and resonate with the modern consumer through strategic alignment.',
    process: ['Competitor Research', 'Tone of Voice', 'Value Propositions', 'Market Entry Strategy']
  },
  {
    icon: <MessageCircle size={40} strokeWidth={1.5} />,
    title: 'Social Media Management',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop',
    description: 'From ideation to execution. I manage the end-to-end lifecycle of high-impact content, ensuring every touchpoint delivers on the vision through targeted marketing.',
    process: ['Content Marketing', 'Community Growth', 'Asset Production', 'Influencer Marketing']
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-12">How I <span className="text-brand-brown">elevate</span> brands.</h1>
        <p className="text-lg md:text-2xl font-light text-gray-500 max-w-2xl mb-24">
          Bespoke solutions for creative individuals and global corporations looking to leave a lasting impact through <span className="text-black font-medium">Shine Brite Entertainment</span>.
        </p>

        <div className="space-y-48">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className="text-brand-brown mb-8">{service.icon}</div>
                <h2 className="text-5xl font-black uppercase mb-6 leading-tight">{service.title}</h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
                  {service.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-brand-sand">
                   {service.process.map(step => (
                     <div key={step} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-brand-brown rounded-full" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{step}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl relative z-10">
                   <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                   />
                 </div>
                 <div className="absolute top-10 -right-10 w-full h-full border border-brand-sand rounded-3xl z-0 hidden lg:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
