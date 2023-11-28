function waitForElm(selector) {
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

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// click first elipsis menu (i.e. first workflow run listed on page)
document.querySelectorAll('.timeline-comment-action')[0].click()

waitForElm('.menu-item-danger').then(menuItem => {
    // click delete in menu
    menuItem.click(); 
    
    waitForElm('.Button--danger').then(confirmBtn => { 
        // click confirm in popup
        confirmBtn.click(); 
    
        waitForElm('.js-flash-close').then(dismissSuccessBar => { 
            // dismiss flash message
            //TODO: not actually dismissing, but is clicking?
            dismissSuccessBar.click(); 
        });
    });
});

