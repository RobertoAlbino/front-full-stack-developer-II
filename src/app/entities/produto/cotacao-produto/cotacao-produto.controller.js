(function () {
    'use strict';
  
    angular
      .module('cotaEasy')
      .controller('CotacaoProdutoController', CotacaoProdutoController);
  
    CotacaoProdutoController.$inject = [
      '$uibModal',
      '$uibModalInstance',
      'Restangular',
      'toastr',
      'produto'
    ];
  
    function CotacaoProdutoController($uibModal, $uibModalInstance, Restangular, toastr, produto) {
      var vm = this;
      vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
      vm.dataInicio = new Date();
      vm.dataFinal = new Date();
      vm.cotacaoModel = {
        cotacao: {
            dataInicio: new Date(),
            dataFinal: new Date(),
            quantidade: 1,
            produto: produto,
            usuario: produto.usuario,
        },
        fornecedores: []
      }
      vm.listaFornecedores = [];

      vm.buscarTodosFornecedores = function() {
        var fornecedores = Restangular.all("usuarios/getAllFornecedores");
        fornecedores.post().then(function(response) {
          if (response.sucesso) {
            vm.listaFornecedores = response.objeto;
          } else {
            toastr.error(response.mensagem);
          }
        });
      }

      vm.removerFornecedor = function(item) {
        vm.listaFornecedores.map(function(fornecedor) {
            return fornecedor.email !== item.email;
        });
      }

      vm.atualizarStatusCotadoProduto = function(produto) {
          produto.cotado = true;
          var produtos = Restangular.all("produtos/cadastrarProduto");
          produtos.post(produto).then(function(response) {
          if (!response.sucesso)
            toastr.error(response.mensagem);
        });
      }

      vm.iniciarCotacao = function() {
        vm.cotacaoModel.cotacao.dataInicio = vm.dataInicio.toLocaleString();
        vm.cotacaoModel.cotacao.dataFinal =  vm.dataFinal.toLocaleString();
        vm.cotacaoModel.fornecedores = vm.listaFornecedores;
        var cotacao = Restangular.all("cotacoes/novaCotacao");
        cotacao.post(vm.cotacaoModel).then(function(response) {
          if (response.sucesso) {
            toastr.success("Cotação iniciada para: " + vm.cotacaoModel.cotacao.produto.nome);
            vm.atualizarStatusCotadoProduto(vm.cotacaoModel.cotacao.produto);
            $uibModalInstance.close(true);
          } else {
            toastr.error(response.mensagem);
          }
        });
      }

      vm.buscarTodosFornecedores();
    }
  })();
  