<template>
  <!-- user profile section -->
  <div class="bg-white border border-gray-200 p-4 shadow-lg md:w-[250px] w-full">
    <div>
      <h2 class="font-bold text-[#29487d] mb-4 border-b border-gray-300 pb-2">Me</h2>
      <div class="flex flex-col gap-2"></div>
    </div>

    <div v-if="user">
      <img src="/def_pfp_6.jpg" class="pfp" />

      <div>
        {{ user.username }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.pfp {
  width: 75px;
}
</style>

<script>
import { getMe } from "@/utils/user";

export default {
  data() {
    return {
      user: null,
    };
  },

  async mounted() {
    this.user = await getMe();
  },
};
</script>
