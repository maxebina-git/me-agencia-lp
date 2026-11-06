import { useEffect } from "react";

export const SEO_SITE = "https://maxebina.com.br";

export const SEO_DEFAULT = {
  title: "Max Ebina | Marketing Digital, Sites e Automação que Escalam seu Negócio",
  description:
    "Agência Max Ebina: sites institucionais, landing pages, SaaS, CRM, tráfego pago e automação de WhatsApp. Tecnologia que gera resultado para o seu negócio.",
};

export interface SectionSeo {
  title: string;
  description: string;
}

export const SECTION_SEO: Record<string, SectionSeo> = {
  servicos: {
    title: "Serviços de Marketing Digital — Sites, SaaS e Automação | Max Ebina",
    description:
      "Sites institucionais, landing pages de alta conversão, SaaS, CRM, tráfego pago e automação de WhatsApp. Soluções que geram resultado para o seu negócio.",
  },
  "prova-social": {
    title: "Resultados — 150+ Projetos e +40% em Leads | Max Ebina",
    description:
      "150+ projetos entregues, +40% de aumento em leads e 98% de satisfação. Veja os números que comprovam a tecnologia da Max Ebina.",
  },
  faq: {
    title: "Perguntas Frequentes — Sites, Tráfego Pago e Automação | Max Ebina",
    description:
      "Quanto tempo leva para criar um site? Como funciona o tráfego pago? A automação de WhatsApp substitui atendentes? Tire suas dúvidas.",
  },
  contato: {
    title: "Fale com a Max Ebina — Solicite uma Proposta | Max Ebina",
    description:
      "Pronto para escalar seu negócio? Fale com a Max Ebina no WhatsApp ou pelo formulário e receba uma proposta personalizada.",
  },
};

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function applySeo(seo: SectionSeo | null, pathId: string | null) {
  const next = seo ?? SEO_DEFAULT;
  const canonicalPath = pathId ? `/${pathId}` : "/";
  document.title = next.title;
  setMeta("description", next.description);
  setCanonical(`${SEO_SITE}${canonicalPath}`);
  document.documentElement.lang = "pt-BR";
}

/**
 * Totulo por secao (progressivo).
 *
 * Limitacao importante: uma LP de pagina unica tem UM <title> para o
 * crawler no fetch inicial (definido no index.html). Atualizar o titulo
 * conforme a secao visivel ajuda a experiencia/aba do navegador e pode
 * ser lido pelo Google na renderizacao, mas crawlers sociais (WhatsApp,
 * Facebook, LinkedIn) NAO executam JS — eles sempre veem o titulo/OG
 * estatico do index.html.
 *
 * Se o objetivo for ranquear separadamente para "sites", "automacao",
 * "trafego pago" etc., o correto e criar paginas/rotas separadas
 * (ex.: /servicos/sites, /automacao) ou pre-renderizar cada rota com
 * <title>/OG proprios. Este hook e um paliativo, nao um substituto.
 */
export function useSectionSeo() {
  useEffect(() => {
    const ids = Object.keys(SECTION_SEO);
    const observed = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    let activeId: string | null = null;

    const applyForId = (id: string | null) => {
      if (id === activeId) return;
      activeId = id;
      applySeo(id ? SECTION_SEO[id] : null, id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          applyForId(visible.target.id);
        } else if (window.scrollY < window.innerHeight * 0.5) {
          applyForId(null);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );

    observed.forEach((el) => observer.observe(el));

    const onPopState = () => {
      const id = window.location.pathname.replace(/^\//, "").split("/")[0];
      applyForId(id && SECTION_SEO[id] ? id : null);
    };
    window.addEventListener("popstate", onPopState);
    onPopState();

    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", onPopState);
      applySeo(null, null);
    };
  }, []);
}
