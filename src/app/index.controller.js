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
