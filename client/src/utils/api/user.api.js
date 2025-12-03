import api from ".";

export default {
    async getMe() {
        const response = await api.get('/users/getme');
        const { user } = response.data;
        return user;
    }
}
