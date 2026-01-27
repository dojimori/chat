<template>

  <div v-if="data.type == 'chat'">
    <!-- {{ JSON.stringify(data) }} -->
    <div class="flex flex-row flex-wrap gap-4">
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
      { 'text-green-600': data.username == user?.username },
    ]">
      <small class="mr-2">{{
        data.username == user?.username ? "You" : data.username
      }}</small>
      <small class="text-gray-400 font-light">{{
        new Date(data.time).toLocaleTimeString([], { timeStyle: "short" })
      }}</small>
    </p>
  </div>
  <div v-else class="text-center">
    <small class="text-gray-600">{{ data.message }}</small>
  </div>
</template>
<script>
import { emojis } from '@/utils/emojis';
export default {
  props: ['data', 'user'],

  mounted() {
    console.log('user' + JSON.stringify(this.user))
    console.log(this.data)
  },

  methods: {
    renderMessage(raw) {
      let rendered = raw;

      emojis.forEach(({ emoji, path }) => {
        const imgEl = `<img src='${path}' alt='${emoji}' class='message-emoji'/>`;
        rendered = rendered.replaceAll(emoji, imgEl);
      });

      return rendered;
    },
  },
}
</script>

<style scoped>
.pfp {
  max-width: 28px;
  max-height: 28px;
  object-fit: cover;
}
</style>