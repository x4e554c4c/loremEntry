import Injector from '~/injector.js'


let src = Injector.computeUrl('dist/main.js');
Injector.link(src);