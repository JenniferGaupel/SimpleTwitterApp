export const authenticationService = {
    logout,
    isUserLoggedIn,
    getLoggedInUser,
    getJwt
};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.clear();
}

function isUserLoggedIn() {
    let user = localStorage.getItem('username');
    if(user) {
        return true;
    } else {
        return false;
    }
}

function getLoggedInUser() {
    let user = localStorage.getItem('username');
    return user;
}

function getJwt() {
    let jwt = localStorage.getItem('jwt');
    return jwt;
}