const albumNodes = document.querySelectorAll('grid-library-album');
const waitMs = 500;
const log = console.log.bind(console);

let downloadCount = 0;
let firstAlbum = 1;
let lastAlbum = albumNodes.length;

// eMusic popup/snack bar HTML:
/*
<div id="cdk-overlay-0" class="cdk-overlay-pane" style="position: static;">
   <ul _ngcontent-slk-c114="" role="menu" cdkmenu="" class="cdk-menu cdk-menu-group regular-context-menu ng-star-inserted" tabindex="0" id="cdk-menu-14" aria-orientation="vertical" data-cdk-menu-stack-id="1">
      <li _ngcontent-slk-c114="" class="menu-item ng-star-inserted"><button _ngcontent-slk-c114="" role="menuitem" cdkmenuitem="" type="button" class="cdk-menu-item btn" tabindex="-1"> Play </button></li>
      <!----><!---->
      <li _ngcontent-slk-c114="" class="menu-item ng-star-inserted"><button _ngcontent-slk-c114="" role="menuitem" cdkmenuitem="" type="button" class="cdk-menu-item btn" tabindex="-1"> Download Album </button></li>
      <!---->
      <li _ngcontent-slk-c114="" class="menu-item ng-star-inserted"><button _ngcontent-slk-c114="" role="menuitem" cdkmenuitem="" type="button" class="cdk-menu-item btn" tabindex="-1"> Add to Playlist </button></li>
      <!----><!----><!----><!---->
      <li _ngcontent-slk-c114="" class="menu-item division-line ng-star-inserted"><button _ngcontent-slk-c114="" role="menuitem" cdkmenuitem="" type="button" class="cdk-menu-item btn" tabindex="-1"> Delete Album </button></li>
      <!----><!---->
   </ul>
</div>


<snack-bar-container class="mat-snack-bar-container ng-tns-c54-8 ng-trigger ng-trigger-state blue mat-snack-bar-center ng-star-inserted" style="transform: scale(1); opacity: 1;">
   <div class="ng-tns-c54-8" aria-live="assertive">
      <div class="ng-tns-c54-8">
         <snack-bar _nghost-slk-c55="" class="ng-star-inserted" style="">
            <div _ngcontent-slk-c55="" class="close"></div>
            <div _ngcontent-slk-c55="" class="icon_container blue">
               <div _ngcontent-slk-c55="" class="icon"></div>
            </div>
            <div _ngcontent-slk-c55="" class="body">Preparing to Download: Inside</div>
         </snack-bar>
         <!---->
      </div>
   </div>
</snack-bar-container>
*/

const isIntegerString = function(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

const promptErr = function(errStr) {
    alert(errStr);
    throw errStr;
};

const validateAlbumInput = function(input) {
    const n = input.trim();
    if (!isIntegerString(n)) {
        promptErr("Amount must be an integer value, '" + n + "'");
    }
    if (n < firstAlbum || n > lastAlbum) {
        promptErr(`Value outside valid range: ${firstAlbum}-${lastAlbum}`);
    }
    return n/1;
};

const doDownload = function(nodeIdx) {
    log("DOWNLOADING: " + albumNodes[nodeIdx].innerText.replaceAll('\n',' '));
    const dotMenu = albumNodes[nodeIdx].querySelector('library-item-context-menu button');
    dotMenu.click();
    waitForElm('.cdk-overlay-container .cdk-overlay-pane').then(overlayEl => {
        overlayEl.querySelectorAll('li').forEach((menuEl,i) => {
            if (menuEl.innerText.trim() === 'Download Album') 
            { 
                menuEl.querySelector('button').click();
                waitForElm('snack-bar-container .body').then(dlWorkingEl => {
                    if (dlWorkingEl.innerText.includes("Download")) {
                        log("waiting...");
                        let waitIntvl = 0;
                        waitIntvl = setInterval(() => {
                            const childElms = document.querySelectorAll('snack-bar-container div').length;
                            if (!childElms) {
                                log("complete");
                                clearInterval(waitIntvl);
                                setTimeout(() => doNextDownload(nodeIdx), waitMs);
                            }
                        }, waitMs);
                    }
                }).catch(log);
            }
        });
    }).catch(log);
}

const doNextDownload = function(nodeIdx) {
    downloadCount++;
    const nextIdx = nodeIdx + 1;
    if (nextIdx == lastAlbum) {
        log(`Download ${firstAlbum}-${lastAlbum} complete: ${downloadCount} done`);
    } else {
        doDownload(nextIdx);
    }
}

// from https://stackoverflow.com/a/61511955/998793
const waitForElm = function(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

if (albumNodes.length) {
    const total = `Albums = ${albumNodes.length}, `;
    firstAlbum = validateAlbumInput(prompt(total + "Set FIRST album to download:", firstAlbum));
    lastAlbum = validateAlbumInput(prompt(total + "Set LAST album to download:", lastAlbum));
    doDownload(firstAlbum - 1);
}