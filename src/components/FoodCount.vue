<template>
  <div class="flex">
    <button
      class="p-1 text-white bg-gray-300 rounded-lg focus:outline-none"
      @click="decrement"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 12H6"
        />
      </svg>
    </button>
    <div class="flex items-center justify-center w-10 px-2">
      <span class="text-xl font-semibold text-gray-800">{{ count }}</span>
    </div>
    <button
      class="p-1 text-white bg-yellow-500 rounded-lg focus:outline-none"
      @click="increment"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
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
