(function () {
    'use strict';
  
    angular
      .module('cotaEasy')
      .controller('NovoProdutoController', NovoProdutoController);
  
    NovoProdutoController.$inject = [
      '$uibModal',
      '$uibModalInstance',
      '$location',
      'Restangular',
      'toastr',
      'isEdicao',
      'entidadeProduto'
    ];
  
    function NovoProdutoController($uibModal, $uibModalInstance, $location, Restangular, toastr, isEdicao, entidadeProduto) {
      var vm = this;
      vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
      vm.operacao = !isEdicao ? "Cadastrar" : "Editar";
      vm.isEdicao = isEdicao;
      vm.produto = {
        id: entidadeProduto ? entidadeProduto.id : 0,
        nome: entidadeProduto ? entidadeProduto.nome : "",
        cotado: entidadeProduto ? entidadeProduto.cotado : false,
        usuario: entidadeProduto ? entidadeProduto.usuario : { id: vm.usuarioLogado }
      }

      vm.cadastrarProduto = function(produto) {
        var produto = Restangular.all("produtos/cadastrarProduto");
        produto.post(vm.produto).then(function(response) {
          if (response.sucesso) {
            toastr.success(vm.isEdicao ? "Produto atualizado com sucesso." : "Produto cadastrado com suceso.");
            $uibModalInstance.close(true);
          } else {
            toastr.error(response.mensagem);
          }
        });
      }
    }
  })();
  