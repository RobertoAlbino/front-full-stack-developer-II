(function () {
  'use strict';

  angular
    .module('cotaEasy')
    .controller('NovoUsuarioController', NovoUsuarioController);

  NovoUsuarioController.$inject = [ 
    'Restangular',
    'toastr' 
  ];

  function NovoUsuarioController(Restangular, toastr) {
    var vm = this;
    vm.usuario = {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      segundaSenha: "",
      perfil: 0
    }

    vm.cadastrarNovoUsuario = function() {
      if (!vm.senhaValida()) {
        toastr.error("As senhas digitadas não são idênticas.");
        return;
      }

      var criarUsuario = Restangular.all("usuarios/criar");
      criarUsuario.post(vm.usuario).then(function(retornoCadastro) {
        retornoCadastro.sucesso ? toastr.success(retornoCadastro.mensagem) : toastr.error(retornoCadastro.mensagem);
      }),
      function(error) {
        toastr.error(error);
      };
    }

    vm.senhaValida = function() {
      return vm.usuario.senha === vm.usuario.segundaSenha ? true : false; 
    }
  }
})();
