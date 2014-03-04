module.exports = (function FakeQuery() {

	var requests = [],
		preFilter;

	function jqXhr(opt) {
		this.options = opt;
	}
	jqXhr.prototype.fail = function(cb) {
		this.runFail = cb;
		return this;
	};
	jqXhr.prototype.done = function(cb) {
		this.runDone = cb;
		return this;
	};
	jqXhr.prototype.always = function(cb) {
		this.runAlways = cb;
		return this;
	};

	function ajax(options) {
		var req = new jqXhr(options);
		if (preFilter && typeof preFilter == 'function') {
			if (preFilter(req) === false)
				return;
		}
		requests.push(req);
		return req;
	}

	function post(url,data){
		return ajax({url:url,data:data,type:'POST'});
	}

	function get(url,data){
		return ajax({url:url,data:data,type:'GET'});
	}

	function filter(func) {
		preFilter = func;
	}

	return {
		ajax: ajax,
		get: get,
		post: post,
		requests: requests,
		lastRequest:function(){ return requests[requests.length -1]},
		ajaxPrefilter: filter
	};

})();