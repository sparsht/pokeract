function isEmailValid(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

function isMobileValid(mobile) {
    return /^[0-9]{10,10}$/.test(mobile);
}

function isPasswordValid(mobile) {
    return /^[A-Z0-9_.]{8,}$/i.test(mobile);
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

function range(start, stop) {
   return Array.from({length: stop - start}, (value, index) => index); 
}

export {isEmailValid, isMobileValid, isPasswordValid, capitalize, range};