<template>
  <div class="flex">
    <button
      class="pl-2 pr-1 text-yellow-500 bg-gray-100 rounded-l focus:outline-none"
      @click="decrement"
    >
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <div
      class="flex items-center justify-center w-10 px-2 font-semibold text-gray-700 bg-gray-100"
    >
      {{ count }}
    </div>
    <button
      class="pl-1 pr-2 text-yellow-500 bg-gray-100 rounded-r focus:outline-none"
      @click="increment"
    >
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  methods: {
    decrement() {
      this.$emit("update:count", this.count > 1 ? this.count - 1 : 1);
    },
    increment() {
      this.$emit("update:count", this.count + 1);
    },
  },
};
</script>

<style></style>
