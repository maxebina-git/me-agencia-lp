# me-agencia-lp

Landing page da agência — [maxebina.com.br](https://maxebina.com.br).

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- [`@maxebina/max-ds`](https://www.npmjs.com/package/@maxebina/max-ds) — design system público no npm

## Requisitos

- Node 22 (LTS)
- npm

## Comandos

| Comando           | Descrição                                          |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Servidor local com HMR                             |
| `npm run build`   | Type-check (`tsc -b`) + build de produção em `dist/` |
| `npm run lint`    | Oxlint                                             |
| `npm run preview` | Preview local do build de produção                 |

## Design system

A LP consome `@maxebina/max-ds` via npm. O `vite.config.ts` aponta um alias de `@maxebina/max-ds` para o bundle ESM do pacote (`node_modules/@maxebina/max-ds/dist/index.es.js`).

Dependências são resolvidas com `npm ci` a partir do `package-lock.json`.

## CI/CD

Push na branch `main` dispara o workflow em `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. Deploy FTPS de `./dist/` para `/maxebina.com.br/www/` (FTP-Deploy-Action)

Os secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` e `FTP_PORT` ficam em Settings → Secrets and variables → Actions e nunca entram no código.

## Atualização do design system

O Dependabot está configurado (`.github/dependabot.yml`) para abrir PRs diários quando sai uma versão nova de `@maxebina/max-ds`. O deploy só acontece após o merge do PR na `main`.
