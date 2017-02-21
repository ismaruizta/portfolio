angular
	.module("meca", ['ui.router', 'satellizer', 'ngSanitize'])
	.config(configuracion);


function configuracion($stateProvider, $urlRouterProvider, $authProvider) {
	$stateProvider
		.state("/",{
			url: "/",
			templateUrl:"/components/_component/component.html",
			controller: "meca_principal"
		})
		.state("/registro",{
			url: "/registro",
			templateUrl:"/components/registro/component.html",
			controller: "SignUpController"
		})
		.state("/login",{
			url: "/login",
			templateUrl:"/components/login/login.html",
			controller: "LoginController",
			controllerAs: "login"
		})
		.state("/central",{
			url: "/central",
			templateUrl:"/components/central/central.html",
			controller: "centralController"
		})
		.state("/404",{
			url: "/error",
			templateUrl:"/error.html"
		})
		.state("/tour",{
			url: "/tour",
			templateUrl:"/components/tour/tour.html",
			controller: "tourController"
		})
		.state("/usuario",{
			url: "/usuario",
			templateUrl:"/components/usuario/usuario.html",
			controller: "usuarioController"
		})
	
	$urlRouterProvider	
		.otherwise("/tour");

	$authProvider.loginUrl = "http://localhost:3000/auth/login";
    $authProvider.signupUrl = "http://localhost:3000/auth/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "meca";
    //el toquen quedara guardado en localstorage con la clave myApp_token
}