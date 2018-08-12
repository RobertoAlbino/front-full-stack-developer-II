import { name as appName } from './app/main.module';
import './style.scss';
require('bootstrap');
require('./favicon.ico')

angular.bootstrap(document.body, [appName], { strictDi: true });
