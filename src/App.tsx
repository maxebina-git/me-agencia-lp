import { useState, useEffect } from "react";
import { Navbar, HeroSection, SectionHeader, ServiceCard,
TestimonialCard, AnimatedCounter, FAQ, Footer, WhatsAppFloat, ScrollToTop, Modal, Drawer } from
"./components/ds-components";
import ContactForm from "./components/ContactForm";
import { useSectionSeo } from "./seo";
import { Layout, TrendingUp, Star, Clock } from "lucide-react";

const heroLogo = (
  <svg width="60" height="29" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424" />
    <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424" />
  </svg>
);

const SHOW_TESTIMONIALS = false;

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Prova Social", href: "#prova-social" },
  ...(SHOW_TESTIMONIALS ? [{ label: "Depoimentos", href: "#depoimentos" }] : []),
  { label: "FAQ", href: "#faq" },
];

const WHATSAPP_PHONE = "5511971610688";
const WHATSAPP_MESSAGE_DEFAULT = "Olá! Vim pelo site";

export type ServiceId = "sites" | "landing-pages" | "saas" | "crm" | "trafego" | "automacao";

interface ServiceInfo {
  id: ServiceId;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  details: string[];
}

const services: ServiceInfo[] = [
  {
    id: "sites",
    title: "Sites Institucionais",
    description: "Sua empresa merece mais do que um perfil nas redes sociais. Conquiste sua casa digital própria, transmita autoridade e venda 24 horas por dia.",
    icon: "Globe",
    badge: "Popular",
    details: ["Imagine ter um vendedor de elite que apresenta sua empresa com perfeição, a qualquer hora do dia ou da noite, sem cansar e sem pedir férias. É exatamente isso que um site profissional faz pelo seu negócio. Desenvolvemos um design moderno que se adapta perfeitamente a qualquer tela, carregando na velocidade da luz para garantir que o Google te encontre e que nenhum cliente desista de esperar. Mais do que bonito, seu site terá caminhos estratégicos e formulários que transformam curiosos em contatos reais prontos para negociar. E a melhor parte? Você não precisa se preocupar com a parte técnica: hospedagem, domínio e suporte completo já estão inclusos. É só focar em atender bem enquanto nós cuidamos da sua presença digital."],
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "Pare de queimar verba em anúncios. Transforme cada clique em um lead qualificado ou em uma venda direta e previsível.",
    icon: "Layout",
    badge: "+40% leads",
    details: ["Imagine direcionar seus anúncios para uma página que realmente vende, em vez de apenas 'mostrar' sua marca. Uma Landing Page é o motor de conversão que transforma cada clique em um lead qualificado. Criamos textos persuasivos que tocam na dor do seu cliente e o levam à ação imediata, com carregamento instantâneo para que você não perca ninguém na espera. Além disso, aplicamos rastreamento preciso e testes constantes para garantir que cada real investido tenha o máximo de retorno. Tudo se integra ao seu CRM, permitindo que você saiba exatamente a origem de cada cliente e escale seu negócio com total previsibilidade."],
  },
  {
    id: "saas",
    title: "SaaS",
    description: "Chega de depender de sistemas engessados. Tenha uma plataforma sob medida que cresce junto com o seu negócio, sem limites.",
    icon: "Code2",
    details: ["Imagine ter um sistema que funciona exatamente como sua empresa pensa, em vez de obrigá-la a se adaptar a ferramentas genéricas. Uma plataforma sob medida é o motor que elimina processos manuais, automatiza cobranças e permite que você escale sem travar. Desenvolvemos com arquitetura sólida para suportar milhares de usuários sem perder performance, com painel administrativo intuitivo que coloca o controle total nas suas mãos. Esqueça a dor de cabeça com planilhas e integrações quebradas: tudo é pensado para simplificar sua operação. E o melhor: você não está preso a um produto estático. Evoluímos junto com você, adicionando funcionalidades conforme seu negócio cresce e novas demandas surgem."],
  },
  {
    id: "crm",
    title: "CRM",
    description: "Pare de perder vendas por falta de acompanhamento. Centralize seus clientes e transforme o caos comercial em uma máquina de vendas previsível.",
    icon: "Bot",
    details: ["Imagine saber exatamente em que etapa cada cliente está e o que precisa ser feito para fechar a venda. Nosso CRM transforma a bagunça de planilhas e anotações soltas em um funil visual e automatizado, onde nenhum lead é esquecido. Configuramos lembretes e follow-ups inteligentes que trabalham por você, garantindo que sua equipe aja no momento exato da decisão. Além disso, você terá previsões de receita baseadas em dados reais, eliminando os 'achismos' do seu planejamento. Tudo isso integrado diretamente ao seu WhatsApp e e-mail, centralizando a comunicação e multiplicando suas conversões sem precisar contratar mais gente."],
  },
  {
    id: "trafego",
    title: "Tráfego Pago",
    description: "Pare de adivinhar e comece a escalar. Transforme cada real investido em clientes novos, previsíveis e com retorno mensurável.",
    icon: "Megaphone",
    details: ["Imagine ter o controle absoluto sobre o crescimento do seu negócio, sabendo exatamente quanto custa adquirir um novo cliente. Gerenciamos suas campanhas no Google e Meta com foco obsessivo em lucro, eliminando métricas de vaidade que não pagam contas. Utilizamos uma segmentação cirúrgica para garantir que seu anúncio apareça apenas para quem tem real intenção de compra. Você recebe relatórios transparentes que provam o retorno real do investimento, com otimização constante para reduzir custos e mensurar o aumento de leads de forma isolada e clara."],
  },
  {
    id: "automacao",
    title: "Automação WhatsApp",
    description: "Pare de perder vendas por demora no atendimento. Tenha um vendedor incansável que responde, qualifica e fecha pedidos 24 horas por dia.",
    icon: "Workflow",
    badge: "Novo",
    details: ["Imagine acordar com pedidos fechados enquanto você dormia. Nossa automação transforma seu WhatsApp em uma máquina de vendas que responde instantaneamente, qualifica leads automaticamente e entrega ao seu time apenas quem está pronto para comprar. Criamos fluxos personalizados que guiam o cliente do primeiro 'oi' até o pagamento, integrando perfeitamente com seu cardápio online, CRM e sistemas de pagamento. Tudo funciona 24 horas por dia, 7 dias por semana, sem custos adicionais de folha e sem perder a humanização no momento certo. É como ter uma equipe de vendas completa trabalhando no piloto automático, multiplicando seu faturamento sem aumentar sua estrutura."],
  },
];

