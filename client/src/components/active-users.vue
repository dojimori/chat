<template>
  <!-- Users List Section -->
  <div class="bg-white border border-gray-200 shadow-lg md:w-[250px] w-full">
    <div>
      <h2 class="p-4 font-bold text-[#29487d] mb-4 border-b border-gray-300 pb-2">
        Active Users
      </h2>
      <div class="flex flex-col">
        <!-- TODO: replace with your actual user list -->
        <div class="flex items-center cursor-pointer gap-2 p-2">
          <!-- <div class="w-8 h-8 bg-blue-200 rounded-full"></div> -->
          <img src="/def_pfp_2.jpg" class="pfp" />
          <span class="text-xs">nko</span>

          <span class="w-2 h-2 rounded-full bg-green-600"></span>
        </div>
        <div class="flex items-center gap-2 cursor-pointer p-2">
          <img src="/def_pfp_3.jpg" class="pfp" />
          <span class="text-xs">yohiori</span>
          <span class="w-2 h-2 rounded-full bg-green-600"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pfp {
  max-width: 28px;
  max-height: 28px;
  object-fit: cover;
}
</style>
