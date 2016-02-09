appFilters.filter('paginationSize', function() {
  return function(input, array, range) {
  	if(input && array && range){
		var pages = [];
		for(var index = 1; index <= Math.ceil(array.length / range) && Math.ceil(array.length / range) > 1; index++){
			pages.push(index);
		}
		return pages;
	}
  };
});