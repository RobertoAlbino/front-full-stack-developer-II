import * as angular from 'angular';
import restangular from 'restangular';
import { default as uiRouter } from '@uirouter/angularjs';
import { default as uiBootstrap } from 'angular-ui-bootstrap';

// Configurações globais da aplicação
import MainConfig from './index.config';

// Serviços da aplicação
import toastrService from './services/toastr.service';

// Rotas da aplicação
import { loginRoute }  from './entities/login/login.route';
import { menuUsuarioRoute } from './entities/usuario/menu-usuario/menu-usuario.route';

// Diretivas
import directives from './directives/index';

export default angular.module('app', [
      directives, 
      restangular, 
      uiBootstrap, 
      uiRouter
])
.service('toastrService', toastrService)
.config(MainConfig)
.config(loginRoute)
.config(menuUsuarioRoute)
.name;
