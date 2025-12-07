<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="loading"
      class="absolute z-100 top-0 left-0 w-screen h-screen bg-black/60 flex gap-2 flex-col items-center justify-center"
    >
      <vue-spinner-sync color="white"></vue-spinner-sync>
      <small class="text-white">Please wait...</small>
    </div>
  </Transition>
</template>

<script>
import { VueSpinnerSync } from "vue3-spinners";
import { Transition } from "vue";
export default {
  components: {
    VueSpinnerSync,
    Transition,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
