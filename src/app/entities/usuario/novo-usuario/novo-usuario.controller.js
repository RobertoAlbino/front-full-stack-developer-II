export default class NovoUsuarioController {
  
  constructor(Restangular, toastrService) {
    this.Restangular = Restangular;
    this.toastrService = toastrService;
    this.usuario = {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      perfil: 0
    }
  }

  cadastrarNovoUsuario() {
    if (!this.senhaValida()) {
      this.toastrService.erro("As senhas digitadas não são idênticas.");
      return;
    }
    let toastrService = this.toastrService;
    let criarUsuario = this.Restangular.all("usuarios");
    criarUsuario.post(this.usuario).then((retornoCadastro) => {
      retornoCadastro.sucesso ? toastrService.sucesso(retornoCadastro.mensagem) : toastrService.erro(retornoCadastro.mensagem);
    }).catch(error => {
      toastrService.erro(error.xhrStatus);
    });
  }

  senhaValida() {
    return this.usuario.senha === this.segundaSenha ? true : false;
  }
}
NovoUsuarioController.$inject = [
  'Restangular',
  'toastrService'
];

