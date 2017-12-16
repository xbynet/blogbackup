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