<template>
  <div>
    <slot name="trigger" :onClick="toggle"></slot>
    <section
      v-show="isOpen"
      class="fixed inset-0 z-20 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 overflow-hidden">
        <!--
      Background overlay, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <transition
          enter-active-class="duration-500 ease-in-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-500 ease-in-out"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="isOpen"
            class="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            aria-hidden="true"
            @click="close"
          ></div>
        </transition>

        <div class="absolute inset-y-0 right-0 flex max-w-full">
          <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
          <transition
            enter-active-class="transition duration-500 ease-in-out transform sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-500 ease-in-out transform sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div v-show="isOpen" class="w-screen max-w-max">
              <div
                class="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl"
              >
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <slot name="title"></slot>
                    <div class="flex items-center ml-3 h-7">
                      <button
                        class="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        @click.stop="close"
                      >
                        <span class="sr-only">Close panel</span>
                        <!-- Heroicon name: outline/x -->
                        <svg
                          class="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
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
                  </div>
                </div>
                <div class="relative flex-1 px-4 mt-6 sm:px-6">
                  <!-- Replace with your content -->
                  <slot></slot>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>

<style></style>
