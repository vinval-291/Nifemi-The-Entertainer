import { motion } from 'motion/react';

export default function About() {
  const BRANDS = [
    'Probina Nigeria', 'The City Pod', 'Lagos Fashion Week', 
    'Sony Music', 'Warner Music', 'Nike', 'Vogue'
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
                 "Culture isn't just something I consume; it's something I curate with intention."
               </p>
               <p>
                 I am Nifemi The Entertainer (NTE), a Public Relations Manager, Creative Director, and the founder of <span className="text-black font-medium">Shine Brite Entertainment</span>. My work exists at the intersection of fashion, music, and strategic storytelling.
               </p>
               <p>
                 Starting my journey as a host and producer, I realized early on that brands didn't just need visibility—they needed a soul. I've dedicated my career to ensuring that every campaign I lead feels like a cultural movement rather than just a broadcast.
               </p>
               <p>
                 From managing digital marketing for industrial giants like <span className="text-black font-medium">Probina Nigeria Limited</span> to hosting critical cultural conversations on <span className="text-black font-medium">The City Pod</span>, my approach is always hands-on and high-standard.
               </p>
               <p>
                 Today, I act as a bridge for global brands looking to tap into the vibrant energy of the African creative landscape, and for local talents aiming for global recognition.
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
               <div>
                  <h4 className="text-xs uppercase tracking-widest font-black mb-6 text-brand-brown">Recognition</h4>
                 <ul className="space-y-4 text-sm uppercase tracking-tight font-medium">
                   <li>Creative Entrepreneur of the Year</li>
                   <li>Top 50 List: Creative Minds</li>
                   <li>Feature: Guardian Life</li>
                   <li>Feature: Pulse Nigeria</li>
                 </ul>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-32">
             <div className="aspect-[4/5] bg-brand-sand rounded-3xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop" 
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
           <div className="flex flex-wrap justify-center gap-x-20 gap-y-12">
              {BRANDS.map(brand => (
                <span key={brand} className="text-4xl md:text-5xl font-display font-black uppercase opacity-20 hover:opacity-100 transition-opacity cursor-default">
                  {brand}
                </span>
              ))}
           </div>
        </section>
      </div>
    </motion.div>
  );
}
