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