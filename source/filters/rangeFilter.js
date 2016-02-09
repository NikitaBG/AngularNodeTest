appFilters.filter('range', function() {
  return function(input, total) {
  	if(input && total){
    	return input.slice(0, total);
	}
  };
});