import module from './app/index.module';
import './style.scss';
import 'bootstrap';
import './favicon.ico';

angular.bootstrap(document.body, [ module ], { strictDi: true });
