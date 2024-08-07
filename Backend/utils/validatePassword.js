function validatePassword(password){
    const specialCharacters = /[@#$%^&*(),.?":{}|<>]/;
    const uppercaseLetter = /[A-Z]/;

    if(!specialCharacters.test(password)){
        throw new Error("Password must contain at least one special character.");
    }

    if(!uppercaseLetter.test(password)){
        throw new Error("Password must contain at least one uppercase letter");
    }
}
module.exports = validatePassword;