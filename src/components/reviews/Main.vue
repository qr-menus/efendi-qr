<template>
  <BaseModal page="review">
    <template #trigger="{ open }">
      <div class="flex space-x-2">
        <button
          @click="open"
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
              /></svg
          ></span>

          <span>{{ $store.state.locale == "ru" ? "Отзывы" : "Reviews" }}</span>
        </button>
      </div>
    </template>

    <template #default="{ close }">
      <img
        v-if="!showSuccess"
        class="w-1/3 mx-auto mb-4 mt-6"
        :src="logo"
        alt="logo"
      />

      <ReviewsList v-if="!$route.query.page && !showSuccess" />

      <Review
        v-if="$route.query.page === 'review'"
        @showSuccess="showSuccess = true"
      />

      <Form
        v-if="$route.query.page === 'complaint'"
        @showSuccess="showSuccess = true"
        class="px-4 mb-8"
      />

      <Form
        v-if="$route.query.page === 'gratitude'"
        @showSuccess="showSuccess = true"
        class="px-4 mb-8"
      />

      <SuccessMessage v-if="showSuccess" @close="showSuccess = false" />

      <div v-if="!showSuccess" class="mb-6 -mt-2 text-center">
        Сделано с любовью
        <a
          href="http://qrmenus.uz/"
          target="_blank"
          class="font-bold text-primary"
          >qrmenus.uz</a
        >
      </div>

      <button
        v-if="$route.query.page"
        @click="$router.back()"
        class="absolute top-5 left-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

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
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "../core/BaseModal";
import ReviewsList from "./ReviewsList";
import Review from "./Review.vue";
import Form from "./Form.vue";
// import ComplaintAndGratitude from "./ComplaintAndGratitude.vue";
import SuccessMessage from "./../core/SuccessMessage.vue";
import { mapState } from "vuex"

export default {
  components: {
    BaseModal,
    ReviewsList,
    Review,
    SuccessMessage,
    Form,
    // ComplaintAndGratitude,
  },

  data: () => ({
    showSuccess: false,
  }),
  computed: {
    ...mapState({
      logo: (state) => state.logo
    }),
  },

  // methods: {
  //   goBack() {
  //     this.$router.push({ query: { modalPage: "review" } });
  //   },
  // },
};
</script>
