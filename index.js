/**
 * @format
 */

import appreg from './appRegistryController';
import App from './App';
import {name as appName} from './app.json';

appreg.registerComponent(appName, () => App);
