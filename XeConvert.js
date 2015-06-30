javascript: (function() {
    /* Do a currency conversion at xe.com based on validated user input */
    var validateCurrency = function(c) {
        var currencies = ["USD","GBP","EUR"];
        c = c.toUpperCase();
        if (currencies.indexOf(c) === -1)
            throw "Unexpected currency,  '" + c + "'";
        return c
    };
    var validateNumeric = function(n) {
        if (isNaN(parseFloat(n)) || !isFinite(n))
            throw "Amount must be a numeric value, '" + n + "'";
        return n/1;
    };
    try {
        var val = validateNumeric(prompt("Enter amount to convert"));
        var fromC = validateCurrency(prompt("Enter FROM currency", "USD"));
        var toC = validateCurrency(prompt("Enter TO currency", "GBP"));
        window.location = "http://www.xe.com/currencyconverter/convert/?Amount=" + val + "&From=" + fromC + "&To=" + toC;
    }
    catch (e) {
        alert("Error - " + e);
    }
})()
