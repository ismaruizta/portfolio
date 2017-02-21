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
