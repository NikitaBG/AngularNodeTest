appFilters.filter('pagination', function() {
  return function(input, range, page) {
  	if(input && range && page){
  		if(input.length - ((page-1) * range) < 0){
  			page = 1;
  			return input.slice((page-1)*range, (page-1)*range + range);
  		}
    	return input.slice((page-1)*range, (page-1)*range + range);
	}
  };
});