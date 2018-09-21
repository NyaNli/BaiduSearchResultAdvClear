window.addEventListener('load',function(){
    var result_list = document.getElementById('content_left');
    if (result_list) {
        var i = 0;
        while(i < result_list.childNodes.length){
            var ele = result_list.childNodes[i];
            if (ele.nodeName == 'DIV') {
                if (ele.innerHTML.includes('>广告</span>'))
                    result_list.removeChild(ele);
                else
                    i++;
            } else
                i++;
        }
    }
    document.body.addEventListener('DOMSubtreeModified', function(){
        var result_list = document.getElementById('content_left');
        if (!result_list)
            return;
        var i = 0;
        while(i < result_list.childNodes.length){
            var ele = result_list.childNodes[i];
            if (ele.nodeName == 'DIV') {
                if (ele.innerHTML.includes('>广告</span>'))
                    result_list.removeChild(ele);
                else
                    i++;
            } else
                i++;
        }
    });
});