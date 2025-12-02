<template>
  <div class="md:w-[800px] h-[600px] bg-white shadow-md p-4" v-motion-fade>
    <div class="flex items-center gap-4 border-b pb-2 border-gray-400">
      <router-link
        to="/chat"
        class="bg-slate-300 px-3 py-1.5 border border-slate-400 text-[#29487d] font-bold cursor-pointer flex items-center gap-2 hover:bg-slate-200 hover:translate-y-[-2px] duration-200"
      >
        <ph-arrow-bend-down-left></ph-arrow-bend-down-left>
        Back
      </router-link>

      <button
        style="background: linear-gradient(rgb(98, 122, 173), rgb(89, 114, 168))"
        class="bg-[#29487d] text-white px-3 py-1.5 border border-slate-400 font-bold cursor-pointer flex items-center gap-2 hover:translate-y-[-2px] duration-200"
      >
        <ph-floppy-disk></ph-floppy-disk>
        Save
      </button>

      <h2 class="font-bold text-[#29487d]">edit profile</h2>
    </div>

    <!-- form -->
    <div class="flex flex-col justify-center">
      <div class="w-full flex justify-between gap-8">
        <img src="/def_pfp_1.jpg" alt="" class="object-cover w-[100px]" />

        <div class="flex-1 flex flex-col gap-2 p-2">
          <input
            type="file"
            class="bg-gray-100 p-2 border border-gray-400 w-full cursor-pointer hover:translate-y-[-3px] hover:shadow-md duration-200"
          />
          <div>
            <label for="username" class="block font-bold">username</label>
            <input
              type="text"
              id="username"
              :value="user ? user.username : ''"
              class="border w-full border-gray-400 outline-none p-2 shadow-inner focus:translate-y-[-3px] focus:border-blue-900 focus:shadow-none duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PhArrowBendDownLeft, PhFloppyDisk } from "@phosphor-icons/vue";
import { getMe } from "@/utils/user";
export default {
  components: { PhArrowBendDownLeft, PhFloppyDisk },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async fetchUser() {
      this.user = await getMe();
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>
