MAPEAMENTO DS vs LP - Section Serviços

DS (node_modules/@maxebina/max-ds/dist/index.es.js):
- ServiceCard: border gradient (from-tech/30 via-primary/30 to-tech/30)
- Card inner: bg-white dark:bg-bg-dark/90, backdrop-blur-sm, shadow-lg
- Badge: absolute, bg-tech/20, text-tech, border border-tech/30
- Icon: w-14 h-14, bg-gradient-to-br from-tech/20 to-primary/20
- Title: text-xl font-display
- CTA default: "Saiba mais"

LP (src/App.tsx:103-115):
- Section: py-24 bg-bg-dark ✅ (corrigido)
- ServiceCard importado corretamente ✅
- Props: title, description, icon, badge, ctaText, href ✅
- Diferências corrigidas neste turno:
  1. Fonte: adicionada Space Grotesk (heading/display) e Inter (body) via Google Fonts
  2. Variáveis CSS: --heading = Space Grotesk, --sans = Inter
  3. Não há diferença de componente; apenas renderização visual por fonte/style não carregado

Status: alinhado. Se ainda houver diferença visual, pode ser:
- Modo dark/light do browser (dark:bg-bg-dark/90 no DS espera dark mode)
- ParticlesBackground ou outro elemento de fundo
