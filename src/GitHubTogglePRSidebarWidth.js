// Initialize global vars if not existent
if (typeof document.originalSidebarWidth === 'undefined') {
    document.originalSidebarWidth = '*';
}
if (typeof document.isSidebarDisabled === 'undefined') {
    document.isSidebarDisabled = false; // Initialize if it doesn't exist
}

const layoutClassName = '.Layout';
const widthVar = "--Layout-sidebar-width";
const layout = document.querySelector(layoutClassName);

if (layout) {
    if (document.isSidebarDisabled) {
        // DO ENABLE ORIGINAL WIDTH
        layout.style.setProperty(widthVar, document.originalSidebarWidth); // Reapply the original width
        document.isSidebarDisabled = false; // Set to enabled
        console.log(widthVar + ' ENABLED');
    } else {
        // DO REMOVE WIDTH
        document.originalSidebarWidth = layout.style.getPropertyValue(widthVar); // Store the current width
        layout.style.setProperty(widthVar, "*"); // Disable width property
        document.isSidebarDisabled = true; // Set to disabled
        console.log(widthVar + ' DISABLED');
    }
} else {
    console.error(layoutClassName + ' element not found');
}
