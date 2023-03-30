<template>
  <div class="w-full h-full text-center py-20">
    <div class="flex justify-center mt-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-20 w-20 text-primary"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <h2 class="text-primary mt-1.5 font-bold text-3xl">
      {{ $store.state.locale=='ru' ? 'Отправлено!' : 'Sent!' }}
    </h2>

    <p class="text-gray-600 mt-3 text-lg">
      {{ $store.state.locale=='ru' ? 'Спасибо за ваш отзыв!' : 'Thanks for your feedback!' }}
    </p>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$emit("close");
    }, 2000);
  },
};
</script>
