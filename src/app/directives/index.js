import angular from 'angular';
import menuSuperiorUsuarioDirective from './menu-usuario/menu-usuario.directive';
import menuSuperiorFornecedorDirective from './menu-fornecedor/menu-fornecedor.directive';

export default angular.module('directives', [])
    .directive('menuSuperiorUsuario', menuSuperiorUsuarioDirective)
    .directive('menuSuperiorFornecedorDirective', menuSuperiorFornecedorDirective)
    .name;
