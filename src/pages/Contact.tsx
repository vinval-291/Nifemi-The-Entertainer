import { motion } from 'motion/react';
import { Send, Phone, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h1 className="text-4xl md:text-7xl font-black uppercase mb-8 leading-none">Global<br />reach, <br /><span className="text-brand-brown italic font-serif lowercase">one-on-one focus.</span></h1>
            <p className="text-lg md:text-xl text-gray-500 mb-12 font-light">
              Ready to take your brand or project to the next level? Fill out the form or reach out directly to me.
            </p>

            <div className="space-y-8">
              <ContactItem icon={<Phone size={20} />} label="Inquiries" value="+234 800 000 0000" />
              <ContactItem icon={<Send size={20} />} label="Email" value="hello@nte-global.com" />
              <ContactItem icon={<MapPin size={20} />} label="Main Studio" value="Victoria Island, Lagos, NG" />
            </div>
            
            <div className="mt-16 pt-16 border-t border-brand-sand">
               <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Social Connect</h4>
               <div className="flex gap-10 text-sm uppercase tracking-widest font-medium">
                  {['Instagram', 'Twitter', 'LinkedIn', 'Behance'].map(social => (
                    <a key={social} href="#" className="hover:text-brand-brown transition-colors">{social}</a>
                  ))}
               </div>
            </div>
          </div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-brand-beige p-12 rounded-3xl border border-brand-sand shadow-sm"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField label="Full Name" placeholder="Jane Doe" />
                  <FormField label="Email Address" placeholder="jane@example.com" type="email" />
               </div>
               <FormField label="Project Type" placeholder="PR Campaign / Brand Strategy / Creative Direction" />
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest font-black text-brand-brown">Message</label>
                  <textarea 
                    className="w-full bg-white border border-brand-sand rounded-xl p-4 min-h-[150px] outline-none focus:border-black transition-colors"
                    placeholder="Tell me about your amazing project..."
                  />
               </div>
               <button type="submit" className="btn-primary w-full py-6">
                 Send Inquiry
               </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full border border-brand-sand flex items-center justify-center text-brand-brown">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-black opacity-50 mb-1">{label}</p>
        <p className="text-lg font-medium tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function FormField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-widest font-black text-brand-brown">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="bg-white border border-brand-sand rounded-xl p-4 outline-none focus:border-black transition-colors"
      />
    </div>
  );
}
