const inputTextValidation = (text, fieldName) => {
    let response;
    const pattern = new RegExp(/^[A-Za-z0-9.,-\s]+$/g);
    if (text.trim() === '') {
        response = {
            validation: false,
            error: 'you need to complete the field ' + fieldName + '.'
        }
        return response;
    } else if (!pattern.test(text)) {
        response = {
            validation: false,
            error: 'Only letters, spaces are allowed. '
        }
        return response;
    } else if (text.trim().length < 2) {
        response = {
            validation: false,
            error: 'Input ' + fieldName + ' is very short.'
        }
        return response;
    } else {
        response = {
            validation: true
        }
        return response;
    }

}
export default inputTextValidation