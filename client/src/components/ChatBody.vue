<template>
  <div
    class="p-2 flex-1 flex flex-col gap-3 min-h-[400px] max-h-[400px] lg:min-h-[660px] lg:max-h-[660px] overflow-y-scroll"
    ref="chatBox">
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="800" v-for="(data, index) in messages"
      :key="index" class="flex flex-col p-1.5 gap-1">
      <!-- chat message -->
      <div v-if="data.type == 'chat'">
        <div class="flex flex-row flex-wrap gap-4">
          <!-- pfp -->
          <img :src="data.profilePicture
            ? `http://localhost:8080${data.profilePicture}`
            : '/def_pfp_6.jpg'
            " class="pfp border-2 border-gray-400" />
          <span
            class="flex break-all items-center text-xs bg-blue-50 border border-blue-100 px-2.5 py-0.5 cursor-pointer message-box max-w-[300px]"
            v-html="renderMessage(data.message)">
          </span>
        </div>
        <p :class="[
          'font-bold text-[#29487d] mt-2',
          { 'text-green-600': data.userId == user.id },
        ]">
          <small class="mr-2">{{
            data.userId == user.id ? "You" : data.username
          }}</small>
          <small class="text-gray-400 font-light">{{
            new Date(data.time).toLocaleTimeString([], { timeStyle: "short" })
          }}</small>
        </p>
      </div>
      <!-- joined message -->
      <div v-else class="text-center">
        <small class="text-gray-600">{{ data.message }}</small>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['messages'],
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const el = this.$refs.chatBox;
        console.log(el.scrollHeight);
        if (el) el.scrollTop = el.scrollHeight;
      });
    },
  }

}
</script>
<style lang="">

</style>