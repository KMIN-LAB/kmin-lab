# MIN LAB Website

Bilingual website for the Min Lab in the Department of Microbiology at
Pukyong National University. The site presents the lab's research, members,
publications, news, and contact information in Korean and English.

## Local development

Requires Node.js 22 or newer.

```bash
pnpm install
pnpm run dev
```

## Build

The project supports both its original ChatGPT Sites build and a static export
for GitHub Pages.

```bash
pnpm run build
BUILD_TARGET=github-pages GITHUB_REPOSITORY=owner/repository pnpm run build:pages
```

The GitHub Pages workflow deploys the `out/` directory automatically whenever
the default branch is updated. It accounts for project-site base paths, so the
site works at both `owner.github.io/repository` and a root-level
`owner.github.io` address.

## Content

- Main bilingual content: `app/LabHome.tsx`
- Visual styling: `app/globals.css`
- Photographs and research figures: `public/images/`

The public website contains no API keys or private runtime configuration.
