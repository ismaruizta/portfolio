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
angular
	.module("meca")
    .controller("LogoutController", LogoutController);



//CONTROLADOR LOGOUT
function LogoutController($auth, $location) {  
    $auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            $location.path("/")
        });
}

angular
	.module("meca")
	.directive("myDirectiva", myDirectiva);


function myDirectiva(){
	return "hola";
}
angular
	.module("meca")
	.factory('comun', comun);


function comun($http){
	var comun = {};

	comun.getAll = function(){
		return $http.get("/alumnos")
		.success(function(data){
			var resultado; 
			angular.copy(data, resultado);
			return resultado;
		})
	}


	comun.add = function(alumno){
		return $http.post('/alumno', alumno)
		.success(function(data){
			return data;
		})
	}

	comun.update = function(alumno, newAlumno){
		return $http.put("/alumno/" + alumno._id, newAlumno)
		.success(function(data){
			return data;
		})
	}

	comun.delete = function(alumno){
		return $http.delete("/alumno/" + alumno._id)
		.success(function(data){
			return data;
		})
	}

	return comun;
}
angular
	.module("meca")
	.filter("myFiltro", myFiltro);


function myFiltro(){
	return function(input, uppercase) {
    input = input || '';
    var out = '';
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
}
angular
	.module("meca")
	.service('serviceComun', serviceComun);


function serviceComun(){
	var comun = {};

	comun.ordenar = function(numeros){
		return $http.get("/alumnos")
		.success(function(data){
			var resultado; 
			angular.copy(data, resultado);
			return resultado;
		})
	}


	return comun;
}
angular
	.module("meca")
	.controller("meca_principal", principal);


function principal($scope, comun, $stateParams, serviceComun){
	$scope.hola = "hola alumnos:";

	comun.getAll().then(function(data){
		$scope.alumnos = data.data;
	}, function(errorResp){
		console.log("error al obtener alumnos");
	}) 

	$scope.alumno = {
		nombre: "ismael",
		email: "pipia@apo",
		edad: "14"
	}

	/*comun.add($scope.alumno).then(function(data){
		console.log(data);
	})*/
	//console.log($scope.alumnos)

	$scope.newAlumno = {
		nombre: "ismael",
		email: "pipia@apo",
		edad: "14"
	}
	
	$scope.actualizar = function(){
		comun.update($scope.alumnos[0], $scope.newAlumno).then(function(data){
			console.log(data)
		})
	}

	$scope.borrar = function(){
		comun.delete($scope.alumnos[0]).then(function(data){
			console.log(data)
			$scope.alumnos.splice(0, 1);
		})
	}


}
