/* pretty print a JSON string to the browser window */
var json = window.prompt('Paste JSON string in here:');
document.write('<pre>'+JSON.stringify(JSON.parse(json), null, 2)+'</pre>')