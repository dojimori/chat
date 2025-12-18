<template>
    <main class="flex flex-col gap-0 border border-gray-400 w-full sm:w-2xl md:w-3xl lg:w-7xl min-h-[400px]">
        <header-component></header-component>
        <div class="flex-1 flex flex-col lg:flex-row justify-center">
            <user-information></user-information>
            <div class="flex-1 bg-white">
                <div
                    class="p-2 flex-1 flex flex-col gap-3 min-h-[400px] max-h-[400px] lg:min-h-[660px] lg:max-h-[660px] overflow-y-scroll">


                    <!-- <input type="text"> -->

                    <!-- <p class="font-bold">Post something here lmao</p> -->

                    <div class="flex flex-col gap-4 bg-gray-100 border border-gray-300 rounded-sm p-4">
                        <!-- <input placeholder="write something cool!" -->
                        <textarea name="" id=""
                            class="bg-white p-4 outline-none border  border-gray-300 shadow-inner focus:border-blue-500 duration-100"
                            placeholder="write something cool!" type="text"></textarea>
                        <div class="flex">
                            <button class="bg-blue-800 text-white py-2 px-6 rounded-sm">post</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </main>
</template>

<script>
import HeaderComponent from "@/components/header-component.vue";
import { useStore } from "@/store";
import UserInformation from "@/components/user-information.vue";

export default {
    components: {
        HeaderComponent,
        UserInformation,
    },

    data() {
        return {
            user: null,
        };
    },

    computed: {
        store() {
            return useStore();
        },
    },

    mounted() {
        this.user = this.store.getUser;
    },
};
</script>
