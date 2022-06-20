export const validateLoginForm = ({email, password}) => {
    return isEmailValid(email) && isPasswordValid(password);
}

export const validateRegisterForm = ({email,username,password}) => {
    return isEmailValid(email) && isUsernameValid(username) && isPasswordValid(password);
}

export const isEmailValid = (email) => {
    const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailPattern.test(email);
}

const isUsernameValid = (username) => {
    return username.length > 2 && username.length <= 12;
}

const isPasswordValid = (password) => {
    return password.length > 6 && password.length < 12;
}