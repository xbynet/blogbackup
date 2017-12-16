---
title: 使用hexo搭建博客
date: 2017-12-16 23:32:09
copyright: true
toc: true
categories: 杂项
tags:
- hexo
- github
---

好处:免费、强大、可迁移、markdown+git组合

## 创建仓库  
新建一个名为你的用户名.github.io的仓库，比如说，如果你的github用户名是test，那么你就新建test.github.io的仓库（必须是你的用户名，其它名称无效），将来你的网站访问地址就是 http://test.github.io 了
仓库创建成功不会立即生效，需要过一段时间，大概10-30分钟，或者更久。

## 绑定域名
将CNAME指向你的用户名.github.io
然后到你的github项目根目录新建一个名为CNAME的文件（无后缀），里面填写你的域名
在你绑定了新域名之后，原来的你的用户名.github.io会自动跳转到你的新域名。

<!--more-->

## 配置SSH key
`ssh-keygen -t rsa -C "邮件地址" `
找到.ssh\id_rsa.pub文件，记事本打开并复制里面的内容，打开你的github主页，进入个人设置 -> SSH and GPG keys -> New SSH key。
测试是否成功
`$ ssh -T git@github.com # 注意邮箱地址不用改`

此时你还需要配置：
```
$ git config --global user.name "xbynet"// 你的github用户名，非昵称
$ git config --global user.email  "xxx@xxx.com"// 填写你的github注册邮箱
```

## 使用hexo写博客
Hexo是一个简单、快速、强大的基于 Github Pages 的博客发布工具，支持Markdown格式，有众多优秀插件和主题。
官网： http://hexo.io
github: https://github.com/hexojs/hexo

由于github pages存放的都是静态文件，博客存放的不只是文章内容，还有文章列表、分类、标签、翻页等动态内容，假如每次写完一篇文章都要手动更新博文目录和相关链接信息，相信谁都会疯掉，所以hexo所做的就是将这些md文件都放在本地，每次写完文章后调用写好的命令来批量完成相关页面的生成，然后再将有改动的页面提交到github。

安装之前先来说几个注意事项：
很多命令既可以用Windows的cmd来完成，也可以使用git bash来完成，但是部分命令会有一些问题，为避免不必要的问题，建议全部使用git bash来执行；
hexo不同版本差别比较大，网上很多文章的配置信息都是基于2.x的，所以注意不要被误导；
hexo有2种_config.yml文件，一个是根目录下的全局的_config.yml，一个是各个theme下的；
```
$ npm install -g hexo
$ hexo init

$ hexo g # 生成
$ hexo s # 启动服务
```
执行以上命令之后，hexo就会在public文件夹生成相关html文件，这些文件将来都是要提交到github去的：
hexo s是开启本地预览服务，打开浏览器访问 http://localhost:4000 即可看到内容，很多人会碰到浏览器一直在转圈但是就是加载不出来的问题，一般情况下是因为端口占用的缘故

### 修改主题
采用hexo-theme-next
修改_config.yml中的theme: landscape改为theme: next.

### 保留CNAME、README.md等文件
提交之后网页上一看，发现以前其它代码都没了，此时不要慌，一些非md文件可以把他们放到source文件夹下，这里的所有文件都会原样复制（除了md文件）到public目录的

### 常用hexo命令
```
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本

缩写：
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
组合命令：
hexo s -g #生成并本地预览
hexo d -g #生成并上传
```

`_config.yml`:这里面都是一些全局配置，每个参数的意思都比较简单明了，所以就不作详细介绍了。
需要特别注意的地方是，冒号后面必须有一个空格，否则可能会出问题。

## 上传到github
首先，ssh key肯定要配置好。
其次，配置_config.yml中有关deploy的部分：
```
正确写法：
deploy:
  type: git
  repository: git@github.com:liuxianan/liuxianan.github.io.git
  branch: master
  
错误写法：
deploy:
  type: github
  repository: https://github.com/liuxianan/liuxianan.github.io.git
  branch: master
```
```
npm install hexo-deployer-git --save
hexo d -g #生成并上传
```


## 遇到的问题：
https://stackoverflow.com/questions/17846529/could-not-open-a-connection-to-your-authentication-agent
https://stackoverflow.com/questions/22575662/filename-too-long-in-git-for-windows
如果遇到git not found之类的错误，请使用git bash 而非cmd
如果遇到Permission denyed:
1、请检查密钥
2、可能是没有加载私钥到ssh-agent,到.ssh目录下执行:
```
eval $(ssh-agent)
ssh-add id_rsa
```
3、git for windows下的Filename too long
```
git config --global core.longpaths true  
```

