javascript: (function () {
    /* Creates a more printable view of a SoundOnSound back issue article  */

    function removeEl(selector) {
        const el = document.querySelector(selector);
        if (!el) {
            console.error('NOT FOUND: ' + selector);
            return;
        }
        el.parentNode.removeChild(el);
        console.log('removed: ' + selector);
    };
    function isImage(path) {
        for (ext of ['gif', 'jpg', 'jpeg', 'png', 'webp']) {
            if (path.endsWith(`.${ext}`)) {
                return true;
            }
        }
        return false;
    }
    function replaceImg(im, hiResUrl) {
        const src = im.getAttributeNode('src');
        return new Promise(resolve => {
            const image = new Image();
            image.onload = () => {
                console.log(`Replaced: ${hiResUrl.substring(hiResUrl.lastIndexOf('/') + 1)}`);
                src.nodeValue = hiResUrl;
                resolve();
            };
            image.onerror = resolve;
            image.src = hiResUrl;
        });
    }

    /* Replace content images with Higer Res enlarged counterparts */
    const imgs = document.querySelectorAll('img[typeof="foaf:Image"]');
    const replaced = [];
    for (im of imgs) {
        const hiResUrl = im.parentNode.getAttribute('href');
        if (!isImage(hiResUrl)) {
            continue;
        }
        replaced.push(replaceImg(im, hiResUrl));
    }

    /* Replace header image with better quality one */
    const headerIm = document.querySelector('.site-logo');
    const newLogoUrl = 'https://www.synthax.co.uk/latest/wp-content/uploads/2018/06/Sound-On-Sound-Logo.png';
    replaced.push(replaceImg(headerIm, newLogoUrl));

    /* scroll to bottom, and print when done replacing images */
    Promise.all(replaced).then(im => {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
            window.print();
        }, 0);
    });

    /* strip out unwanted elements */
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
    css += '.site-logo { width: 660px; }\n';
    css += '.l-main { padding-left: 160px; padding-right: 160px; margin-bottom: 40px; }\n';
    css += '.l-header { padding: 0px 160px 10px 140px; }\n';
    const newStyles = document.createElement('style');
    newStyles.type = 'text/css';
    newStyles.appendChild(document.createTextNode(css));
    document.head.appendChild(newStyles);
})()
