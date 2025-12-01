<template>
  <div class="md:w-[800px] h-[600px] bg-white shadow-md p-4" v-motion-fade>
    <div class="flex items-center gap-4">
      <router-link
        to="/chat"
        class="bg-slate-300 px-3 py-1.5 border border-slate-400 text-[#29487d] font-bold cursor-pointer flex items-center gap-2 hover:bg-slate-200 hover:translate-y-[-3px] duration-200"
      >
        <ph-arrow-bend-down-left></ph-arrow-bend-down-left>
        Back
      </router-link>
      <h2 class="font-bold text-[#29487d]">edit profile</h2>
    </div>
  </div>
</template>

<script>
import { PhArrowBendDownLeft } from "@phosphor-icons/vue";

export default {
  components: { PhArrowBendDownLeft },
};
</script>
