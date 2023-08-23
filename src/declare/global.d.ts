import { Alpine as AlpineType, AlpineMagics } from 'alpinejs';
import { AlpineRouter } from '../types';

/* eslint-disable no-var, vars-on-top */
declare global {
  var Alpine: AlpineType & Partial<AlpineMagics<(elem: HTMLElement) => AlpineRouter>>;
}
/* eslint-disable no-var, vars-on-top */
