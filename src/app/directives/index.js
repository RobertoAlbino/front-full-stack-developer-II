import angular from 'angular';
import menuSuperiorUsuarioDirective from './menu-usuario/menu-usuario.directive';

export default angular.module('directives', [])
    .directive('menuSuperiorUsuario', menuSuperiorUsuarioDirective)
    .name;
