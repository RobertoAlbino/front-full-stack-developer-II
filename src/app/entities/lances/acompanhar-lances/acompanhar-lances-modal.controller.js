(function () {
  'use strict';

  angular
    .module('cotaEasy')
    .controller('AcompanharLancesModalController', AcompanharLancesModalController);

  AcompanharLancesModalController.$inject = [
    'Restangular',
    'toastr',
    'cotacao'
  ];

  function AcompanharLancesModalController(Restangular, toastr, cotacao) {
    var vm = this;
    vm.cotacao = cotacao;
    vm.buscarLancesModel = {
      idUsuario: JSON.parse(window.localStorage.getItem('usuarioLogado')),
      idProduto: cotacao.produto.id
    };

    vm.getTodosLanceProduto = function () {
      var lances = Restangular.all("lances/getTodosLanceProduto");
      lances.post(vm.buscarLancesModel).then(function (response) {
        if (response.sucesso) {
          vm.gridOptions.data = response.objeto;
        } else {
          toastr.error(response.mensagem);
        }
      });
    }

    vm.gridOptions = {
      data: vm.getTodosLanceProduto(),
      enableFiltering: true,
      enableColumnMenus: false,
      paginationPageSizes: [10, 25, 50, 100, 250, 500],
      columnDefs: [{
        width: '15%',
        name: 'Código',
        field: 'id',
        type: 'number'
      },
      {
        width: '20%',
        name: 'Lance',
        field: 'lance',
        type: 'number',
        cellFilter: 'currency',
        sort: { direction: 'asc', 
                priority: 0 
        }
      },
      {
        width: '25%',
        name: 'Fornecedor',
        field: 'fornecedor.nome',
        type: 'date'
      },
      {
        width: '25%',
        name: 'Email',
        field: 'fornecedor.email',
        type: 'date'
      },
      {
        width: '20%',
        name: 'Telefone',
        field: 'fornecedor.telefone',
        type: 'date'
      }]
    }
  }
})();
