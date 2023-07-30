<template>
  <div class="flex items-center px-4 mx-auto border-b max-w-7xl">
    <div class="relative w-full rounded-md">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img class="w-16 h-16" :src="logo" alt="no logo" />
        </div>
        <div class="flex items-center space-x-2">
          <Reviews />

          <AboutUs />

          <LanguageDropdown :items="langOptions">
            <template #trigger="{ click }">
              <button
                type="button"
                class="
                  inline-flex
                  justify-center
                  w-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-700
                  bg-gray-200
                  rounded-md
                  shadow-sm
                  hover:bg-gray-100
                  focus:outline-none
                "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                @click.stop="click"
              >
                {{ langOptions.find((item) => item.value === locale).text }}
                <!-- Heroicon name: solid/chevron-down -->
                <svg
                  class="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </template>
          </LanguageDropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from "./LanguageDropdown";
import AboutUs from "./AboutUs";
import Reviews from "../reviews/Main.vue";
import { mapState } from "vuex";

export default {
  components: {
    LanguageDropdown,
    AboutUs,
    Reviews,
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      logo: (state) => state.remoteData?.logo,
      languages: (state) => state.remoteData?.languages,
    }),

    langOptions(){
      return this.languages.map(item => (
          {  
            text: item.charAt(0).toUpperCase() + item.slice(1),
            value: item
          }
        )
      )
    }

  },
};
</script>

<style></style>
