import api from ".";

export default {
  async getMe() {
    const response = await api.get("/users");
    const { user } = response.data;
    return user;
  },

  async updateProfile(credentials) {
    const response = await api.post("/users/profile", credentials, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },
};
