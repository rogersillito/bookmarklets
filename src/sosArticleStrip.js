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
function replaceEls(selector, replacementNodeBuilder) {
    const els = document.querySelectorAll(selector);
    if (!els.length) {
        console.error('NOT FOUND: ' + selector);
        return;
    }
    for (const el of els) {
        const node = replacementNodeBuilder();
        el.parentNode.replaceChild(node, el);
        console.log('replaced: ' + selector + ' -> ' + node);
    }
};
function isImage(path) {
    for (ext of ['gif', 'jpg', 'jpeg', 'png', 'webp']) {
        if (path.endsWith(`.${ext}`)) {
            return true;
        }
    }
    return false;
}
const replacedImages = [];
const replacedImageKeys = {};
function replaceImg(im, hiResUrl) {
    if (!im) { return; }
    const srcAttr = im.getAttributeNode('src');
    function doReplace(im, hiResUrl) {
        const imP = new Promise(resolve => {
            const image = new Image();
            image.onload = () => {
                console.log(`Replaced: ${hiResUrl.substring(hiResUrl.lastIndexOf('/') + 1)}`);
                srcAttr.nodeValue = hiResUrl;
                resolve();
            };
            image.onerror = resolve;
            image.src = hiResUrl;
        });
        return imP;
    }

    /* prevent multiple replacements on the same src, hiRes pair */
    const src = srcAttr.nodeValue;
    if (replacedImageKeys[src] && replacedImageKeys[src] === hiResUrl) {
        /* already replaced this one */
        return;
    }
    replacedImageKeys[src] = hiResUrl;
    replacedImages.push(doReplace(im, hiResUrl));
}
function doImageReplacementsFor(selector) {
    const imgs = document.querySelectorAll(selector);
    if (!imgs.length) {
        console.warn(`[doImageReplacementsFor] No elements found: ${selector}`)
    }
    for (im of imgs) {
        const hiResUrl = im.parentNode.getAttribute('href');
        if (!isImage(hiResUrl)) {
            continue;
        }
        replaceImg(im, hiResUrl);
    }
}
function createElementWithClass(elementName, cssClass) {
    const node = document.createElement(elementName);
    node.className = cssClass;
    return node;
}

/* Replace content images with Higer Res enlarged counterparts */
doImageReplacementsFor('img[typeof="foaf:Image"]');
doImageReplacementsFor('.media-image-right a img');
doImageReplacementsFor('.media-image-header a img');
doImageReplacementsFor('.media-image-left a img');

/* Replace header image with better quality one */
const headerIm = document.querySelector('.site-logo');
const newLogoUrl = 'https://www.synthax.co.uk/latest/wp-content/uploads/2018/06/Sound-On-Sound-Logo.png';
replaceImg(headerIm, newLogoUrl);
/* Replace review summary image (404) */
const reviewSummaryIm = document.querySelector('img[alt="sos_wob.gif"]');
const newReviewSummaryLogoUrl = 'https://sonicfarm.com/wp-content/uploads/2010/09/Sound_On_Sound.png';
replaceImg(reviewSummaryIm, newReviewSummaryLogoUrl);

/* scroll to bottom, and print when done replacing images */
Promise.all(replacedImages).then(im => {
    setTimeout(() => {
        console.log(`Replaced ${im.length} images`);
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

/* replace some (missing) image icons with Glyphicon equivalents */
const createWebGlpyh = () => createElementWithClass('i', 'glyphicon glyphicon-globe');
const createPhoneGlpyh = () => createElementWithClass('i', 'glyphicon glyphicon-earphone');
const createEmailGlpyh = () => createElementWithClass('i', 'glyphicon glyphicon-envelope');
const createPoundGlpyh = () => createElementWithClass('i', 'glyphicon glyphicon-gbp');
replaceEls('img[alt="infow.gif"]', createWebGlpyh);
replaceEls('img[alt="infot.gif"]', createPhoneGlpyh);
replaceEls('img[alt="infoe.gif"]', createEmailGlpyh);
replaceEls('img[alt="infop.gif"]', createPoundGlpyh);

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

/* link in Glyhpicons font styles:  */
/* extracted from: //netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css */
/* how to use minimally: https://stackoverflow.com/a/42553023/998793 */
css = "@font-face { font-family: 'Glyphicons Halflings';";
css += "  src: url('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.eot');";
css += "  src: url('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff') format('woff'); }";
css += ".glyphicon { position: relative; top: 1px; display: inline-block; font: normal normal 16px/1 'Glyphicons Halflings'; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased; margin-right: 4px; }";
/* specific glpyhs used: NB - special care over quotes/escapes */
css += '.glyphicon-globe:before{content:"\\e135";}';
css += '.glyphicon-gbp:before{content:"\\e149";}';
css += '.glyphicon-earphone:before{content:"\\e182";}';
css += '.glyphicon-envelope:before{content:"\\2709";}';
const glyphsLink = document.createElement('style');
glyphsLink.type = 'text/css';
glyphsLink.appendChild(document.createTextNode(css));
document.head.appendChild(glyphsLink);
