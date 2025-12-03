import api from ".";

export default {
    async login(username, password) {
        const response = api.post("/auth/login", {
            username, 
            password
        });

        return response;
    },

    async logout() {
        api.post("/auth/logout", {
            username, 
            password
        });
    }
}