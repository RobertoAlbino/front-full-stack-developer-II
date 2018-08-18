(function () {
    'use strict';

    angular
        .module('cotaEasy')
        .controller('GerenciarLancesController', GerenciarLancesController);

    GerenciarLancesController.$inject = [
        '$uibModal',
        'Restangular',
        'toastr'
    ];

    function GerenciarLancesController($uibModal, Restangular, toastr) {
        var vm = this;
        vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));

        vm.getCotacoesDisponiveis = function () {
            var cotacoes = Restangular.all("cotacoes/getCotacoesDisponiveisFornecedor");
            cotacoes.post(vm.usuarioLogado).then(function (response) {
                if (response.sucesso) {
                    vm.gridOptions.data = response.objeto;
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }

        vm.abrirModalLance = function(cotacao) {
            $uibModal.open({
                ariaLabelledBy: 'Gerar lance',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/entities/fornecedor/gerar-lance/gerar-lance.html',
                controller: 'GerarLanceController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    cotacao: function() {
                        return cotacao;
                    }
                }
            });
        }

        vm.gridOptions = {
            data: vm.getCotacoesDisponiveis(),
            enableFiltering: true,
            enableColumnMenus: false,
            paginationPageSizes: [10, 25, 50, 100, 250, 500],
            columnDefs: [{                
                name: 'Opções',
                width: '20%',
                enableFiltering: false,
                cellTemplate: '<div ng-class="\'ui-grid-cell-contents text-center\'">\
                                    \<button type="button" ng-click="grid.appScope.vm.abrirModalLance(row.entity)" ng-class="\'btn btn-xs btn-primary\'">\
                                        Enviar lance</div>\
                                    </button>\
                                </div>'
            },
            {
                width: '10%',
                name:  'Código',
                field: 'id',
                type:  'number'
            },
            {
                width: '25%',
                name:  'Produto',
                field: 'produto.nome',
                type:  'text'
            },
            {
                width: '25%',
                name:  'Comprador',
                field: 'usuario.nome',
                type:  'text'
            },
            {
                width: '15%',
                name:  'Quantidade desejada',
                field: 'quantidade',
                type:  'number'
            },
            {
                width: '15%',
                name:  'Data inicial cotação',
                field: 'dataInicio',
                type:  'date'
            },
            {
                width: '15%',
                name:  'Data final cotação',
                field: 'dataFinal',
                type:  'date'
            }]
        }
    }
})();
