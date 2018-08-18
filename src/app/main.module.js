import * as angular from 'angular';

import { default as uiRouter } from '@uirouter/angularjs';
import { loginRoute } from './entities/login/login.route';

export const name = 'app';

angular.module(name, [uiRouter])
  .config(loginRoute);
