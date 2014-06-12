require('./querySelectorAll');

// make all rel="modal" links have no href because they trigger functions
[].forEach.call(document.querySelectorAll('a[rel="modal"]'), function(a){
	a.href = "";
});