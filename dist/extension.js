(()=>{"use strict";new class{computeUrl(){return chrome.runtime.getURL(path+".js")}link(e){let t=document.createElement("script");t.onload=()=>t.remove(),t.setAttribute("src",src),document.body.append(t)}};const e=new Injector;let t=e.computeUrl("main.js");e.link(t)})();