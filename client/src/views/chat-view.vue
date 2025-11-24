<template>
    <!-- main window -->
    <div class="min-w-[300px] md:w-[620px] bg-white shadow-lg shadow-blue-100 ">
        <!-- chat box -->
        <div v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :duration="400" class="shadow-xl">
            <!-- chat header -->
            <div class="text-center border-b border-gray-300 py-2">
                <small>chat global</small>
            </div>

            <!-- chat-body -->
            <div class="h-[60vh] p-2 flex flex-col gap-3 overflow-y-scroll">
                <div v-motion-slide-bottom v-for="message in messages" class="flex flex-col p-1.5 gap-1">
                    <div class="flex flex-row flex-wrap gap-4">
                        <img src="https://placehold.co/40x40" width="40" class="shadow-2xs" />
                        <span
                            class="flex items-center text-xs bg-blue-50 px-4 py-1.5 shadow-2xs border border-blue-100 ">
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
            <form class="flex gap-2 p-2 bg-blue-50 border-t-2 border-blue-200" @submit.prevent="sendMessage">
                <input v-model="message" placeholder="Type a message..." type="text"
                    class="flex-1 shadow-inner outline-none border border-gray-200 p-2 text-sm bg-gray-50 rounded-sm" />
                <button type="submit" class="text-xs cursor-pointer bg-gray-200 p-2 rounded-sm">
                    Send
                </button>
            </form>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue'
import { socket } from '../utils/socket';

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