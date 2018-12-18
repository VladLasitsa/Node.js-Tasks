"use strict";

import {User, Product} from './models';
import events from 'events';
import DirWatcher from './dirwatcher/DirWatcher';
import Importer from './importer/Importer';
import * as config from './config/config.json';

console.log(config.name);
let user = new User();
let product = new Product();
const emitter = new events.EventEmitter();
let importer = new Importer(emitter);
let dirWatcher = new DirWatcher(emitter);
dirWatcher.watch("./data", 100);