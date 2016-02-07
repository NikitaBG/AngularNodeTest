appServices.factory('userService', function($resource) {
    return {
        logIn: function(email, password, succesFunc, errorFunc) {
            return $resource("api/login").save({email:email, password:password}, function(data){ succesFunc(data);}, function(status,data){ errorFunc(status,data);});
        },
        logOut: function() {
 
        }
    }
});