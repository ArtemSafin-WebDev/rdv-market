import { mkdir, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { config } from './config.js';
import { renderPageMarkup, renderHeading, renderHero, renderVideo, renderChess, renderArchitecture, renderStats, renderWorkspace } from './blocks.js';
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const path of ['index.html', 'styles', 'assets', 'scripts/app.js', 'scripts/init.js', 'scripts/config.js', 'scripts/blocks.js', 'scripts/tab-icons.js', 'scripts/site-shell.js']) {
  await cp(path, `dist/${path}`, { recursive: true });
}
const html = await readFile('index.html', 'utf8');
await writeFile('dist/index.html', html.replace('<main id="rdv-content"></main>', `<main id="rdv-content">${renderPageMarkup(config)}</main>`));
await mkdir('dist/blocks', { recursive: true });
for (const [name, markup] of Object.entries({ heading: renderHeading(config), hero: renderHero(config.hero), video: renderVideo(config.video), chess: renderChess(config.chess), architecture: renderArchitecture(config.architecture, config.stats), stats: renderStats(config.stats), workspace: renderWorkspace(config.workspace) })) {
  await writeFile(`dist/blocks/${name}.html`, markup);
}
console.log('Static build ready: dist/');
