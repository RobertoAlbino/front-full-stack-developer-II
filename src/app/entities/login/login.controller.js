export default class LoginController {

  constructor() {}

   logar() {
    if (!vm.loginValido()) {
      toastr.error("Nem todas as informações de login estão corretas.");
      return;
    }

    var logar = Restangular.all("login/logar");
    logar.post(vm.login).then(function (retornoLogin) {
      if (retornoLogin.sucesso) {
        vm.armazenarLocalmenteUsuarioLogado(retornoLogin);
        retornoLogin.objeto.perfil === "USUARIO" ? $location.path('menu-usuario') : $location.path('menu-fornecedor');
      } else {
        toastr.error(retornoLogin.mensagem);
      }
    });
  }

  loginValido() {
    return vm.login.email || vm.login.senha ? true : false;
  }

  armazenarLocalmenteUsuarioLogado(retornoLogin) {
    window.localStorage.setItem('usuarioLogado', JSON.stringify(retornoLogin.objeto.id));
  }
}

LoginController.$inject = [
  '$uibModal',
  '$location',
  'Restangular',
  'toastr'
];