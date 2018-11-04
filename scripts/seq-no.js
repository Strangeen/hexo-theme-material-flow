(function(hexo){
	// 自动序号插件
	// 用法：
	// 1、定义序列 ::seqno1(1,1)    表示后续的seqno1标签作为自动序号，起始1，步进1
	// 2、调用序号 ::seqno1					将替换为自动序号
	// 3、多组自动序号  ::seqno1(1,1)  ::seqno2(1,1)  ::seqno1  ::seqno2
	// 返回传入类型
	// objs: [this_function, seqNos]
	hexo.extend.helper.register('seqno', function(post, objs) {
		seqNos = objs[1];
		if (!post) return post;
		if (typeof(post) == 'string') {
			return convertTag(post, seqNos);
		} else if (typeof(post) == 'object') {
			var cnt = post.content;
			if (!cnt) return post;
			cnt = convertTag(cnt, seqNos);
			post.content = cnt;
			return post;
		} else {
			throw new Error("post类型未知：" + typeof(post));
			return post;
		}
	});

	function convertTag(content, seqNos) {
		var map = getSeqNoInfoMap(seqNos);
		if (getJsonEleSize(map) > 0) {
			var reg = /::(seqno\d+)/img;
			content = content.replace(reg, function(s, $1){
				return getSeqNoRep(map, $1);
			});
		}
		return content;
	}

	function getJsonEleSize(json) {
		var size = 0;
		for (key in json)
			if (json.hasOwnProperty(key)) size ++;
		return size;
	}

	// 存放seq no信息
	function SeqNo(seqNo, start, step) {
		this.seqNo = seqNo;
		this.start = start - 0;
		this.step = step - 0;
		this.curr = this.start;
	}

	// 获取序号信息Map
	function getSeqNoInfoMap(seqNos) {
		var map = {};
		var reg = /::(seqno\d+)\((\d+),(\d+)\)(?:\n)*/img;
		while (r = reg.exec(seqNos)) 
			map[r[1]] = new SeqNo(r[1], r[2], r[3]);
		return map;
	}
	
	// 获取序列号代码代表的序号值
	function getSeqNoRep(map, seqNo) {
		var seqNoObj = map[seqNo];
		if (seqNoObj == null) {
			throw new Error("seqNo: " + seqNo + " is not defined");
			return null;
		}
		var curr = seqNoObj.curr;
		seqNoObj.curr += seqNoObj.step;
		return curr;
	}
})(hexo);