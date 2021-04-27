<template>
  <div id="app">
    <div>
      <nav class="sticky top-0 bg-white">
        <div class="flex items-center px-4 mx-auto border-b max-w-7xl">
          <div class="relative w-full rounded-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img class="w-16 h-16" src="./assets/logo.svg" alt="" />
                <!-- <div>
                  <h6 class="text-sm font-medium">
                    <span class="font-bold text-primary">E1 -</span> (71)
                    233-15-02
                  </h6>
                  <h6 class="text-sm font-medium">
                    <span class="font-bold text-primary">E2 -</span> (95)
                    177-09-93
                  </h6>
                </div> -->
              </div>
              <div class="flex space-x-2">
                <BaseModal>
                  <template #trigger="{ open }">
                    <button
                      @click="open"
                      class="flex px-2 py-1 font-medium text-gray-800 rounded-md"
                    >
                      <span v-if="$store.state.locale == 'ru'">О нас</span>
                      <span v-else>About us</span>
                    </button>
                  </template>
                  <template #default="{ close }">
                    <div class="py-4">
                      <h3 class="px-4 mb-2 text-lg font-bold">
                        Контактные данные
                      </h3>
                      <hr />
                      <div class="px-4 mt-4 mb-2 bg-white">
                        <h4 class="font-medium">Efendi Restaurant - 1</h4>
                        <div class="flex items-center mt-1 mb-2 text-gray-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mr-2 text-primary"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                            />
                          </svg>
                          (71) 233-15-02
                        </div>
                      </div>
                      <div id="map" style="width: 450px; height: 270px"></div>
                      <div class="px-4 mt-4 mb-2 bg-white">
                        <h4 class="font-medium">Efendi Restaurant - 2</h4>
                        <div class="flex items-center mt-1 mb-2 text-gray-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mr-2 text-primary"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                            />
                          </svg>
                          (95) 177-09-93
                        </div>
                      </div>
                      <div id="map-2" style="width: 450px; height: 270px"></div>
                      <div class="mt-4 text-center">
                        Сделано с любовью
                        <a
                          href="http://qrmenus.uz/"
                          target="_blank"
                          class="font-bold text-primary"
                          >qrmenus.uz</a
                        >
                      </div>
                      <button @click="close" class="absolute top-3 right-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </template>
                </BaseModal>
                <select
                  :value="$store.state.locale"
                  name="language"
                  class="block py-1 pl-4 text-base bg-gray-100 border-none rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  @change="changeLocale"
                >
                  <option
                    v-for="lang in langOptions"
                    :key="lang.text"
                    :value="lang.value"
                  >
                    {{ lang.text }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <scrollactive
            ref="scrollContainer"
            active-class="active"
            style="scroll-behavior: smooth; transition-duration: 0.5s"
            :offset="120"
            class="flex items-center px-4 py-2 mx-auto space-x-2 overflow-x-auto max-w-7xl my-nav"
            @itemchanged="onItemChanged"
          >
            <a
              :ref="`link-${key}`"
              v-for="(item, key) in categories"
              :key="item.name_ru"
              :href="`#${key}`"
              class="flex-shrink-0 px-3 py-2 font-medium leading-4 rounded-full scrollactive-item"
            >
              {{ item[$options.filters.locale("name")] }}
            </a>
          </scrollactive>
        </div>
      </nav>
      <div
        v-for="(category, key) in categories"
        :key="key"
        :id="key"
        class="px-4 pt-3 pb-4 mx-auto mb-4 max-w-7xl"
      >
        <h2 class="mb-3 text-xl font-black text-left">
          {{ category[$options.filters.locale("name")] }}
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8"
        >
          <FoodCard
            v-for="(product, $productIndex) in category.products"
            :key="`product-${$productIndex}`"
            :category="key"
            :id="$productIndex + 1"
            :product="product"
          />
        </div>
      </div>
    </div>
    <div class="py-4 text-center border-t">
      Сделано с любовью
      <a
        href="http://qrmenus.uz/"
        target="_blank"
        class="font-bold text-primary"
        >qrmenus.uz</a
      >
    </div>
  </div>
</template>
<script>
import FoodCard from "./components/FoodCard.vue";
import BaseModal from "./components/BaseModal.vue";
// import FavouriteItem from "./components/FavouriteItem.vue";
import { mapState } from "vuex";

export default {
  components: {
    FoodCard,
    BaseModal,
    // FavouriteItem,
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories,
      locale: (state) => state.locale,
    }),
    getField() {
      return (field) => {
        const obj = this.collection[this.$options.filters.locale(field)];
        return obj && obj.toLowerCase();
      };
    },
  },
  data() {
    return {
      searchQuery: "",
      langOptions: [
        { text: "Tr/Ru", value: "ru" },
        { text: "Tr/En", value: "en" },
      ],
    };
  },
  methods: {
    changeLocale(event) {
      this.$store.commit("setLocale", event.target.value);
    },
    onItemChanged(e, curr, lastActive) {
      if (e) {
        const categories = Object.keys(this.categories)
          .map((key, index) => ({
            [key]: index,
          }))
          .reduce((prev, curr) => {
            return { ...prev, ...curr };
          }, {});

        if (curr && lastActive) {
          const currCategory = curr.href.split("#")[1];
          const lastActiveCategory = lastActive.href.split("#")[1];

          if (categories[currCategory] > categories[lastActiveCategory]) {
            this.$refs["scrollContainer"].$el.scrollLeft += curr.offsetWidth;
          } else {
            this.$refs["scrollContainer"].$el.scrollLeft -= curr.offsetWidth;
          }
        }
      }
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   const firstLinkArr = this.$refs[
    //     `link-${Object.keys(this.categories)[0]}`
    //   ];
    //   firstLinkArr[0].click();
    // });
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
.active {
  @apply bg-primary;
  @apply text-white;
}
</style>
