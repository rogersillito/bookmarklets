javascript: (function() {
    /*  helper behaviours for browsing Flickr */
    var $ = document.querySelectorAll.bind(document);
    NodeList.prototype.__proto__ = Array.prototype;
    var getAttr = function(el, name) {
        var attrs = el.attributes;
        for (var i = attrs.length - 1; i >= 0; i--) {
            if (attrs[i].name === name) {
                return attrs[i].value;
            }
        }
    };
    var getStemUrlFrom = function(url) {
        var sepIdx = url.indexOf('/in/');
        if (sepIdx > 0) {
            return url.substr(0, sepIdx + 1);
        }
        return url;
    };
    var overlay = $('a.overlay');
    if (overlay.length > 0) {
        overlay.forEach(function(el) {
            el.onclick = function(e) {
                e.stopPropagation();
                var url = getAttr(e.target, 'href');
                var stem = getStemUrlFrom(url);
                var sizesUrl = stem + 'sizes/o/';
                window.open(sizesUrl);
            };
        });
        console.log("imgOpn ready");
    }
    var fullSize = $('div#allsizes-photo > img');
    if (fullSize.length === 1) {
        var url = getAttr(fullSize[0], 'src');
        window.location = url;
    }
})()
