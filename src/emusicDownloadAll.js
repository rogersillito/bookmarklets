const dotMenuNodes = document.querySelectorAll('.grid__more__option__dots');
const menuWaitMs = 750;
const downloadWaitMs = 90 * 1000; // 90s

if (dotMenuNodes.length) {
    doDownload(0);
}

function doDownload(nodeIdx) {
    dotMenuNodes[nodeIdx].click();
    setTimeout(() => {
        const downloadLink = document.querySelectorAll('.more__options__panel')[0].children[1];
        console.log(downloadLink);
        downloadLink.click();
        setTimeout(() => {
            const nextIdx = nodeIdx + 1;
            if (nextIdx == dotMenuNodes.length) {
                console.log(`Download complete: ${dotMenuNodes.length} done`);
            } else {
                doDownload(nextIdx);
            }
        }, downloadWaitMs);
    }, menuWaitMs);
}