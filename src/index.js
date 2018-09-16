import module from './app/index.module';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'angular-loading-bar/build/loading-bar.min.js';
import 'angular-loading-bar/build/loading-bar.min.css';
import 'angular-ui-grid/ui-grid.min.css';
import 'angular-ui-grid/ui-grid.min.js';
import './favicon.ico';

angular.bootstrap(document.body, [ module ], { strictDi: true });
