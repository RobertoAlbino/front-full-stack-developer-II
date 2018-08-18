(function () {
    'use strict';

    angular
        .module('cotaEasy')
        .controller('GerarLanceController', GerarLanceController);

    GerarLanceController.$inject = [
        '$uibModal',
        '$uibModalInstance',
        '$location',
        'Restangular',
        'toastr',
        'cotacao'
    ];

    function GerarLanceController($uibModal, $uibModalInstance, $location, Restangular, toastr, cotacao) {
        var vm = this;
        vm.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
        vm.cotacao = cotacao;
        vm.lanceModel = {
            lance: 0,
            cotacao: cotacao,
            idFornecedor: vm.usuarioLogado
        };

        vm.gerarLance = function () {
            var lance = Restangular.all("lances/novoLance");
            lance.post(vm.lanceModel).then(function (response) {
                if (response.sucesso) {
                    toastr.success(response.mensagem);
                    $uibModalInstance.close(true);
                } else {
                    toastr.error(response.mensagem);
                }
            });
        }
    }
})();
