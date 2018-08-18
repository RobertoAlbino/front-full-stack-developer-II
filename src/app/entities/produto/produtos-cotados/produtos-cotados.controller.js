(function () {
    'use strict';

    angular
        .module('cotaEasy')
        .controller('ProdutoCotadoController', ProdutoCotadoController);

    ProdutoCotadoController.$inject = [
        '$uibModal',
        '$location',
        'Restangular',
        'toastr'
    ];

    function ProdutoCotadoController($uibModal, $location, Restangular, toastr) {
        var vm = this;
        vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));

        vm.getProdutosCotados = function () {
            var cotacoes = Restangular.all("cotacoes/getCotacoesUsuario");
            cotacoes.post(vm.usuarioLogado).then(function (response) {
                if (response.sucesso) {
                    vm.gridOptions.data = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalLances = function(cotacao) {
            $uibModal.open({
                ariaLabelledBy: 'Acompanhar lances',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/lances/acompanhar-lances/acompanhar-lances-modal.html',
                controller: 'AcompanharLancesModalController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    cotacao: function() {
                        return cotacao;
                    }
                }
            });
        }

        vm.gridOptions = {
            data: vm.getProdutosCotados(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50, 100, 250, 500],
            columnDefs: [{
                name: 'Opções',
                width: '20%',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                \<button type="button" ng-click="grid.appScope.vm.abrirModalLances(row.entity)" ng-class="\'btn btn-xs btn-success\'">\
                                    Ver lances </div>\
                                </button>\
                            </div>'
            },
            {
                width: '10%',
                name: 'Código',
                field: 'id',
                type: 'number'
            },
            {
                width: '25%',
                name: 'Produto',
                field: 'produto.nome',
                type: 'text'
            },
            {
                width: '15%',
                name: 'Data inicial cotação',
                field: 'dataInicio',
                type: 'date'
            },
            {
                width: '15%',
                name: 'Data final cotação',
                field: 'dataFinal',
                type: 'date'
            }]
        }
    }
})();
