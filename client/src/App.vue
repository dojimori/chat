<template>
  <!-- main window -->
  <div class="min-w-[300px] md:w-[620px] bg-white shadow-lg shadow-blue-100 ">
    <!-- chat box -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="400"
      class="shadow-xl"
    >
      <!-- chat header -->
      <div class="text-center border-b border-gray-300 py-2">
        <small>chat global</small>
      </div>

      <!-- chat-body -->
      <div class="h-[60vh] p-2 flex flex-col gap-3 overflow-y-scroll">
        <div
          v-motion-slide-bottom
          v-for="message in messages"
          class="flex flex-col p-1.5 gap-1"
        >
          <div class="flex flex-row flex-wrap gap-4">
            <img
              src="https://placehold.co/40x40"
              width="40"
              class="shadow-2xs"
            />
            <span
              class="flex items-center text-xs bg-blue-50 px-4 py-1.5 shadow-2xs border border-blue-100 "
            >
              {{ message }}
            </span>
          </div>
          <p class="font-bold text-blue-800">
            doji
            <span class="text-gray-400 font-normal">8:30 AM</span>
          </p>
        </div>
      </div>

      <!-- chat actions -->
      <form
        class="flex gap-2 p-2 bg-blue-50 border-t-2 border-blue-200"
        @submit.prevent="sendMessage"
      >
        <input
          v-model="message"
          placeholder="Type a message..."
          type="text"
          class="flex-1 shadow-inner outline-none border border-gray-200 p-2 text-sm bg-gray-50 rounded-sm"
        />
        <button
          type="submit"
          class="text-xs cursor-pointer bg-gray-200 p-2 rounded-sm"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<style>
body {
  font-family: Tahoma, Verdana, "Helvetica Neue", Arial, sans-serif;
  background-color: rgb(233, 234, 237);
  background-image: repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 0, 0, 0.016) 2px, rgba(0, 0, 0, 0.016) 4px),
    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.016) 2px, rgba(0, 0, 0, 0.016) 4px),
    repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255, 255, 255, 0.024) 3px, rgba(255, 255, 255, 0.024) 6px),
    linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(200, 200, 200, 0.15) 50%, rgba(255, 255, 255, 0.2) 100%);
  background-size: 4px 4px, 4px 4px, 6px 6px, 100% 100%;
  color: rgb(29, 33, 41);
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  font-size: 12px;
  min-height: 100vh;
  margin: 0;
  /* padding: 20px; */
}
</style>



<script>
import { ref } from 'vue'
import { socket } from './utils/socket';

export default {
  data() {
    return {
      messages: [],
      message: ''
    }
  },
  methods: {
    sendMessage() {
      // Replace to communicate with an API later 
      socket.emit('chat:message', this.message);
      // this.messages.push(this.message)
      this.message = ''
    }
  },
  mounted() {
    socket.on("chat:message", (data) => {
      this.messages.push(data)
    })
  }
}

</script>