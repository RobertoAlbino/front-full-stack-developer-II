import * as angular from 'angular';
import restangular from 'restangular';
import { default as uiRouter } from '@uirouter/angularjs';
import { default as uiBootstrap } from 'angular-ui-bootstrap';

// Configurações globais da aplicação
import MainConfig from './index.config';

import toastrService from './services/toastr.service';

// Rotas da aplicação
import { loginRoute }  from './entities/login/login.route';
import { menuUsuarioRoute } from './entities/usuario/menu-usuario/menu-usuario.route';

export default angular.module('app', [ 
      restangular, 
      uiBootstrap, 
      uiRouter   
])
.service('toastrService', toastrService)
.config(MainConfig)
.config(loginRoute)
.config(menuUsuarioRoute)
.name;
