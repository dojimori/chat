<template>
  <main class="flex flex-col gap-0 border border-gray-400 w-full sm:w-2xl md:w-3xl lg:w-7xl min-h-[844px]">
    <header-component></header-component>
    <div class="flex-1 flex flex-col justify-center">
      <!-- <user-information></user-information> -->

      <!-- user profile -->

      <div class="p-6 bg-gray-50 border-b border-gray-400">
        <div class="flex flex-row gap-2 items-center">
          <img :src="user?.profile && user.profile.profilePicture
            ? `http://localhost:8080${user.profile.profilePicture}`
            : '/def_pfp_6.jpg'
            " class="pfp border-2 border-gray-400 w-[50px]" />
          <div class="flex flex-col">
            <h4 class="font-bold">{{ user?.username }}</h4>
            <span class="text-gray-600" style="font-size: 10px;">joined</span>
            <span class="text-xs text-gray-500">{{
              new Date(user?.createdAt).toLocaleDateString()
            }}</span>
          </div>
        </div>
      </div>


      <div class="flex-1 bg-white">
        <div class="p-2 flex-1 flex flex-col gap-3 min-h-[400px] lg:min-h-[660px]">
          <div class="flex flex-col gap-4 bg-gray-100 border border-gray-300 rounded-sm p-4">
            <textarea name="" id=""
              class="bg-white p-4 outline-none border border-gray-300 shadow-inner focus:border-blue-500 duration-100"
              placeholder="write something cool!" type="text" v-model="postDescription"></textarea>
            <div class="flex">
              <button @click="submitPost" class="post-btn text-white py-1.5 px-6 border border-gray-400 cursor-pointer">
                post
              </button>
            </div>
          </div>
          <!-- posts -->
          <div class="flex flex-col gap-15" v-for="post in posts">
            <div class="bg-gray-100 border-2 border-gray-200 p-4">
              <!-- header -->
              <div class="flex flex-row gap-4">
                <img :src="user?.profile && user.profile.profilePicture
                  ? `http://localhost:8080${user.profile.profilePicture}`
                  : '/def_pfp_6.jpg'
                  " class="pfp border-2 border-gray-400 w-[50px]" />
                <div class="flex flex-col">
                  <span class="font-bold">{{ user?.username }}</span>
                  <span class="text-gray-500">A few hours ago</span>
                </div>
              </div>

              <!-- post body -->
              <div class="mt-4">
                <p>{{ post.description }}</p>
              </div>
              <!-- end post body -->

              <!-- footer -->
              <div class="mt-5">
                <button
                  class="mr-2 px-4 py-2 bg-gray-300 border border-gray-400 shadow-sm hover:-translate-y-1 duration-200 cursor-pointer">
                  <ph-thumbs-up size="18"></ph-thumbs-up>
                </button>
                <button
                  class="mr-2 px-4 py-2 bg-gray-300 border border-gray-400 shadow-sm hover:-translate-y-1 duration-200 cursor-pointer">
                  <ph-thumbs-down size="18"></ph-thumbs-down>
                </button>
              </div>
              <!-- end footer -->
            </div>
          </div>
          <div class="pagination">
            <button :disabled="page === 1" @click="page--">
              Prev
            </button>

            <span>Page {{ page }} / {{ lastPage }}</span>

            <button :disabled="page === lastPage" @click="page++">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.post-btn {
  background: linear-gradient(to bottom, #4e69a2, #3b5998);
  transition: 0.2s ease all;
}

.post-btn:hover {
  opacity: 0.8;
}
</style>

<script lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserInformation from "@/components/UserInformationAside.vue";
import { PhThumbsUp, PhThumbsDown } from "@phosphor-icons/vue";
import api from "@/utils/api";
import { useStore } from "@/store";


interface Post {
  id: number;
  title?: string;
  description: string;
}

interface Profile {
  profilePicture: string;
}

interface User {
  id: number;
  username: string;
  createdAt: string;
  profile: Profile;
}


export default {
  components: {
    HeaderComponent,
    UserInformation,
    PhThumbsUp,
    PhThumbsDown,
  },

  data() {
    return {
      user: null as User,
      postDescription: '',
      posts: [] as Post[],
      limit: 5,
      lastPage: 1,
      page: 1
    };
  },

  methods: {
    async submitPost() {
      try {
        const response = await api.post('/posts', { description: this.postDescription })
        console.log(response)

        await this.getPosts();
      } catch (error) {
        console.log(error)
      }
    },

    async fetchPosts() {
      try {
        const response = await api.get('/posts', {
          params: {
            page: this.page,
            limit: this.limit
          }
        })

        this.posts = response.data.posts
        this.lastPage = response.data.meta.lastPage

      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {
    store() {
      return useStore();
    },
  },

  watch: {
    async page() {
      await this.fetchPosts();
    }
  },

  async mounted() {
    this.user = this.store.getUser;
    await this.fetchPosts()
  },
};
</script>
