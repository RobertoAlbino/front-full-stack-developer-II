import MenuUsuarioController from './menu-usuario.controller'

export const menuUsuarioRoute = ($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('menu-usuario', {
      template: require('./menu-usuario.html'),
      controller: MenuUsuarioController,
      controllerAs: 'vm',
      url: '/'
    });
};
menuUsuarioRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
