<template>
  <Transition>
    <div
      v-if="showEmoji"
      class="absolute bottom-full right-30 z-10 mb-2 bg-gray-100 rounded-xs border border-gray-200 p-4"
    >
      <img src="/assets/emojis/bento-box.gif" alt="" class="emoji" />
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  scale: 1.1;
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 0;
}
.emoji:hover {
  scale: 1.2;
}
.emoji {
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>

<script>
export default {
  props: {
    showEmoji: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
