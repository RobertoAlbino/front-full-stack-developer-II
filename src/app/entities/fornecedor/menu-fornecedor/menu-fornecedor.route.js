import MenuFornecedorController from './menu-fornecedor.controller'

export const menuFornecedorRoute = ($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('menu-fornecedor', {
      template: require('./menu-fornecedor.html'),
      controller: MenuFornecedorController,
      controllerAs: 'vm',
      url: '/menu-fornecedor'
    });
};
menuFornecedorRoute.$inject = ['$stateProvider', '$urlRouterProvider'];
