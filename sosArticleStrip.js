javascript:(function() {
    /* Creates a more printable view of a SoundOnSound back issue article  */

    /* Replace imgs with Higer Res enlarged counterparts */
    function replaceImg(im) {
        // TODO: wait for hi-res to load: https://stackoverflow.com/questions/3646036/preloading-images-with-javascript
        const hiResUrl = im.parentNode.getAttribute('href');
        if (hiResUrl.endsWith('.gif') || hiResUrl.endsWith('.jpg') || hiResUrl.endsWith('.jpeg') || hiResUrl.endsWith('.png')  || hiResUrl.endsWith('.webp')) {
            /* console.log(hiResUrl); */
            /* console.log(im.attributes['src']); */
            const src = im.getAttributeNode('src');
            src.nodeValue = hiResUrl;
        }
    }
    const imgs = document.querySelectorAll('img[typeof="foaf:Image"]');
    for (im of imgs) {
        replaceImg(im);
    }

    /* strip out unwanted elements */
    function removeEl(selector) {
        const el = document.querySelector(selector);
        if (!el) {
            console.error('NOT FOUND: ' + selector);
            return;
        }
        el.parentNode.removeChild(el);
        console.log('removed: ' + selector);
    };
    removeEl('.l-region--header');
    removeEl('.l-region--branding');
    removeEl('.l-region--navigation');
    removeEl('.l-region--sidebar-first');
    removeEl('.block--sharethis');
    removeEl('.block--sos-articles-sos-articles-issue-navigator');
    removeEl('.l-postscript');
    removeEl('.l-footer-top');
    removeEl('.l-footer');
    removeEl('.buy-pdf');

    /* restyle some things */
    let css = '\nbody.html { background-color: #fff; }\n';
    css += '.l-content { width: 660px; }\n';
    css += '.l-main { padding-left: 160px; padding-right: 160px; margin-bottom: 40px; }\n';
    css += '.l-header { padding: 0px 160px 10px 140px; }\n';
    
    const newStyles = document.createElement('style');
    newStyles.type = 'text/css';
    newStyles.appendChild(document.createTextNode(css));
    document.head.appendChild(newStyles);
})()
