(function () {
    'use strict';
  
    angular
      .module('cotaEasy')
      .controller('ListarFornecedoresController', ListarFornecedoresController);
  
    ListarFornecedoresController.$inject = [
      'Restangular',
      'toastr'
    ];
  
    function ListarFornecedoresController(Restangular, toastr) {
      var vm = this;
  
      vm.listarFornecedores = function() {
        var fornecedores = Restangular.all("usuarios/getAllFornecedores");
        fornecedores.post().then(function(response) {
            if (response.sucesso) {
                vm.gridOptions.data = response.objeto;
            } else {
                toastr.error(response.mensagem);
            }
        });
      }

      vm.gridOptions = {
        data: vm.listarFornecedores(),
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
          width: '30%',
          name: 'Nome',
          field: 'nome',
          type: 'number'
        },
        {
          width: '30%',
          name: 'Email',
          field: 'email',
          type: 'text'
        },
        {
            width: '20%',
            name: 'Telefone',
            field: 'telefone',
            type: 'text'
        }]
      }
    }
  })();
  