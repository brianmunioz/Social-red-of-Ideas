const inputPasswordValidation = (text) => {
    let response;
    const haveSpace = Boolean(text.match(/\s/));
    const isUpper = Boolean(text.match(/[A-Z]/))
    const isLower = Boolean(text.match(/[a-z]/));
    const isNumber = Boolean(text.match(/[0-9]/));
    const isSpecialChars = Boolean(text.match(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?¿´¡!#$%&°|`^'¬_]/));
    if (text.trim() === '') {
        response = {
            validation: false,
            error: 'You need to complete the password field.'
        }
        return response;
    } else if (haveSpace) {
        response = {
            validation: false,
            error: 'Spaces are not allowed in password field.'
        }
        return response;
    } else if (!isUpper) {
        response = {
            validation: false,
            error: 'Password field need one upper letter  or more.'
        }
        return response;
    }
    else if (!isLower) {
        response = {
            validation: false,
            error: 'Password field need one lower letter  or more.'
        }
        return response;
    }
    else if (!isNumber) {
        response = {
            validation: false,
            error: 'Input Password need one number or more.'
        }
        return response;
    }
    else if (!isSpecialChars) {
        response = {
            validation: false,
            error: 'Input Password need one special char or more.'
        }
        return response;
    }
    else if (text.length < 10) {
        response = {
            validation: false,
            error: 'Input Password is very short. Your password length need to be greater than 10.'
        }
        return response;
    }
    else {
        response = {
            validation: true
        }
        return response;
    }

}
export default inputPasswordValidation;