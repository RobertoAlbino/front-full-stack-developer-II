export default class CotacaoProdutoController {
  
  constructor($uibModalInstance, Restangular, toastrService, produto) {
    this.$uibModalInstance = $uibModalInstance;
    this.Restangular = Restangular;
    this.toastrService = toastrService;
    this.produto = produto;
    this.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
    this.dataInicio = new Date();
    this.dataFinal = new Date();
    this.cotacaoModel = {
      cotacao: {
        dataInicio: new Date(),
        dataFinal: new Date(),
        quantidade: 1,
        produto: produto,
        usuario: produto.usuario,
      },
      fornecedores: []
    }
    this.listaFornecedores = [];
  }

  buscarTodosFornecedores() {
    let toastrService = this.toastrService;
    let fornecedores = Restangular.all("usuarios/getAllFornecedores");
    fornecedores.post().then((response) => {
      if (response.sucesso) {
        this.listaFornecedores = response.objeto;
      } else {
        toastrService.erro(response.mensagem);
      }
    });
  }

  removerFornecedor(item) {
    this.listaFornecedores.map(function(fornecedor) {
        return fornecedor.email !== item.email;
    });
  }
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
CotacaoProdutoController.$inject = [
  '$uibModalInstance',
  'Restangular',
  'toastrService',
  'produto'
];
  