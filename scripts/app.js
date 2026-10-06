import { config } from './config.js';
import { renderPage, bindInteractions } from './blocks.js';

const root = document.querySelector('#rdv-content');
if (root.children.length) bindInteractions(root);
else renderPage(root, config);
