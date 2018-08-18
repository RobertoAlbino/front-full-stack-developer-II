import { name } from './app/main.module';
import './style.scss';

require('jquery')
require('bootstrap');
require('./favicon.ico')

angular.bootstrap(document.body, [name], { strictDi: true });
