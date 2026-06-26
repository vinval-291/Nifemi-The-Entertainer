import { motion } from 'motion/react';

export default function About() {
  const BRANDS = [
    'Probina Nigeria', 'Blings and Swish', 'Shine Brite Entertainment', 'Flux Logistix', 'Flux Energy', 'CITY105.1FM LAGOS', 'SANCTUARY OF LIFE MINISTRIES', 'XL SOUNDS', 'COLLEGE OF HEALTH SCIENCE AND TECHNOLOGY'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="section-container">
        <h1 className="text-5xl md:text-8xl font-black uppercase mb-12 leading-[0.8]">The <span className="text-brand-brown">Visionary.</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
          <div className="lg:col-span-7">
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 space-y-8 font-light leading-relaxed text-base md:text-lg">
               <p className="text-2xl md:text-4xl font-serif italic text-black leading-tight">
                 "Culture isn’t simply something I participate in; it’s something I shape, elevate, and reimagine with intention."
               </p>
               <p>
                 I am Nifemi The Entertainer (NTE) a Public Relations Manager, Creative Director, Media Strategist, Fashion Entrepreneur at Blings and Swish, and the Founder of <span className="text-black font-medium">Shine Brite Entertainment</span>.
               </p>
               <p>
                 My work exists at the convergence of film, photography, content creation, cultural influence, fashion, and strategic brand storytelling — where ideas are transformed into experiences and brands become movements.
               </p>
               <p>
                 Over the years, I have led and executed strategic marketing and communication initiatives across industries, including managing digital marketing campaigns for established industrial brands such as PROBINA NIGERIA LIMITED, delivering work that blends commercial performance with authentic storytelling.
               </p>
               <p>
                 As the Founder of Shine Brite Entertainment, I have built a platform designed to bridge entertainment, media, culture, and brand strategy. Shine Brite Entertainment operates as more than a marketing agency it is a creative ecosystem focused on helping brands, talents, and organizations communicate with influence, scale with intention, and build cultural relevance across Africa and beyond.
               </p>
               <p>
                 Through my podcast, TTSNTE (The Truth Sessions with Nifemi The Entertainer), I create space for meaningful conversations around culture, media, identity, creativity, and the future of African storytelling positioning voices, ideas, and perspectives at the center of global conversations.
               </p>
                <p>
                 Beyond media and marketing, I am also the Founder of Blings and Swish an exclusive, high-profile fashion house created for a generation that values expression, status, identity, and cultural sophistication.
               </p>
                <p>
                 Blings and Swish is envisioned as more than a fashion label; it is being built as a global luxury and lifestyle brand that challenges convention, sets trends, and redefines how African creativity is represented on the world stage. Rooted in exclusivity and elevated design philosophy, the brand seeks to merge contemporary fashion with cultural storytelling to create timeless influence across international markets.
               </p>
                <p>
                 Today, I serve as a bridge between global brands seeking meaningful access to Africa’s vibrant creative economy and local creators ready to expand into international recognition.
               </p>
                <p>
                 Whether through campaigns, fashion, media, storytelling, or creative direction, my mission remains the same:
               </p>
                <p>
                 To build brands with substance.
                 To create culture with purpose.
                 To make African creativity impossible to ignore.
               </p>
               <p>
               <b>Welcome to my world</b>
               </p>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-brand-sand pt-12">
               <div>
                 <h4 className="text-xs uppercase tracking-widest font-black mb-6 text-brand-brown">Core Competencies</h4>
                 <ul className="space-y-4 text-sm uppercase tracking-tight font-medium">
                   <li>Social Media Management</li>
                   <li>Digital Marketing Strategy</li>
                   <li>Influencer Marketing</li>
                   <li>Video Production & Direction</li>
                   <li>Brand Storytelling</li>
                   <li>Podcast Production</li>
                 </ul>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-32">
             <div className="aspect-[4/5] bg-brand-sand rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://i.postimg.cc/sfc0C3DL/Nifemi-The-Entertainer-(1-of-12).jpg" 
                  alt="Portrait" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-brown/10 mix-blend-multiply" />
             </div>
          </div>
        </div>

        {/* Brands Section */}
        <section className="py-24 border-t border-brand-sand">
           <h2 className="text-xs uppercase tracking-[0.5em] font-black text-center mb-16 text-gray-400">Trusted By & Collaborated With</h2>
           <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-12 max-w-5xl mx-auto px-4">
              {BRANDS.map(brand => (
                <span key={brand} className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-black uppercase opacity-20 hover:opacity-100 transition-opacity cursor-default max-w-xs md:max-w-md leading-tight">
                  {brand}
                </span>
              ))}
           </div>
        </section>
      </div>
    </motion.div>
  );
}
