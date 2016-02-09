appDirectives.directive('showInfoButton', function($compile) {
  return {
    restrict: 'E',
    replace: true,
    template: function(tElement, tAttrs) {
    	return '<button class="show-info-button no-style-button" ng-click="showInfo($event)" show-info-button><span class="glyphicon glyphicon-info-sign"></span></button>'
    },
    link: function(scope, element, attr) {
    	scope.showInfo = function(event){
		    var isVisibleDescription = $(event.target).parents("tbody").find("tr[class='success']").is(":visible");
		    $("tr[class='success']").hide("fast");
		    isVisibleDescription ? $(event.target).parents("tbody").find("tr[class='success']").hide("fast") : $(event.target).parents("tbody").find("tr[class='success']").show("slow");
		};
    }
  };
});