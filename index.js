"use strict";
import app from './app';
import { port } from './config/config.json';

app.listen(port, () => console.log(`App listening on port ${port}!`));