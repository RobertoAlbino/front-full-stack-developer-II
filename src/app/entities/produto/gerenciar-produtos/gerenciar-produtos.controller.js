import NovoProdutoController from '../novo-produto/novo-produto.controller';

export default class GerenciarProdutosController {

    constructor($uibModal, Restangular, toastrService) {
        this.$uibModal = $uibModal;
        this.Restangular = Restangular;
        this.toastrService = toastrService;
        this.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
        this.gridOptions = {
            data: this.getAllProdutosByUsuario(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [ 10, 25, 50, 100, 250, 500 ],
            columnDefs: [{                
                name: 'Opções',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                    \<button type="button" ng-click="grid.appScope.vm.abrirModalCotacao(row.entity)" ng-class="!row.entity.cotado ? \'btn btn-xs btn-success\' : \'btn btn-xs btn-info\'">\
                                        <div ng-if="row.entity.cotado">Produto em cotação :)</div>\
                                        <div ng-if="!row.entity.cotado">Abrir cotação</div>\
                                    </button>\
                                    \<button type="button" ng-click="grid.appScope.vm.abrirModalProduto(row.entity, true)" ng-class="\'btn btn-xs btn-warning\'">\
                                        Editar\
                                    </button>\
                                    \<button type="button" ng-click="grid.appScope.vm.excluirProduto(row.entity.id)" \ ng-class="\'btn btn-xs btn-danger\'">\
                                        Remover\
                                    </button>\
                                </div>'
            },
            {
                name: 'Código',
                field: 'id',
                type: 'number'
            },
            {
                name: 'Nome',
                field: 'nome',
                type: 'text'
            }]
        }
    }

    getAllProdutosByUsuario() {
        let toastrService = this.toastrService;
        let produtos = this.Restangular.all("produtos/getAllByUsuarioId");
        produtos.post(this.usuarioLogado).then((response) => {
            if (response.sucesso) {
                this.gridOptions.data = response.objeto;
            } else {
                toastrService.erro(response.mensagem);
            }
        });
    }

    abrirModalProduto(entidadeProduto, isEdicao) {
        this.$uibModal.open({
            ariaLabelledBy: 'Cadastro de produto',
            ariaDescribedBy: 'modal-body',
            template: require('../novo-produto/novo-produto.html'),
            controller: NovoProdutoController,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                entidadeProduto: () => {
                    return this.entidadeProduto;
                },
                isEdicao: () => {
                    return this.isEdicao;
                },
            }
        }).result.then(() => {
            this.getAllProdutosByUsuario();
        });
    }

    excluirProduto(idProduto) {
        let produto = this.Restangular.all("produtos/deleteById");
        produto.post(idProduto).then((response) => {
            if (response.sucesso) {
                this.getAllProdutosByUsuario();
                this.toastrService.sucesso(response.mensagem);
            } else {
                this.toastrService.erro(response.mensagem);
            }
        });
    }

    // vm.abrirModalCotacao = function(produto) {
    //     if (produto.cotado) {
    //         toastr.error("O produto já está em cotação.");
    //         return;
    //     }
    //     $uibModal.open({
    //         ariaLabelledBy: 'Iniciar cotação',
    //         ariaDescribedBy: 'modal-body',
    //         templateUrl: 'app/entities/produto/cotacao-produto/cotacao-produto.html',
    //         controller: 'CotacaoProdutoController',
    //         controllerAs: 'vm',
    //         size: 'md',
    //         resolve: {
    //             produto: function() {
    //                 return produto;
    //             }
    //         }
    //     });
    // }
}
GerenciarProdutosController.$inject = [
    '$uibModal',
    'Restangular',
    'toastrService'
];