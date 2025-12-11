<template>
  <!-- Users List Section -->
  <div v-motion-slide-left class="bg-white shadow-lg lg:w-[170px]">
    <div>
      <h2 class="header p-2 font-bold text-white text-center">Active Users</h2>
      <div class="flex flex-col">
        <!-- TODO: replace with your actual user list -->

        <div v-for="user in activeUsers">
          <span>{{ user.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: linear-gradient(to bottom, #4e69a2, #3b5998);
}

.pfp {
  max-width: 28px;
  max-height: 28px;
  object-fit: cover;
}
</style>

<script>
export default {
  props: {
    activeUsers: {
      type: Array,
      required: true,
    },
  },
};
</script>
