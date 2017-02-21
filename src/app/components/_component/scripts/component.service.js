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