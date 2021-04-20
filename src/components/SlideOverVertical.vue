<template>
  <div>
    <slot name="trigger" :onClick="toggle"></slot>
    <section
      v-show="isOpen"
      class="fixed inset-0 overflow-hidden"
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
          enter-active-class="duration-75 ease-in-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-75 ease-in-out"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
          @after-enter="showContent = true"
        >
          <div
            v-show="isOpen"
            class="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            aria-hidden="true"
            @click="hideContent"
          ></div>
        </transition>

        <div class="absolute inset-x-0 bottom-0 flex items-end max-w-full">
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
            enter-active-class="transition duration-300 ease-in-out transform sm:duration-700"
            enter-class="translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transition duration-300 ease-in-out transform sm:duration-700"
            leave-class="translate-y-0"
            leave-to-class="translate-y-full"
            @after-leave="close"
          >
            <div v-show="showContent" class="">
              <div class="h-full bg-white">
                <div class="relative">
                  <div
                    @click.stop="hideContent"
                    class="absolute z-10 cursor-pointer top-2 right-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-10 h-10"
                      viewBox="0 0 20 20"
                      fill="#fefefe"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <!-- Replace with your content -->
                  <slot name="default" :close="hideContent"></slot>
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
      showContent: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    hideContent() {
      this.showContent = false;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>

<style></style>
