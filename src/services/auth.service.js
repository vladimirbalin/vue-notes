
const authService = {
    isLoggedIn() {
        return !!localStorage.getItem('api-user');
        // return false;
    }
}

export default authService;