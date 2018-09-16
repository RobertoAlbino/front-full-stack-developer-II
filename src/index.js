import module from './app/index.module';
import './style.scss';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './favicon.ico';

angular.bootstrap(document.body, [ module ], { strictDi: true });
