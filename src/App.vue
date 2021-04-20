<template>
  <div id="app">
    <div>
      <nav class="sticky top-0 bg-white">
        <div class="flex items-center px-4 border-b">
          <div class="relative w-full rounded-md">
            <div class="flex items-center justify-between">
              <img class="w-16 h-16" src="./assets/logo.svg" alt="" />
              <div>
                <select
                  id="location"
                  name="location"
                  class="block py-1 pl-4 text-base bg-gray-100 border-none rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option selected>Tr/Ru</option>
                  <option>Tr/En</option>
                </select>
              </div>
            </div>
          </div>
          <SlideOver>
            <template #trigger="{ onClick }">
              <div class="ml-3" @click.stop="onClick">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ED2024"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </template>
            <template #default>
              <div
                class="grid grid-cols-2 px-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8"
              >
                <FoodCard v-for="item in 10" :key="item" />
              </div>
            </template>
          </SlideOver>
        </div>
        <div class="flex px-4 py-2 space-x-2 overflow-x-auto">
          <router-link
            to="category"
            class="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:text-gray-700"
          >
            Perviy
          </router-link>
          <router-link
            active-class="text-gray-600 bg-gray-100"
            v-for="item in 6"
            :key="item"
            to="category"
            class="px-3 py-2 text-sm font-medium text-gray-500 rounded-full hover:text-gray-700"
          >
            Billing
          </router-link>
        </div>
      </nav>
      <div
        class="grid grid-cols-2 px-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8"
      >
        <FoodCard v-for="item in 10" :key="item" />
      </div>
    </div>
  </div>
</template>
<script>
import FoodCard from "./components/FoodCard.vue";
import SlideOver from "./components/SlideOver.vue";
export default {
  components: {
    FoodCard,
    SlideOver,
  },
  computed: {
    filtered() {
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
