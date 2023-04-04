import '../scss/main.scss'

//import * as bootstrap from 'bootstrap'

import { AppModel } from './model/app-model'
import { AppController } from './controller/app-controller'
import { AppView, DOMGenerator } from './view/app-view'

let model = new AppModel();
let controller = new AppController(model);
let view = new AppView(model);

let dom = new DOMGenerator(view, controller);

dom.initDom();
model.init();

// window.onresize = onWindowSize; 