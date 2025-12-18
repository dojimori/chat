<template>
  <!-- header -->
  <div class="header w-full py-2.5 px-4 flex md:flex-row flex-col justify-between items-center">
    <h1 class="text-white font-bold">> Open Line</h1>

    <div>
      <router-link to="/chat" class="header-btn hover:translate-y-[-1.5px] cursor-pointer">
        <ph-globe></ph-globe>
        open line
      </router-link>

      <router-link :to="{ name: 'UserProfile', params: { 'username': 'doujin22' } }"
        class="header-btn hover:translate-y-[-1.5px] cursor-pointer">
        <!-- <ph-user></ph-user> -->
        <ph-app-window></ph-app-window>
        timeline
      </router-link>

      <router-link to="/profile/edit" class="header-btn hover:translate-y-[-1.5px] cursor-pointer">
        <ph-pencil-simple></ph-pencil-simple>
        edit profile
      </router-link>

      <button class="header-btn hover:translate-y-[-1.5px] cursor-pointer" @click="logout">
        <ph-sign-out></ph-sign-out>
        Logout
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-btn {
  font-size: 11px;
  color: rgb(255, 255, 255);
  margin-left: 0px;
  margin-right: 4px;
  font-weight: bold;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  text-shadow: rgba(0, 0, 0, 0.3) 0px -1px 0px;
  display: inline-flex;
  align-items: center;
  transition: 0.2s;
  padding: 5px 12px;
  background: linear-gradient(rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.05) 100%);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.2);
  border-image: initial;
  gap: 6px;
  white-space: nowrap;
}

.header-btn:hover {
  background: linear-gradient(to bottom, #728ac1, #627aad);
}
</style>

<script>
import { PhSignOut, PhPencilSimple, PhGlobe, PhUser, PhAppWindow } from "@phosphor-icons/vue";
import authApi from "@/utils/api/auth.api";
import { socket } from "@/utils/socket";
import { useStore } from "@/store";

export default {
  components: {
    PhPencilSimple,
    PhSignOut,
    PhGlobe,
    PhUser,
    PhAppWindow
  },

  // props: {
  //   logout: {
  //     type: Function,
  //     required: true,
  //   },
  // },

  computed: {
    store() {
      return useStore();
    },
  },

  methods: {
    async logout() {
      try {
        await authApi.logout();
        // this.store.isAuthenticated = false;
        // this.store.user = null;
        this.store.clearUser();
        this.$router.push("/");
        socket.emit("left");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
