(function () {
    'use strict';

    angular
        .module('cotaEasy')
        .controller('GerenciarProdutosController', GerenciarProdutosController);

    GerenciarProdutosController.$inject = [
        '$uibModal',
        'Restangular',
        'toastr'
    ];

    function GerenciarProdutosController($uibModal, Restangular, toastr) {
        var vm = this;
        vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));

        vm.getAllProdutosByUsuario = function () {
            var produtos = Restangular.all("produtos/getAllByUsuarioId");
            produtos.post(vm.usuarioLogado).then(function (response) {
                if (response.sucesso) {
                    vm.gridOptions.data = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalProduto = function(entidadeProduto, isEdicao) {
            $uibModal.open({
                ariaLabelledBy: 'Cadastro de produto',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/produto/novo-produto/novo-produto.html',
                controller: 'NovoProdutoController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    entidadeProduto: function() {
                        return entidadeProduto;
                    },
                    isEdicao: function() {
                        return isEdicao;
                    },
                }
            }).result.then(function() {
                vm.getAllProdutosByUsuario();
            });
        }

        vm.excluirProduto = function(idProduto) {
            var produto = Restangular.all("produtos/deleteById");
            produto.post(idProduto).then(function (response) {
                if (response.sucesso) {
                    vm.getAllProdutosByUsuario();
                    toastr.success(response.mensagem);
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalCotacao = function(produto) {
            if (produto.cotado) {
                toastr.error("O produto já está em cotação.");
                return;
            }
            $uibModal.open({
                ariaLabelledBy: 'Iniciar cotação',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/produto/cotacao-produto/cotacao-produto.html',
                controller: 'CotacaoProdutoController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    produto: function() {
                        return produto;
                    }
                }
            });
        }

        vm.gridOptions = {
            data: vm.getAllProdutosByUsuario(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50, 100, 250, 500],
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
})();
