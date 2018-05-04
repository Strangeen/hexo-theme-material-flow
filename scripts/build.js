(function(hexo){
	hexo.extend.helper.register('builder', function(post) {
		if (!post || typeof(post) != 'object') return post;
		return new builder(post);
	});

	
	/**
	 * post为对象
	 * build之后得到修改后的post
	 * build可以传入参数，返回参数代表的子对象
	 */
	function builder(post) {
		
		this.post = post;
		
		// funName第一个参数是post，只能更改对象属性，不能更改引用
		this.invoke = function(fun, ...theArgs) {
			if (typeof(fun) != 'function')
				throw new Error(fun + '不是方法');
			fun(post, theArgs);
			return this;
		}
		
		this.build = function(key) {
			if (key) return post[key];
			return post;
		}
	}
	
	
})(hexo);