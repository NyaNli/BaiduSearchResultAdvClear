!function(){
    var inject = function() {
        function showURL(ele, link) {
            var showurl = ele.querySelector('.c-showurl');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', link.replace(/^http:/, 'https:') + '&wd=&eqid=' + bds.comm.eqid);
            xhr.onreadystatechange = function() {
                if (xhr.DONE == xhr.readyState) {
                    var dp = new DOMParser();
                    var redirect = dp.parseFromString(xhr.responseText, 'text/html').querySelector('meta[http-equiv=refresh]');
                    var url = /^0;URL='(.*)'$/.exec(redirect.content)[1];
                    url = decodeURIComponent(url);
                    if (url.length > 40) {
                        url = url.substr(0, 40) + '...';
                    }
                    showurl.innerText = url;
                }
            };
            xhr.send();
        }

        function clean() {
            var result_list = document.getElementById('content_left');
            if (!result_list)
                return;
            var i = 0;
            while(i < result_list.childNodes.length){
                var ele = result_list.childNodes[i];
                if (ele.nodeName == 'DIV') {
                    if (ele.innerHTML.includes('>广告</span>'))
                        result_list.removeChild(ele);
                    else {
                        var link = ele.querySelector('a');
                        link.onmouseover = function(){return false;};
                        if (/^http(?:s)?:\/\/www\.baidu\.com\/link\?url=/.test(link.href) && !link.classList.contains('adv-changed')) {
                            link.classList.add('adv-changed');
                            showURL(ele, link.href);
                        }
                        i++;
                    }
                } else
                    i++;
            }
        }
        
        var MutationObserver = window.MutationObserver;

        window.addEventListener('load', function() {
            var observer = new MutationObserver(function(records) {
                for (var i in records) {
                    if (records[i].addedNodes.length > 0) {
                        setTimeout(clean);
                        break;
                    }
                }
            });
            var observerOptions = {
                childList: true,
                attributes: false,
                subtree: true
            };
            observer.observe(document.getElementById('wrapper_wrapper'), observerOptions);
            clean();
        });
    };
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = '(' + inject.toString() + '());';
    document.documentElement.appendChild(s);
}();
