javascript:(function() {
    /* This ticks all checkboxes within the "Time & Expenses Entry" calendar view */
    // TODO: get it working: there seems to be some issue where querySelectorAll is not seeing the full dom?
    alert('elements = '+ window.document.querySelectorAll('*').length);
    window.document.querySelectorAll('.actualise-time-checkbox').forEach(ckbx => { ckbx.checked = !ckbx.checked; console.log(ckbx); });
})()