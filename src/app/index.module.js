import * as angular from 'angular';
import restangular from 'restangular';
import  { default as uiRouter } from '@uirouter/angularjs';
import  { default as uiBootstrap } from 'angular-ui-bootstrap';

// Configurações globais da aplicação
import MainConfig from './index.config';

// Rotas da aplicação
import { loginRoute } from './entities/login/login.route';

// Módulo principal
export const name = 'app';

var module = angular.module(name, [ restangular, uiBootstrap, uiRouter]);

module.config(MainConfig)
      .config(loginRoute);
