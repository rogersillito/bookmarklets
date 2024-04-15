javascript: (function() {
    /* Calculate total profit from eBay sales */
    var validateNumeric = function(n) {
        if (isNaN(parseFloat(n)) || !isFinite(n))
            throw "Amount must be a numeric value, '" + n + "'";
        return n/1;
    };
    try {
        const feeRate = validateNumeric(prompt("Enter seller fee (%)", "10"));
        const salePrice = validateNumeric(prompt("Enter final sale value (£)"));
        const pnpAmount = validateNumeric(prompt("Enter ADVERTISED P+P value (£)"));
        const pnpCost = validateNumeric(prompt("Enter ACTUAL P+P cost (£)"));
        const revenue = salePrice + pnpAmount;
        var sellerFee = revenue * (feeRate / 100);
        var sellerReturn = revenue - sellerFee - pnpCost;
        const msg = `Seller Return = £${sellerReturn.toFixed(2)}\n\nSeller Fee = £${sellerFee.toFixed(2)}\n\nTotal sale revenue = £${revenue.toFixed(2)}`;
        console.log(msg);
        alert(msg);
    }
    catch (e) {
        alert("Error - " + e);
    }
})()
