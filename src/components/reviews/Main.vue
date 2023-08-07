<template>
  <BaseModal page="review">
    <template #trigger>
      <div class="flex space-x-2">
        <router-link
          v-if="$route.name !== 'Reviews'"
          to="/reviews"
          class="flex items-center px-2 py-2 font-medium text-gray-800"
        >
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-700 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </span>

          <span>{{ $store.state.locale == "ru" ? "Отзывы" : "Reviews" }}</span>
        </router-link>

        <router-link
          v-else
          to="/"
          class="flex items-center px-2 py-2 font-medium text-gray-800"
        >
          <span class="font-medium">
            {{ $store.state.locale == "ru" ? "Меню" : "Menu" }}
          </span>
        </router-link>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "../core/BaseModal";

export default {
  components: {
    BaseModal,
  },
};
</script>
