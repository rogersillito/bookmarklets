const addOpenInNewTabBehaviour = function(w,h) {
    // Find all images on the page
    const images = document.querySelectorAll('img');

    if (images.length > 0) {
        console.log('Adding "on click open in new tab" behaviour for images:');
    }
    // Loop through each image and add the onClick event if dimensions meet criteria
    images.forEach(img => {
      if (img.naturalWidth >= h && img.naturalHeight >= w) {
        img.style.cursor = 'pointer';
        img.style.border = '2px solid yellow';
        img.alt = 'Click to view image in new tab';
        img.addEventListener('click', () => {
          window.open(img.src, '_blank'); // Open image URL in a new tab when clicked
        });
        console.log(img.src);
      }
    });    
};

/*
// Select all <a> elements on the page
const links = document.querySelectorAll('a');

// Add an event listener to prevent the default action
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent the default link behavior
  });
});
*/

const removeExistingClickHandling = function() {
    // Get all elements in the document
    const allElements = document.querySelectorAll('*');

    // Loop through each element and remove its onclick handler
    allElements.forEach(element => {
      if (element.onclick) {
        element.onclick = null; // Remove inline onclick attribute
      }
    });
    
    // Select all <a> elements on the page
    const links = document.querySelectorAll('a');

    // Add an event listener to each link
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        if (event.target === link) {  // Prevent only if the link itself is clicked
          event.preventDefault();     // Stop the link's behavior
        }
      });
    });
}

const validateNumeric = function(n) {
    if (isNaN(parseFloat(n)) || !isFinite(n) || !Number.isInteger(n/1))
        throw "You must enter an integer value: '" + n + "'";
    return n/1;
};

try {
    var width = validateNumeric(prompt("Enter minimum image width", 300));
    var height = validateNumeric(prompt("Enter minimum image height", 300));
    removeExistingClickHandling();
    addOpenInNewTabBehaviour(width, height);
}
catch (e) {
    alert("Error - " + e);
}

