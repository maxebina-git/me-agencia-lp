import { useState, useEffect } from "react";
import { Navbar, HeroSection, SectionHeader, ServiceCard,
TestimonialCard, AnimatedCounter, FAQ, Footer, WhatsAppFloat } from
"./components/ds-components";
import ContactForm from "./components/ContactForm";
import { Layout, TrendingUp, Star, Clock } from "lucide-react";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Prova Social", href: "#prova-social" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export default function App() {
  const [modalService, setModalService] = useState<string | null>(null);

  useEffect(() => {
    const handleLogoClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1) ?? "";
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;
      e.preventDefault();
      if (target) {
        if (window.location.pathname !== `/${id}`) window.history.pushState(null, "", `/${id}`);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (window.location.pathname !== "/") window.history.pushState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", handleLogoClick);
    return () => document.removeEventListener("click", handleLogoClick);
  }, []);

  return (
    <>
      <Navbar
        logo="MAX"
        links={links}
        ctaText="Fale conosco"
        ctaHref="#contato"
      />

      <HeroSection
        headline={<>Transforme Sua Empresa com <span className="gradient-text-tech">Tecnologia</span></>}
        headlineText="Transforme Sua Empresa com Tecnologia"
        subheadline="Sites, LPs e CRM que geram resultados reais. Escalabilidade com inteligência digital para o seu negócio crescer."
        ctaPrimary="Quero Escalar Meu Negócio"
        ctaSecondary="Ver Cases"
        ctaPrimaryHref="#contato"
        ctaSecondaryHref="#cases"
      />

      <section id="servicos" className="py-24 px-6 bg-bg-dark">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Nossos Serviços"
            title="Soluções que Geram Resultado"
            subtitle="Cada serviço é pensado para acelerar o crescimento do seu negócio com tecnologia de ponta."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard title="Sites Institucionais" description="Presença digital profissional que converte visitantes em clientes." badge="Popular" icon="Globe" ctaText="Saiba mais" href="#sites" />
            <ServiceCard title="Landing Pages" description="Páginas de alta conversão para campanhas de tráfego pago." icon="Layout" badge="+40% leads" ctaText="Saiba mais" href="#landing-pages" />
            <ServiceCard title="SaaS" description="Plataformas web sob medida para escalar seu modelo de negócio." icon="Code2" ctaText="Saiba mais" href="#saas" />
            <ServiceCard title="CRM" description="Gestão inteligente de clientes e automação de vendas." icon="Bot" ctaText="Saiba mais" href="#crm" />
            <ServiceCard title="Tráfego Pago" description="Investimento estratégico em mídia com ROI mensurável." icon="Megaphone" ctaText="Saiba mais" href="#trafego" />
            <ServiceCard title="Automa��o WhatsApp" description="Fluxos automatizados que vendem 24h por dia." icon="Workflow" badge="Novo" ctaText="Saiba mais" href="#automacao" />
          </div>
        </div>
      </section>

      <section id="prova-social" className="py-24 px-6 bg-bg-dark-secondary">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="Prova Social" title="Números que Falam" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatedCounter end={150} suffix="+" label="Projetos Entregues" icon={<Layout className="w-6 h-6" />} />
            <AnimatedCounter end={40} suffix="%" label="Aumento em Leads" icon={<TrendingUp className="w-6 h-6" />} />
            <AnimatedCounter end={98} suffix="%" label="Satisfação" icon={<Star className="w-6 h-6" />} />
            <AnimatedCounter end={10} suffix="+" label="Anos de Mercado" icon={<Clock className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      <section id="depoimentos" className="py-24 px-6 bg-bg-dark">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Depoimentos" title="O que Nossos Clientes Dizem" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard name="Carlos Mendes" company="TechStart" role="CEO" rating={5} testimonial="A Max Ebina transformou completamente nossa presença digital. Em 3 meses, triplicamos os leads qualificados." />
            <TestimonialCard name="Ana Silva" company="ModaFit" role="Diretora" rating={5} testimonial="A automação de WhatsApp economiza 4 horas por dia da minha equipe. Resultado incrível!" />
            <TestimonialCard name="Roberto Lima" company="Construmax" role="Gerente" rating={4} testimonial="O CRM que desenvolveram é intuitivo e poderoso. Nossa taxa de conversão subiu 60%." />
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 px-6 bg-bg-dark">
        <div className="max-w-2xl mx-auto">
          <SectionHeader eyebrow="Dúvidas Frequentes" title="Perguntas e Respostas" />
          <FAQ items={[
            { question: 'Quanto tempo leva para criar um site?', answer: 'Dependendo da complexidade, um site institucional fica pronto em 2-4 semanas. Landing pages em 1-2 semanas.' },
            { question: 'Vocês fazem manutenção após a entrega?', answer: 'Sim! Oferecemos planos de manutenção mensal que incluem atualizações de segurança, backups e suporte prioritário.' },
            { question: 'Como funciona o tráfego pago?', answer: 'Criamos campanhas estratégicas no Google Ads e Meta Ads, com foco em ROI. Você acompanha tudo em relatórios semanais.' },
            { question: 'A automação de WhatsApp substitui atendentes?', answer: 'Não substitui - potencializa! A automação cuida do primeiro contato e qualificação, liberando sua equipe para fechar vendas.' },
            { question: 'Preciso ter conhecimento técnico?', answer: 'Absolutamente não! Nós cuidamos de toda a parte técnica. Você foca no seu negócio enquanto nós transformamos sua presença digital.' },
          ]} />
        </div>
      </section>

      <section id="contato" className="py-24 px-6 bg-gradient-to-br from-bg-dark via-bg-dark-secondary to-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-lg mx-auto relative z-10">
          <ContactForm />
        </div>
      </section>

      <Footer
        logo="MAX"
        links={[
          {
            title: "Serviços",
            items: [
              { label: "Sites Institucionais", href: "#sites" },
              { label: "Landing Pages", href: "#landing-pages" },
              { label: "SaaS", href: "#saas" },
              { label: "CRM", href: "#crm" },
              { label: "Tráfego Pago", href: "#trafego" },
              { label: "Automação WhatsApp", href: "#automacao" },
            ],
          },
          {
            title: "Empresa",
            items: [
              { label: "Sobre Nós", href: "#sobre" },
              { label: "Cases", href: "#cases" },
              { label: "Blog", href: "#blog" },
              { label: "Contato", href: "#contato" },
            ],
          },
          {
            title: "Legal",
            items: [
              { label: "Privacidade", href: "#privacidade" },
              { label: "Termos de Uso", href: "#termos" },
              { label: "Cookies", href: "#cookies" },
            ],
          },
        ]}
        social={[]}
        copyright="© 2026 Max Ebina. Todos os direitos reservados."
      />

      <WhatsAppFloat />

      {modalService && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setModalService(null)}>
          <div className="bg-white dark:bg-bg-dark rounded-2xl p-8 max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-display font-bold mb-2">{modalService}</h3>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">Detalhes do serviço selecionado.</p>
            <button onClick={() => setModalService(null)} className="px-4 py-2 rounded-xl bg-tech text-white font-semibold">Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}
