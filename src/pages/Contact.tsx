import { motion } from 'motion/react';
import { Send, Phone, MapPin } from 'lucide-react';
import { type ReactNode, type FormEvent, useState } from 'react';
import { contactService } from '../services/contactService';

export default function Contact() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !projectType || !message) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await contactService.submitInquiry({
        fullName,
        email,
        projectType,
        message,
      });
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setProjectType('');
      setMessage('');
    } catch (err: any) {
      console.error('Failed to submit message:', err);
      setError('Failed to send your inquiry. Please try again or email me directly.');
    } finally {
      setLoading(false);
    }
  };

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
              <ContactItem icon={<Phone size={20} />} label="Inquiries" value="+234 810 469 2461" />
              <ContactItem icon={<Send size={20} />} label="Email" value="nifemitheentertainer@gmail.com" />
              <ContactItem icon={<MapPin size={20} />} label="Main Studio" value="Lagos State, Nigeria" />
            </div>
            
            <div className="mt-16 pt-16 border-t border-brand-sand">
               <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Social Connect</h4>
               <div className="flex gap-10 text-sm uppercase tracking-widest font-medium">
                  {['Instagram', 'Twitter', 'LinkedIn'].map(social => {
                    const hrefs: { [key: string]: string } = {
                      Instagram: 'https://www.instagram.com/nifemitheentertainer',
                      Twitter: 'https://x.com/nifeentertainer',
                      LinkedIn: 'https://www.linkedin.com/in/nifemi-the-entertainer-74115a231?utm_source=share_via&utm_content=profile&utm_medium=member_android',
                    };
                    return (
                      <a key={social} href={hrefs[social] || '#'} target="_blank" rel="noreferrer" className="hover:text-brand-brown transition-colors">{social}</a>
                    );
                  })}
               </div>
            </div>
          </div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-brand-beige p-12 rounded-3xl border border-brand-sand shadow-sm"
          >
             {submitted ? (
               <div className="text-center py-12">
                 <div className="w-16 h-16 bg-brand-brown text-white rounded-full flex items-center justify-center mx-auto mb-6">
                   <Send size={24} />
                 </div>
                 <h3 className="text-2xl font-black uppercase mb-4 text-brand-brown">Inquiry Sent!</h3>
                 <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                   Thank you for reaching out, Nifemi will get back to you shortly.
                 </p>
                 <button 
                   onClick={() => setSubmitted(false)}
                   className="px-6 py-3 border border-brand-sand rounded-xl hover:bg-brand-sand/50 transition-colors text-[10px] uppercase font-black tracking-widest"
                 >
                   Send another message
                 </button>
               </div>
             ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                   {error && (
                     <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-200">
                       {error}
                     </div>
                   )}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField 
                        label="Full Name" 
                        placeholder="Jane Doe" 
                        value={fullName}
                        onChange={setFullName}
                      />
                      <FormField 
                        label="Email Address" 
                        placeholder="jane@example.com" 
                        type="email" 
                        value={email}
                        onChange={setEmail}
                      />
                   </div>
                   <FormField 
                     label="Project Type" 
                     placeholder="PR Campaign / Brand Strategy / Creative Direction" 
                     value={projectType}
                     onChange={setProjectType}
                   />
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-brand-brown">Message</label>
                      <textarea 
                        className="w-full bg-white border border-brand-sand rounded-xl p-4 min-h-[150px] outline-none focus:border-black transition-colors"
                        placeholder="Tell me about your amazing project..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                   </div>
                   <button 
                     type="submit" 
                     disabled={loading}
                     className="btn-primary w-full py-6 flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     {loading ? 'Sending...' : 'Send Inquiry'}
                   </button>
                </form>
             )}
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

function FormField({ 
  label, 
  placeholder, 
  type = "text", 
  value, 
  onChange 
}: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  value: string; 
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase tracking-widest font-black text-brand-brown">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="bg-white border border-brand-sand rounded-xl p-4 outline-none focus:border-black transition-colors"
      />
    </div>
  );
}
