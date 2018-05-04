(function(hexo){
	// 展示进度条插件
	// 用法：
	// ::process(20)   表示展示20%的进度条
	// 返回传入类型
	hexo.extend.helper.register('process', function(post) {
		if (!post) return post;
		if (typeof(post) == 'string') {
			return convertTag(post);
		} else if (typeof(post) == 'object') {
			var cnt = post.content;
			if (!cnt) return post;
			cnt = convertTag(cnt);
			post.content = cnt;
			return post;
		} else {
			throw new Error("post类型未知：" + typeof(post));
			return post;
		}
		
	});

	function convertTag(content) {
		// $1 process值, $2 process颜色css类(字符串或json)，默认3种颜色, $3 process描述，默认“done”
		var reg = /::process\((.*?)(?:,(\{.*?\}|.*?))?(?:,(.*?))?\)/img;
		return content.replace(reg, function(s, $1, $2, $3){
			return '' + 
				'<div class="md-procs">' +
				'	<span class="md-procs-desc">' + ($3 ? $3 : 'done') + '</span>' + 
				'	<span class="md-procs-value-box">' + 
				'		<span class="md-procs-value ' + getProcessColorClass($1, $2) + ($1 == 100 ? ' md-procs-large-radius' : '') + '" style="width:' + ($1 == 0 ? 0 : ($1 * 90 / 100 + 10)) + '%"></span>' + // 10%以下在iphone上样式不正确，将10设为大于0值的起始值
				'		<span class="md-procs-value-word">' + $1 + '%</span>' + 
				'	</span>' + 
				'</div>';
		});
	}

	// 将json整理成标准格式
	function tidyJson(json) {
		json = json.substring(1, json.length - 1) + ","; // 去掉中括号，并在末尾添加逗号（便于正则替换）
		var reg = /(.*?)\:(.*?),/g;
		var jsonNew = json.replace(reg, function(s, $1, $2){return '"' + $1 + '":"' + $2 + '",'});
		return "{" + jsonNew.substring(0, jsonNew.length - 1) + "}";
	}

	// colorClassJson: 分段颜色css类，字符串或json，json：{20:proc-red,30:proc-yellow}
	function getProcessColorClass(process, colorClassJson) {
		if (colorClassJson) {
			if (colorClassJson.startsWith('{') && colorClassJson.endsWith('}')) {
				var json = JSON.parse(tidyJson(colorClassJson));
				for (var key in json) {
					if (process - 0 <= key) {
						return json[key]
					}
				}
			} else {
				return colorClassJson;
			}
		}
		// 默认颜色
		if (process <= 20) return 'proc-red';
		else if (process <= 70) return 'proc-yellow';
		else if (process <= 100) return 'proc-green';
	}
})(hexo);