const whatsappHref = (title: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Olá! Tenho interesse em ${title}`)}`;

export type LegalDocId = "privacidade" | "termos" | "cookies";

interface LegalDoc {
  title: string;
  description: string;
  disclaimer: string;
  sections: { heading: string; body: string }[];
}

const legalDocs: Record<LegalDocId, LegalDoc> = {
  privacidade: {
    title: "Política de Privacidade",
    description: "Como tratamos seus dados pessoais quando você navega neste site ou fala com a gente pelo formulário e pelo WhatsApp.",
    disclaimer: "Texto resumido para fins ilustrativos — versão oficial deve ser validada por advogado.",
    sections: [
      { heading: "Dados que coletamos", body: "Nome, telefone/WhatsApp, e-mail e mensagem que você envia voluntariamente pelo formulário de contato ou pelo botão de WhatsApp. Também registramos dados de navegação essenciais (páginas visitadas, dispositivo) apenas para segurança e melhoria do site." },
      { heading: "Como usamos", body: "Usamos esses dados somente para responder seu contato, enviar propostas, prestar o serviço contratado e cumprir obrigações legais. Não vendemos seus dados para terceiros." },
      { heading: "Seus direitos", body: "Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo WhatsApp ou e-mail da agência. Respondemos em até 15 dias úteis." },
    ],
  },
  termos: {
    title: "Termos de Uso",
    description: "As regras básicas para usar este site e contratar os serviços da Max Ebina.",
    disclaimer: "Texto resumido para fins ilustrativos — versão oficial deve ser validada por advogado.",
    sections: [
      { heading: "O site", body: "O conteúdo (textos, imagens, código e marca) é de propriedade da Max Ebina. Você pode navegar e compartilhar links, mas não copiar ou reutilizar o material sem autorização." },
      { heading: "Serviços", body: "Prazos, valores e escopo de cada projeto são definidos em proposta comercial individual. O uso deste site não substitui o contrato de prestação de serviços." },
      { heading: "Responsabilidades", body: "Fazemos nosso melhor para manter o site no ar e as informações atualizadas, mas não garantimos funcionamento ininterrupto nem nos responsabilizamos por danos decorrentes de uso indevido ou de terceiros." },
    ],
  },
  cookies: {
    title: "Cookies",
    description: "O que são cookies, para que servem e como você pode controlá-los.",
    disclaimer: "Texto resumido para fins ilustrativos — versão oficial deve ser validada por advogado.",
    sections: [
      { heading: "Cookies essenciais", body: "São necessários para o site funcionar (ex.: manter sua navegação entre páginas). Não podem ser desativados aqui." },
      { heading: "Cookies de análise", body: "Ajudam a entender quais páginas são mais visitadas e melhorar o conteúdo. São anônimos e agregados — não identificam você." },
      { heading: "Como gerenciar", body: "Você pode apagar ou bloquear cookies nas configurações do seu navegador. Se bloquear os essenciais, partes do site podem parar de funcionar." },
    ],
  },
};

export default function App() {
  useSectionSeo();
  const [modalService, setModalService] = useState<string | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDocId | null>(null);
  const selectedLegal = legalDoc ? legalDocs[legalDoc] : null;
  const selectedService = modalService ? services.find((s) => s.title === modalService) ?? null : null;
  const modalTitle = selectedService?.title ?? modalService;
  const modalDetails = selectedService?.details ?? ["Solução sob medida para o seu momento.", "Fale com um especialista e receba uma proposta personalizada."];

  const handleFooterLinkClick = (label: string, href: string) => {
    if (href === "#privacidade" || href === "#termos" || href === "#cookies") {
      setLegalDoc(href.slice(1) as LegalDocId);
      return;
    }
    if (href.startsWith('#')) {
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.location.pathname !== `/`) window.history.pushState(null, "", `/${id}`);
        return;
      }
    }
    setModalService(label);
  };

  useEffect(() => {
    const scrollToCurrentPath = (behavior: ScrollBehavior = "smooth") => {
      const path = window.location.pathname;
      const idFromPath = path.replace(/^\//, "").split("/")[0];
      const idFromHash = window.location.hash ? window.location.hash.slice(1) : "";
      const id = idFromPath || idFromHash;
      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
      } else if (!id) {
        window.scrollTo({ top: 0, behavior });
      }
    };

    scrollToCurrentPath("auto");

    const handlePopState = () => scrollToCurrentPath();
    window.addEventListener("popstate", handlePopState);

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
    return () => {
      document.removeEventListener("click", handleLogoClick);
      window.removeEventListener("popstate", handlePopState);
    };
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
        ctaPrimary="Quero Escalar Meu Negócio"
        ctaPrimaryHref="#contato"
        logo={heroLogo}
        logoText="Marketing Digital"
        eyebrow="Tecnologia que gera resultado"
      />

      <section id="servicos" className="scroll-mt-24 py-24 px-6 bg-bg-dark">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Nossos Serviços"
            title="Soluções que Geram Resultado"
            subtitle="Cada serviço é pensado para acelerar o crescimento do seu negócio com tecnologia de ponta."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard title="Sites Institucionais" description="Sua empresa merece mais do que um perfil nas redes sociais. Conquiste sua casa digital própria, transmita autoridade e venda 24 horas por dia." badge="Popular" icon="Globe" ctaText="Saiba mais" href="#contato" onClick={() => setModalService("Sites Institucionais")} />
            <ServiceCard title="Landing Pages" description="Pare de queimar verba em anúncios. Transforme cada clique em um lead qualificado ou em uma venda direta e previsível." badge="+40% leads" icon="Layout" ctaText="Saiba mais" href="#contato" onClick={() => setModalService("Landing Pages")} />
            <ServiceCard title="SaaS" description="Chega de depender de sistemas engessados. Tenha uma plataforma sob medida que cresce junto com o seu negócio, sem limites." icon="Code2" ctaText="Saiba mais" href="#contato" onClick={() => setModalService("SaaS")} />
            <ServiceCard title="CRM" description="Pare de perder vendas por falta de acompanhamento. Centralize seus clientes e transforme o caos comercial em uma máquina de vendas previsível." icon="Bot" ctaText="Saiba mais" href="#contato" onClick={() => setModalService("CRM")} />
            <ServiceCard title="Tráfego Pago" description="Pare de adivinhar e comece a escalar. Transforme cada real investido em clientes novos, previsíveis e com retorno mensurável." icon="Megaphone" ctaText="Saiba mais" href="#contato" onClick={() => setModalService("Tráfego Pago")} />
            <ServiceCard title="Automação WhatsApp" description="Pare de perder vendas por demora no atendimento. Tenha um vendedor incansável que responde, qualifica e fecha pedidos 24 horas por dia." badge="Novo" icon="Workflow" ctaText="Saiba mais" href="#contato" onClick={() => setModalService("Automação WhatsApp")} />
          </div>
        </div>
      </section>

      <section id="prova-social" className="scroll-mt-24 py-24 px-6 bg-bg-dark-secondary">
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

      {SHOW_TESTIMONIALS && (
        <section id="depoimentos" className="scroll-mt-24 py-24 px-6 bg-bg-dark">
          <div className="max-w-6xl mx-auto">
            <SectionHeader eyebrow="Depoimentos" title="O que Nossos Clientes Dizem" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard name="Carlos Mendes" company="TechStart" role="CEO" rating={5} testimonial="A Max Ebina transformou completamente nossa presença digital. Em 3 meses, triplicamos os leads qualificados." />
              <TestimonialCard name="Ana Silva" company="ModaFit" role="Diretora" rating={5} testimonial="A automação de WhatsApp economiza 4 horas por dia da minha equipe. Resultado incrível!" />
              <TestimonialCard name="Roberto Lima" company="Construmax" role="Gerente" rating={4} testimonial="O CRM que desenvolveram é intuitivo e poderoso. Nossa taxa de conversão subiu 60%." />
            </div>
          </div>
        </section>
      )}

      <section id="faq" className="scroll-mt-24 py-24 px-6 bg-bg-dark">
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

      <section id="contato" className="scroll-mt-24 py-24 px-6 bg-gradient-to-br from-bg-dark via-bg-dark-secondary to-bg-dark relative overflow-hidden">
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
        ]}
        linksClassName="lg:col-start-5"
        social={[]}
        copyright="© 2026 Max Ebina. Todos os direitos reservados."
        onLinkClick={handleFooterLinkClick}
      />

      <WhatsAppFloat phone={WHATSAPP_PHONE} message={WHATSAPP_MESSAGE_DEFAULT} />
      <ScrollToTop targetId="servicos" />

      <Modal
        open={!!modalService}
        onClose={() => setModalService(null)}
        title={modalTitle ?? ""}
        size="md"
        actions={[
          { label: "Falar no WhatsApp", href: modalTitle ? whatsappHref(modalTitle) : "#", variant: "primary", target: "_blank" },
          { label: "Fechar", variant: "secondary", onClick: () => setModalService(null) },
        ]}
      >
        <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside">
          {modalDetails.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Modal>

      <Drawer
        open={!!legalDoc}
        onClose={() => setLegalDoc(null)}
        title={selectedLegal?.title ?? ""}
        description={selectedLegal?.description ?? ""}
        disclaimer={selectedLegal?.disclaimer ?? ""}
        width="lg"
        actions={[
          { label: "Fechar", variant: "secondary", onClick: () => setLegalDoc(null) },
        ]}
      >
        {selectedLegal?.sections.map((section) => (
          <div key={section.heading}>
            <h4 className="font-display font-semibold text-white mb-1">{section.heading}</h4>
            <p>{section.body}</p>
          </div>
        ))}
      </Drawer>
    </>
  );
}
