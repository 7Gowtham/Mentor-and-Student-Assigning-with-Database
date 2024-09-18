export const validateEmail = function(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const validateMobile = function(mobile){
    return /\d{10}/.test(mobile)
}