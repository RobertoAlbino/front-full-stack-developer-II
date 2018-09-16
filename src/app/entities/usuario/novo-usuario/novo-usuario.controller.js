export default class NovoUsuarioController {
  
  constructor(Restangular, toastrService) {
    this.Restangular = Restangular;
    this.toastrService = toastrService;
    this.usuario = {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      segundaSenha: "",
      perfil: 0
    }
  }

  cadastrarNovoUsuario() {
    if (!this.senhaValida()) {
      this.toastrService.erro("As senhas digitadas não são idênticas.");
      return;
    }

    let criarUsuario = this.Restangular.all("usuarios/criar");
    criarUsuario.post(vm.usuario).then(function (retornoCadastro) {
      retornoCadastro.sucesso ? this.toastrService.successo(retornoCadastro.mensagem) : this.toastrService.erro(retornoCadastro.mensagem);
    }),
    (error) => {
        this.toastrService.erro(error);
    };
  }

  senhaValida() {
    return this.usuario.senha === this.usuario.segundaSenha ? true : false;
  }
}
NovoUsuarioController.$inject = [
  'Restangular',
  'toastrService',
];