## 写博客
定位到我们的hexo根目录，执行命令：
`hexo new 'my-first-blog'`
hexo会帮我们在source/_posts下生成相关md文件,我们只需要打开这个文件就可以开始写博客了
当然你也可以直接自己新建md文件，用这个命令的好处是帮我们自动生成了时间。
一般完整格式如下：
```
---
title: postName #文章页面上的显示名称，一般是中文
date: 2013-12-02 15:30:16 #文章生成时间，一般不改，当然也可以任意修改
categories: 默认分类 #分类
tags: [tag1,tag2,tag3] #文章标签，可空，多标签请用格式，注意:后面有个空格
description: 附加一段文章摘要，字数最好在140字以内，会出现在meta的description里面
---

以下是正文
```
**那么hexo new page 'postName'命令和hexo new 'postName'有什么区别呢？**
```
hexo new page "my-second-blog"
```
最终部署时生成：hexo\public\my-second-blog\index.html，但是它不会作为文章出现在博文目录。


### 如何让博文列表不显示全部内容
默认情况下，生成的博文目录会显示全部的文章内容，如何设置文章摘要的长度呢？
答案是在合适的位置加上<!--more-->即可.

```
# 前言

使用github pages服务搭建博客的好处有：

1. 全是静态文件，访问速度快；
2. 免费方便，不用花一分钱就可以搭建一个自由的个人博客，不需要服务器不需要后台；
3. 可以随意绑定自己的域名，不仔细看的话根本看不出来你的网站是基于github的；

<!--more-->

4. 数据绝对安全，基于github的版本管理，想恢复到哪个历史版本都行；
5. 博客内容可以轻松打包、转移、发布到其它平台；
6. 等等；
```

### 如何支持目录：
为文章添加 `toc: true`

### Toc虽然生成了，审查元素看锚也有，但是无法点击:(差了很久，也搜了issues，但是没人遇到和我类似的问题。。。)
修改next/layout/_scripts/vendors.swig，添加  

```html
<script>
          $(function(){
            $(".nav-item .nav-link").each(function(i){
              $(this).text($(this).attr("href").replace('#',''));
              $(this).parent().contents().filter(function() {
                  return this.nodeType == 3; //Node.TEXT_NODE
              }).remove();
            });
          });
</script>
```

### 404页面:
在source下新建一个404.html文件即可,建议采用腾讯公益404，如下：

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8;"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="robots" content="all" />
  <meta name="robots" content="index,follow"/>
</head>
<body>

  <script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="返回主页"></script>
  </script>
</body>
</html>
```

### 配置markdown解析器，这个官方文档没有说明，但是由于hexo采用hexo-renderer-marked,故而可以参考hexo-renderer-marked文档:

```
marked:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true
  modifyAnchors: ''
  autolink: true
```

## 安装插件：
如报ERROR Deployer not found: git,请执行：`npm install --save hexo-deployer-git`
1、sitemap、feed插件
`$ npm install hexo-generator-sitemap hexo-generator-feed hexo-generator-baidu-sitemap --save`
启用，修改Hexo\_config.yml，增加以下内容

```
sitemap:
    path: sitemap.xml
baidusitemap:
    path: baidusitemap.xm

feed:
    type: atom
    path: atom.xml
    limit: 100
```

## 添加“Fork me on Github” ribbon
给blog主页添加一个“Fork me on Github”的绶带（ribbon）那么将下面的代码（注意将you改为你自己的github上的注册名）,添加到next/layout/_layout.swig的body结束标签之前 (注意：这是next主题的地址，其他主题可能不一致):
```
<a href="https://github.com/xbynet"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/567c3a48d796e2fc06ea80409cc9dd82bf714434/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"></a>
```

## 插入音乐:
两种方式，在线和离线。
在线的可以采用网易云音乐的外链播放，不过是一个iframe。
离线/在线直播源播放可以采用hexo-tag-aplayer.安装后，修改next/layout/_custom/sidebar.swig:
```
<div id="aplayer1" class="aplayer"></div>
<script src="/asserts/js/APlayer.min.js"></script>
<script>
    var ap = new APlayer({
        element: document.getElementById('aplayer1'),
        narrow: false,
        autoplay: false,
        showlrc: false,
        mutex: true,
        theme: '#e6d0b2',
        preload: 'metadata',
        mode: 'circulation',
        music: {
            title: '素雨',
            author: '孙雪宁',
            url: 'http://ws.stream.qqmusic.qq.com/C1000040LV2h3FzIVl.m4a?fromtag=38',
            pic: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003mxnKZ0WbTPc.jpg?max_age=2592000'
        }
    });
</script>

<!-- 
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=28815250&auto=0&height=66"></iframe>
-->
```
如何寻找在线音乐源地址:http://music.liuzhijin.cn/ 




## 参考：
https://www.cnblogs.com/liuxianan/p/build-blog-website-by-hexo-github.html
https://segmentfault.com/a/1190000006831597
https://www.cnblogs.com/zhcncn/p/4097881.html
https://github.com/litten/BlogBackup
http://www.jianshu.com/p/f054333ac9e6