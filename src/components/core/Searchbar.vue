<template>
  <div
    class="flex items-center px-4 mx-auto space-x-2 overflow-x-auto max-w-7xl"
  >
    <div class="flex-1">
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="
            absolute
            inset-y-0
            left-0
            flex
            items-center
            pl-3
            pointer-events-none
          "
        >
          <!-- Heroicon name: solid/search -->
          <svg
            class="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          :value="searchQuery"
          id="search"
          v-if="$store.state.locale == 'ru'"
          name="search"
          class="
            block
            w-full
            py-2
            pl-10
            pr-3
            placeholder-gray-500
            bg-white
            border border-gray-300
            rounded-md
            focus:outline-none
            focus:text-gray-900
            focus:placeholder-gray-400
            focus:ring-1
            focus:ring-yellow-500
            focus:border-yellow-500
          "
          placeholder="Поиск"
          type="search"
          @input="(event) => $emit('update:searchQuery', event.target.value)"
        />
        <input
          v-else
          :value="searchQuery"
          id="search"
          name="search"
          class="
            block
            w-full
            py-2
            pl-10
            pr-3
            placeholder-gray-500
            bg-white
            border border-gray-300
            rounded-md
            focus:outline-none
            focus:text-gray-900
            focus:placeholder-gray-400
            focus:ring-1
            focus:ring-yellow-500
            focus:border-yellow-500
          "
          placeholder="Search"
          type="search"
          @input="(event) => $emit('update:searchQuery', event.target.value)"
        />
      </div>
    </div>
    <button
      @click="$store.state.verticalCard = !$store.state.verticalCard"
      type="button"
      class="p-1 bg-yellow-400 rounded-lg focus:outline-none"
    >
      <svg
        v-if="$store.state.verticalCard"
        xmlns="http://www.w3.org/2000/svg"
        class="text-white h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="text-white h-7 w-7"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      verticalCard: (state) => state.verticalCard,
    }),
  },
};
</script>

<style></style>
