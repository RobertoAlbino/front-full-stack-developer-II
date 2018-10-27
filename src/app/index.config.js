export default function MainConfig(RestangularProvider) {
    //RestangularProvider.setBaseUrl('https://cota-easy-api.herokuapp.com/api/');
    RestangularProvider.setBaseUrl('http://localhost:9090/api/');
    RestangularProvider.setDefaultHeaders({ "Content-Type": 'application/json' });
}
MainConfig.$inject = [ 'RestangularProvider' ];