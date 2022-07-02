import jwt_decode from "jwt-decode";

export const logout = () => {
    localStorage.clear();
    window.location.pathname = '/login'
}

export const isTokenValid = (userDetails) => {
    let token = JSON.parse(userDetails).token;
    return validateToken(token)
}

const validateToken = (token) => {
    let result = false;

    try {
        let decodedToken = jwt_decode(token);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
        } else {
            console.log("Valid token");
            result = true;
        }
    } catch (e) {
    }

    return result
}
