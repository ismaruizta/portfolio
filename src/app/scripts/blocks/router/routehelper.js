angular
	.module("router")
	.provider("routehelperConfig", routeherlperConfig)
	.factory("routehelper", routehelper);


function routeherlperConfig(){
	this.config = {
		$urlRouterProvider: undefined,
		$stateProvider: undefined,
		resolveAlways: undefined,
		docTitle: undefined
	}

	this.$get = function(){
		return {
			config: this.config
		};
	};
}

function routehelper($location, $rootScope, $state, logger, routehelperConfig){

	var routes = [];
	var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;
	var $stateProvider = routehelperConfig.config.$stateProvider;

	var service = {
		configureRoutes: configureRoutes,
		getRoutes: getRoutes,
	};

	init();

	return service;

	function configureRoutes(routes){
		routes.forEach(function(route){
			route.config.resolve = 	angular.extend(route.config.resolver || {}, routehelperConfig.config.resolveAlways());
			$stateProvider.state( route.name, route.config );
		});

		$urlRouterProvider.otherwise("/");
	}


	function init(){
		updateDocTitle()
	}

	function getRoutes(){
		for (var i = 0; i < $state.get().lenght; i++) {
			var route = $state.get()[i];
			var isRoute = !!route.title;
			if(isRoute){
				routes.push(route);
			}

		}
		return routes;

	}

	function updateDocTitle(){
		$rootScope.$on("$stateChangeSuccess", function(event, toState, fromState){
			var title = routehelperConfig.config.docTitle + " " + (toState.title || "");
			$rootScope.title = title;
		})
	}
}

