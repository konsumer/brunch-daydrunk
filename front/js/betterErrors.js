// chrome re-arranged error arguments, this fixes that.

window.onerror = function(errorMsg, url, lineNumber, columnNumber, errorObject) {
    if (console) {
        if (console.error) {
            console.error(errorObject);
        } else {
            console.log(errorObject);
        }
    } else {
        alert(errorObject);
    }
};