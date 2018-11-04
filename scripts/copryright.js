(function(hexo){
	// 文章底部版权信息插件
	// 文章底部版权信息输出条件：
	// 1. 文章设置"copyright:false"不输出
	// 2. Page一般情况不输出
	// 3. Page设置"page_copyright:true"输出
	// 4. ${xxx}：替换为post.xxx，如果为空则不展示，参数${xxx x}，后面x为替换后的后缀标点符号，比如逗号
	// 5. ${theme.xxx}：替换为主题配置中的xxx
	// objs: [this_function, type, copyrightStatement]
	hexo.extend.helper.register('copyright', function(post, objs) {
		if(!(post.copyright == false || (objs[1] == "page" && 
				post.page_copyright != true))) {
			var template = objs[2];
			var copyright = template.replace(/\$\{(.*?)\}/g, function(match, $1){
				var symbol = $1;
				var symbolArr = parseSymbol(symbol);
				var symbol = symbolArr[0];
				var suffix = symbolArr[1];
				var cnt = getSymbolCnt(post, symbol);
				if (cnt == null || cnt == '') return '';
				return cnt + suffix;
			});
			post.content = post.content + '\n' + 
				'<p class="article-copyright">' + copyright + '</p>';
			return post;
		}
	});

	function parseSymbol(symbol) {
		if (symbol == null || symbol == '') {
			throw new Error('copyright_statement符号不正确${}内容为空');
		}
		symbol = symbol.trim();
		if (symbol.indexOf(' ') > -1) {
			return symbol.split(' ');
		} else {
			return [symbol, ''];
		}
	}

	function getSymbolCnt(post, symbol) {
		if (symbol.indexOf('theme.') == 0) {
			symbol = symbol.substring(6);
			return theme[symbol];
		} else {
			return post[symbol];
		}
	}
})(hexo);