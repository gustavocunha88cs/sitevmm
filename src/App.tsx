/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getAgencyInfo } from './services/agencyService';
import { 
  ArrowRight, 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Award, 
  Globe,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// Mock data based on typical agency profiles if scraping fails or for immediate render
const DEFAULT_INFO = {
  name: "VMM Agência",
  slogan: "Transformamos sua presença digital em resultados reais.",
  description: "Especialistas em tráfego pago, social media e branding para empresas que buscam escala.",
  stats: [
    { label: "Leads Gerados", value: "50k+", icon: TrendingUp },
    { label: "Anos de Experiência", value: "8+", icon: Award },
    { label: "Clientes Atendidos", value: "200+", icon: Users },
    { label: "ROI Médio", value: "4.5x", icon: Globe }
  ],
  services: [
    { title: "Tráfego Pago", desc: "Gestão estratégica de anúncios no Google e Meta Ads." },
    { title: "Social Media", desc: "Conteúdo que engaja e constrói autoridade para sua marca." },
    { title: "Branding", desc: "Identidade visual e posicionamento de mercado único." },
    { title: "Web Design", desc: "Landing pages otimizadas para conversão." }
  ],
  pricing: [
    { name: "Essencial", price: "Sob consulta", features: ["Gestão de 1 Canal", "Relatórios Mensais", "Suporte via WhatsApp"] },
    { name: "Business", price: "Sob consulta", features: ["Gestão de 3 Canais", "Copywriting Profissional", "Reunião Quinzenal", "Dashboard em Tempo Real"], popular: true },
    { name: "Enterprise", price: "Sob consulta", features: ["Estratégia Full Funnel", "Gestão de CRM", "Suporte Prioritário 24/7", "Consultoria de Vendas"] }
  ],
  testimonials: [
    { name: "Ricardo Silva", role: "CEO, TechFlow", text: "A VMM mudou o patamar do nosso faturamento em apenas 3 meses." },
    { name: "Ana Oliveira", role: "Marketing Manager, BioLife", text: "Profissionalismo e entrega de resultados que nunca vimos em outras agências." },
    { name: "Marcos Souza", role: "Fundador, E-commerce Pro", text: "O suporte deles é impecável. Sentimos que são parte do nosso time." }
  ]
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [agencyInfo, setAgencyInfo] = useState(DEFAULT_INFO);

  useEffect(() => {
    async function fetchData() {
      try {
        const info = await getAgencyInfo();
        if (info && Object.keys(info).length > 0) {
          // Merge fetched info with defaults to ensure icons and structure remain
          setAgencyInfo(prev => ({
            ...prev,
            ...info,
            stats: info.stats ? info.stats.map((s: any, i: number) => ({ ...s, icon: prev.stats[i]?.icon || Globe })) : prev.stats
          }));
        }
      } catch (e) {
        console.error("Scraping failed, using defaults", e);
      }
    }
    fetchData();
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % agencyInfo.testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + agencyInfo.testimonials.length) % agencyInfo.testimonials.length);
  };

  return (
    <div className="min-h-screen bg-forest text-sand selection:bg-sage selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-forest/80 backdrop-blur-md border-b border-sand/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-display font-bold tracking-tighter">
            VMM<span className="text-sage">.</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            <a href="#servicos" className="hover:text-sage transition-colors">Serviços</a>
            <a href="#sobre" className="hover:text-sage transition-colors">Sobre</a>
            <a href="#precos" className="hover:text-sage transition-colors">Preços</a>
            <a href="#contato" className="px-4 py-2 bg-sand text-forest rounded-full hover:bg-white transition-all">Contato</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-forest pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8 text-2xl font-display">
              <a href="#servicos" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href="#precos" onClick={() => setIsMenuOpen(false)}>Preços</a>
              <a href="#contato" onClick={() => setIsMenuOpen(false)} className="text-sage">Contato</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-extrabold leading-[0.9] tracking-tighter mb-8 uppercase">
                {agencyInfo.slogan.split(' ').slice(0, 2).join(' ')} <br />
                <span className="text-sage italic">{agencyInfo.slogan.split(' ').slice(2, 3).join(' ')}</span> <br />
                {agencyInfo.slogan.split(' ').slice(3).join(' ')}
              </h1>
              <p className="text-lg md:text-xl text-sand/70 max-w-md mb-10 leading-relaxed">
                {agencyInfo.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-sage text-white rounded-full font-bold flex items-center gap-2 hover:bg-sage/80 transition-all group">
                  Começar Agora <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-sand/20 rounded-full font-bold hover:bg-sand/5 transition-all">
                  Nossos Cases
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-sand/10">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                  alt="VMM Agência Team" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-sand text-forest p-6 rounded-2xl shadow-2xl hidden md:block">
                <div className="text-4xl font-display font-bold">{agencyInfo.stats[0].value}</div>
                <div className="text-xs uppercase tracking-widest font-bold opacity-70">{agencyInfo.stats[0].label}</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Stats */}
        <section id="sobre" className="py-20 px-6 bg-sand/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {agencyInfo.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-3xl border border-sand/10 flex flex-col justify-between min-h-[200px] ${
                    idx === 0 || idx === 3 ? 'md:col-span-2 bg-sage/10' : 'bg-forest'
                  }`}
                >
                  <stat.icon className="text-sage w-8 h-8 mb-4" />
                  <div>
                    <div className="text-4xl font-display font-bold mb-1">{stat.value}</div>
                    <div className="text-sm uppercase tracking-widest text-sand/50">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="servicos" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase">NOSSAS <span className="text-sage italic">SOLUÇÕES</span></h2>
                <p className="text-sand/60 text-lg">Abordagem 360º para garantir que cada ponto de contato do seu cliente seja uma oportunidade de conversão.</p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-sand/10 mx-12 mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agencyInfo.services.map((service, idx) => (
                <div key={idx} className="group p-8 rounded-3xl border border-sand/10 hover:border-sage/50 transition-all duration-500 hover:bg-sand/5">
                  <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center mb-6 group-hover:bg-sage group-hover:text-white transition-all">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-sand/50 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="precos" className="py-20 px-6 bg-sand/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase">INVESTIMENTO</h2>
              <p className="text-sand/60 max-w-2xl mx-auto">Planos flexíveis desenhados para o momento atual do seu negócio.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {agencyInfo.pricing.map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-10 rounded-[2.5rem] border ${
                    plan.popular ? 'border-sage bg-sage/5' : 'border-sand/10 bg-forest'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sage text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full">
                      Mais Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-display font-bold mb-8">{plan.price}</div>
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-sand/70">
                        <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-4 rounded-full font-bold transition-all ${
                    plan.popular ? 'bg-sage text-white hover:bg-sage/80' : 'border border-sand/20 hover:bg-sand/5'
                  }`}>
                    Selecionar Plano
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase">O QUE <br /><span className="text-sage italic">DIZEM</span> SOBRE NÓS</h2>
                <div className="flex gap-4">
                  <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-sand/20 flex items-center justify-center hover:bg-sand/5 transition-all">
                    <ChevronLeft />
                  </button>
                  <button onClick={nextTestimonial} className="w-12 h-12 rounded-full border border-sand/20 flex items-center justify-center hover:bg-sand/5 transition-all">
                    <ChevronRight />
                  </button>
                </div>
              </div>

              <div className="relative h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 p-10 bg-sand/5 rounded-[2rem] border border-sand/10 flex flex-col justify-between"
                  >
                    <MessageSquare className="text-sage w-10 h-10 mb-6" />
                    <p className="text-xl md:text-2xl font-medium italic text-sand/90">"{agencyInfo.testimonials[activeTestimonial].text}"</p>
                    <div className="mt-8">
                      <div className="font-bold text-lg">{agencyInfo.testimonials[activeTestimonial].name}</div>
                      <div className="text-sm text-sage uppercase tracking-widest font-bold">{agencyInfo.testimonials[activeTestimonial].role}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contato" className="py-20 px-6">
          <div className="max-w-7xl mx-auto bg-sage rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full"></div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 border border-white rounded-full"></div>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 relative z-10 uppercase">PRONTO PARA <br /> ESCALAR?</h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">Agende uma consultoria gratuita e descubra como podemos transformar seus resultados digitais.</p>
            <button className="px-12 py-6 bg-white text-sage rounded-full font-bold text-xl hover:bg-sand transition-all relative z-10 shadow-xl">
              Falar com Especialista
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-sand/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="text-3xl font-display font-bold tracking-tighter mb-6">
                VMM<span className="text-sage">.</span>
              </div>
              <p className="text-sand/50 max-w-sm leading-relaxed">
                Agência de performance focada em resultados reais e crescimento sustentável para marcas ambiciosas.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-sage">Links</h4>
              <ul className="space-y-4 text-sm text-sand/60">
                <li><a href="#servicos" className="hover:text-sand transition-colors">Serviços</a></li>
                <li><a href="#sobre" className="hover:text-sand transition-colors">Sobre</a></li>
                <li><a href="#precos" className="hover:text-sand transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-sand transition-colors">Cases</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-sage">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-sand/10 flex items-center justify-center hover:bg-sage hover:border-sage transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-sand/10 flex items-center justify-center hover:bg-sage hover:border-sage transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-sand/5 text-[10px] uppercase tracking-[0.2em] text-sand/30 font-bold">
            <div>© 2026 VMM Agência. Todos os direitos reservados.</div>
            <div className="mt-4 md:mt-0 flex gap-8">
              <a href="#" className="hover:text-sand">Privacidade</a>
              <a href="#" className="hover:text-sand">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
