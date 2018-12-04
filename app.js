"use strict";

import {User, Product} from './models';
import * as config from './config/config.json';

console.log(config.name);
let user = new User();
let product = new Product();