if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),u={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>u[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/howler-BmL5vSo0.js",revision:null},{url:"assets/index-Bxfu5tAL.css",revision:null},{url:"assets/index-CpxNwAJ4.js",revision:null},{url:"index.html",revision:"9cebdba64337622760b2e66de1b7f6cd"},{url:"registerSW.js",revision:"be28e64050aa2025363b08db35c3f440"},{url:"manifest.webmanifest",revision:"03866dc74f438ffdbcfd5c53c0caf17a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));