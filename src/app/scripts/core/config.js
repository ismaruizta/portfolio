
	angular
		.module("app.core")
		.config(toastrConfig)
		.config(configure)
		.value("config", config);

	function toastrConfig(toastr){
		toastr.options.timeOut = 4000,
		toastr.options.positionClass = "toast-bottom-right";
	}

	function configure($logProvider, $urlRouterProvider, $stateProvider, routehelperConfigProvider, exceptionHandlerProvider){
		//actiba debuggin
		if($logProvider.debugEnabled){
			$logProvider.debugEnabled(true);
		}

		//configuramos el provider de las rutas
		routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
		routehelperConfigProvider.config.$stateProvider = $stateProvider;
		routehelperConfigProvider.config.$docTitle = "NG-Meca ";

		var resolveAlways = {
			ready: ["dataservice", function(dataservice){
				return dataservice.ready();
			}]
		};
		routehelperConfigProvider.config.resolveAlways = resolveAlways;

		//configurar el exception handler
		exceptionHandlerProvider.configure(config.appErrorPrefix);		
	}

	var config = {
		appErrorPrefix: "[NG-Meca Error]", //configurar el exceptionHandler decorator
		appTitle: "Meca Power",
		version: "0.0.1"
	};


