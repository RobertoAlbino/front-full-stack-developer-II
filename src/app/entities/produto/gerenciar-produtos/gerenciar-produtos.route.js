import GerenciarProdutosController from './gerenciar-produtos.controller';

export const gerenciarProdutosRoute = ($stateProvider) => {
  $stateProvider
    .state('gerenciar-produtos', {
      template: require('./gerenciar-produtos.html'),
      controller: GerenciarProdutosController,
      controllerAs: 'vm',
      url: '/gerenciar-produtos'
    });
};
gerenciarProdutosRoute.$inject = [ '$stateProvider' ];
