import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css';

export default class ToastrService {

    sucesso(mensagem) {
        toastr.success(mensagem);
    }

    erro(mensagem) {
        toastr.error(mensagem);
    }
  
    atencao(mensagem) {
        toastr.warning(mensagem);
    }
  }
  ToastrService.$inject = [];