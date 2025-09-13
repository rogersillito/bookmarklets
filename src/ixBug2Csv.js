/* In a FogBugz list view, this returns a CSV list of cases that are directly included in the currently visible filter */
$.fn.hasInClassList = function(className) {
    var cl = this[0].className.split(/\s+/);
    return $.inArray(className,cl) > -1;
};
var tbodies = $('tbody').filter(function() {
    return this.id.includes("group_");
});
var rows = $(tbodies).children('tr[ixcat]').filter(function() {
    return !$(this).hasInClassList("g-r-context");
});
var s = ""; 
rows.find('.col_1 a').each(function(i,v) {
    s += ($(v).text() + ",");
});
alert(s.substr(0,s.length-1));
