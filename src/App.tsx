/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Car, 
  FileText, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X,
  Languages,
  ArrowRight,
  Plane,
  CreditCard,
  UserCheck,
  ShieldCheck,
  IdCard,
  Briefcase
} from 'lucide-react';
import { translations, Language } from './translations';

export default function App() {
  const [view, setView] = useState<'travels' | 'services'>('travels');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations.en;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for hero
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);
  const yMid = useTransform(scrollY, [500, 1500], [-100, 100]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className={`min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#E63946] selection:text-white`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-12 h-12 bg-[#E63946] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200 text-2xl font-black italic">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
              MUKKAM <span className="text-[#E63946]">TRAVELS</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setView('travels')}
              className={`text-sm font-medium transition-colors ${view === 'travels' ? 'text-[#E63946]' : 'text-gray-500 hover:text-[#E63946]'}`}
            >
              {t.nav.travels}
            </button>
            <button 
              onClick={() => setView('services')}
              className={`text-sm font-medium transition-colors ${view === 'services' ? 'text-[#E63946]' : 'text-gray-500 hover:text-[#E63946]'}`}
            >
              {t.nav.services}
            </button>
            <a 
              href="tel:9400529455"
              className="px-6 py-2 bg-[#E63946] text-white rounded-full text-sm font-bold shadow-lg shadow-red-100 hover:scale-105 transition-transform"
            >
              Contact Us
            </a>
          </div>

          <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 w-full bg-white z-40 border-b md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              <button 
                onClick={() => { setView('travels'); setIsMenuOpen(false); }}
                className="text-lg font-semibold text-left"
              >
                {t.nav.travels}
              </button>
              <button 
                onClick={() => { setView('services'); setIsMenuOpen(false); }}
                className="text-lg font-semibold text-left"
              >
                {t.nav.services}
              </button>
              <a 
                href="tel:9400529455"
                className="text-lg font-bold text-[#E63946]"
              >
                Call: 9400529455
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {view === 'travels' ? (
            <motion.section 
              key="travels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <div className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFCFB]/90 z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2600" 
                    alt="Travel" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                <div className="relative z-20 text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-4 py-1.5 bg-[#E63946]/10 text-[#E63946] text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                      Est. 2010 • Kerala, India
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                      {t.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-medium mb-10 max-w-2xl mx-auto">
                      {t.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => setView('services')}
                        className="px-8 py-4 bg-[#E63946] text-white rounded-2xl font-bold shadow-xl shadow-red-200 hover:scale-105 transition-transform flex items-center justify-center gap-2"
                      >
                        {t.hero.cta} <ArrowRight size={20} />
                      </button>
                      <a 
                        href="tel:9400529455"
                        className="px-8 py-4 bg-white text-[#1A1A1A] border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone size={20} /> Call Now
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Parallax Mid Section */}
              <div className="h-96 relative overflow-hidden flex items-center justify-center">
                <motion.div 
                  style={{ y: yMid }}
                  className="absolute inset-0 z-0"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1464148906133-220023028e34?auto=format&fit=crop&q=80&w=2600" 
                    alt="Kerala Scenery" 
                    className="w-full h-full object-cover brightness-50"
                  />
                </motion.div>
                <div className="relative z-10 text-center text-white px-6">
                  <h2 className="text-3xl md:text-5xl font-black italic mb-4 max-w-3xl mx-auto">
                    "Travelling – it leaves you speechless, then turns you into a storyteller."
                  </h2>
                </div>
              </div>

              {/* Stats Section */}
              <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-30 pb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Destinations', val: '50+' },
                    { label: 'Happy Clients', val: '10K+' },
                    { label: 'Fleet Vehicles', val: '25+' },
                    { label: 'Years Exp', val: '15+' },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center"
                    >
                      <div className="text-3xl font-black text-[#E63946] mb-1">{stat.val}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Travel Services */}
              <div className="bg-white py-24 px-6 border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-16">
                    <h2 className="text-4xl font-black tracking-tight mb-4">{t.travels.title}</h2>
                    <p className="text-gray-500 max-w-xl text-lg">{t.travels.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.travels.services.map((service, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="group p-8 rounded-3xl border border-gray-100 hover:border-[#E63946] hover:shadow-2xl hover:shadow-red-50/50 transition-all duration-300"
                      >
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#E63946] mb-6 group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                          {i === 0 && <Plane size={28} />}
                          {i === 1 && <MapPin size={28} />}
                          {i === 2 && <ShieldCheck size={28} />}
                          {i === 3 && <UserCheck size={28} />}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                      Why Travel With Mukkam?
                    </h2>
                    <div className="space-y-6">
                      {[
                        { 
                          title: '24/7 Availability', 
                          desc: 'We are always ready to pick you up, any time of day or night.'
                        },
                        { 
                          title: 'Modern Fleet', 
                          desc: 'Well-maintained, air-conditioned vehicles for maximum comfort.'
                        },
                        { 
                          title: 'Expert Drivers', 
                          desc: 'Professional and friendly drivers with deep local knowledge.'
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="mt-1 w-6 h-6 rounded-full bg-[#E63946] flex-shrink-0 flex items-center justify-center text-white">
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{item.title}</h4>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -inset-4 bg-[#E63946]/5 rounded-[40px] -rotate-2" />
                    <img 
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" 
                      alt="Luxury Car" 
                      className="relative rounded-[32px] shadow-2xl object-cover aspect-video w-full"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.section 
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-6 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                  <div>
                    <span className="inline-block px-4 py-1.5 bg-[#1EA896]/10 text-[#1EA896] text-xs font-bold tracking-widest uppercase rounded-full mb-6">
                      Professional Assistance
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                      {t.services.title}
                    </h1>
                  </div>
                  <p className="text-gray-500 max-w-md text-lg">
                    {t.services.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {t.services.list.map((service, i) => (
                    <motion.div 
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#1EA896]/10 group-hover:text-[#1EA896] transition-colors">
                          <GetServiceIcon id={service.id} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-300 uppercase">#{i + 1}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-1 group-hover:text-[#1EA896] transition-colors">
                        {service.title}
                      </h3>
                      
                      <div className="mt-4 pt-4 border-t border-gray-50">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
                          {t.services.docsTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.docs.map((doc, idx) => (
                            <span key={idx} className="flex items-center gap-1.5 text-[10px] bg-gray-50 text-gray-500 px-2.5 py-1.5 rounded-lg border border-gray-100">
                              <CheckCircle2 size={10} className="text-[#1EA896]" />
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-20 px-6 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-6 max-w-xs">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#E63946] rounded-lg flex items-center justify-center text-xl font-black italic">
                M
              </div>
              <span className="text-lg font-bold tracking-tight">
                MUKKAM <span className="text-[#E63946]">TRAVELS</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Providing premium travel and administrative services across Kerala since 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Globe size={18} />
              </a>
              <a href="mailto:mukkamtravels@gmail.com" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-24">
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-[#E63946] uppercase text-xs tracking-widest">{t.footer.contact}</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-400">
                <li className="flex items-center gap-2"><MapPin size={16} /> {t.footer.address}</li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={16} /> 
                  <a href="tel:9400529455">9400529455</a>
                </li>
                <li className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={16} /> 
                  <a href="mailto:mukkamtravels@gmail.com">mukkamtravels@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-bold text-[#E63946] uppercase text-xs tracking-widest">Links</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-400">
                <li><button onClick={() => setView('travels')} className="hover:text-white transition-colors">{t.nav.travels}</button></li>
                <li><button onClick={() => setView('services')} className="hover:text-white transition-colors">{t.nav.services}</button></li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-gray-800 text-center text-xs text-gray-500 font-medium">
          © {new Date().getFullYear()} Mukkam Travels & Online Services. {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}

function GetServiceIcon({ id }: { id: string }) {
  switch (id) {
    case 'income': return <CreditCard size={20} />;
    case 'caste': return <UserCheck size={20} />;
    case 'non-creamy': return <ShieldCheck size={20} />;
    case 'land': return <MapPin size={20} />;
    case 'pension': return <Briefcase size={20} />;
    case 'nativity': return <Globe size={20} />;
    case 'residential': return <MapPin size={20} />;
    case 'marriage': return <ShieldCheck size={20} />;
    case 'death': return <FileText size={20} />;
    case 'voter': return <IdCard size={20} />;
    case 'family': return <UserCheck size={20} />;
    case 'vehicle': return <Car size={20} />;
    case 'pan': return <CreditCard size={20} />;
    case 'passport': return <Plane size={20} />;
    case 'license': return <IdCard size={20} />;
    case 'learners-permit': return <IdCard size={20} />;
    case 'learners-card': return <CreditCard size={20} />;
    case 'vehicle-tax': return <Car size={20} />;
    case 'aadhaar-update': return <UserCheck size={20} />;
    case 'sim': return <Globe size={20} />;
    default: return <FileText size={20} />;
  }
}
