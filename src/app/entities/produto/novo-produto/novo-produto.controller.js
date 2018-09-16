export default class NovoProdutoController {

  constructor($uibModalInstance, $location, Restangular, toastrService, isEdicao, entidadeProduto) {
    this.$uibModalInstance = $uibModalInstance;
    this.$location = $location;
    this.Restangular = Restangular;
    this.toastrService = toastrService;
    this.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
    this.operacao = !isEdicao ? "Cadastrar" : "Editar";
    this.isEdicao = isEdicao;
    this.produto = {
      id: entidadeProduto ? entidadeProduto.id : 0,
      nome: entidadeProduto ? entidadeProduto.nome : "",
      cotado: entidadeProduto ? entidadeProduto.cotado : false,
      usuario: entidadeProduto ? entidadeProduto.usuario : { id: this.usuarioLogado }
    }  
  }

  cadastrarProduto(produto) {
    let toastrService = this.toastrService;
    let isEdicao = this.isEdicao;
    let produtoCad = this.Restangular.all("produtos/cadastrarProduto");
    produtoCad.post(this.produto).then((response) => {
      if (response.sucesso) {
        toastrService.sucesso(isEdicao ? "Produto atualizado com sucesso." : "Produto cadastrado com suceso.");
        this.$uibModalInstance.close(true);
      } else {
        toastrService.erro(response.mensagem);
      }
    });
  }
}
NovoProdutoController.$inject = [
  '$uibModalInstance',
  '$location',
  'Restangular',
  'toastrService',
  'isEdicao',
  'entidadeProduto'
];  