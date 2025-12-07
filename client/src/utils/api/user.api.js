import api from ".";

export default {
    async getMe() {
        try {
            const response = await api.get('/users/getme');
            const { fetchedUser } = response.data;

            if (response.status == 404) {
                return null;
            }
            return fetchedUser;
        } catch (error) {
            console.error(error)
        }
    },

    async updateProfile(formData) {
        try {
            const response = await api.post('/users/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)
        } catch(error) {
            console.error(error)
        }
    }

}
