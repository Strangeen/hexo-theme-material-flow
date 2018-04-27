# Ye Dinghui 修改

1. 新增表格样式
2. 新增进度条语句，只兼容chrome和iphone的safari
3. 新增特定页面的表格自适应（仅用于自己的网站）

## 进度条语句
##### 语句：
```
::process(value[,colorClass|colorClassJson],desc)
```
##### 用法：

比如要在页面展示进度条，样子类似下图：

![](http://progressed.io/bar/40?title=completed)

可以在markdown中写：
```
::process(40,,completed)
```

既然[process.io](https://github.com/fehmicansaglam/progressed.io)提供了方便的图片展示，为什么要自己用html实现，因为加载大量图片太慢了啊... 所以就用html实现！ [DEMO](http://dinghuiye.online/book-list/)

##### 参数解释：

###### value
进度值，0~100的数字

###### colorClass|colorClassJson
进度的颜色，可以省略，填入css的class类，可以为字符串或非标准的json（没有引号）

1. 默认颜色分段为 0~20->红色，20~70->黄色，70~100->绿色

2. 如果想更改颜色为总是显示红色，第二个参设置为字符串：
```
::process(40,red-class,completed)
```
3. 如果想更改颜色为其他颜色分段，第二个参数设置为json，如 0~50->红色，50~100->黄色：
```
::process(40,{50:red-class,100:yellow-class},completed)
```

###### desc
进度描述，可以省略，默认为“done”，当屏幕小于820px时隐藏

---

# Material Flow

__由于本人将博客系统转到hugo上，本Hexo主题将只进行bug修复__   
安利一发我为hugo写的相同风格的主题： [YAMT](https://github.com/stkevintan/sfork)


Yet Another Material-Design-Style Hexo Theme.[DEMO](https://kntan.coding.me/kntan/)  

<div>
<img width="75%" src='https://raw.githubusercontent.com/stkevintan/hexo-theme-material-flow/master/snapshots/index.png' />
<img width="20%" src='https://raw.githubusercontent.com/stkevintan/hexo-theme-material-flow/master/snapshots/phone.png' />
</div>

## Installation
```bash
# change to work dir
cd /your_blog_dir/
# install dependencies
npm i -S hexo-generator-search hexo-generator-feed hexo-renderer-less hexo-autoprefixer hexo-generator-json-content
# download source
git clone https://github.com/stkevintan/hexo-theme-material-flow themes/material-flow
```

## Configuration
1. Change the value of `theme` to `material-flow` in `_config.yml`.
2. Put your avatar && favicon  images to `source/images/`.
3. Edit `_config.yml` and `themes/material-flow/_config.yml` for your needs.  


Here are some examples:
1. [_config.yml](https://github.com/stkevintan/hexo/blob/master/_config.yml)  
2. [themes/material-flow/_config.yml](https://github.com/stkevintan/hexo/blob/master/themes/material-flow/_config.yml)  

## More
Please refer to offical doc : <https://hexo.io/docs/index.html>
