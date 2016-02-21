appServices.factory('userService',['$resource','$window','$location','authService', function($resource, $window, $location, authService) {
    return {
        logIn: function(email, password) {
            return $resource("api/login").save({email:email, password:password}).$promise;
        },
        logOut: function() {
            delete $window.sessionStorage.token;
            $location.path("/");
        },
        getCurrentData: function() {
        	return $resource("/api/currentUser").get({}).$promise;
        },
        get: function(uuid){
            return $resource("/api/users/:userId").get({userId: uuid}).$promise;
        },
        update: function(entity){
            return $resource("/api/updateUser/:userId").save({userId: entity.uuid}, entity).$promise;
        },
        signUp: function(entity){
            return $resource("/api/signUp").save(entity).$promise;
        },
        savePassword: function(entity){
            return $resource("/api/updatePassword").save(entity).$promise;
        }
    }
}]);