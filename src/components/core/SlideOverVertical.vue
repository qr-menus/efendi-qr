<template>
  <div>
    <slot name="trigger" :onClick="open"></slot>
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
            class="
              absolute
              inset-0
              transition-opacity
              bg-gray-500 bg-opacity-75
            "
            aria-hidden="true"
            @click="hideContent"
          ></div>
        </transition>

        <div class="absolute inset-x-0 top-0 max-h-screen overflow-y-auto">
          <div class="flex justify-center max-w-full p-2 pb-24">
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
                <div
                  class="h-full max-w-2xl overflow-x-hidden bg-white rounded-lg"
                >
                  <div class="relative">
                    <!-- <div
                      @click.stop="hideContent"
                      class="absolute z-10 cursor-pointer bottom-2 right-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-12 h-12"
                        viewBox="0 0 20 20"
                        fill="#fefefe"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div> -->
                    <!-- Replace with your content -->
                    <slot name="default" :close="hideContent"></slot>
                    <!-- /End replace -->
                  </div>
                </div>
              </div>
            </transition>
          </div>
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
  watch: {
    $route: {
      handler(value) {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!Boolean(value.query.modalOpened)) {
          this.showContent = false;
        }
      },
    },
  },
  methods: {
    open() {
      this.isOpen = true;
      document.body.classList.add("overflow-hidden");
      this.$router.push({
        ...this.$route,
        query: { modalOpened: true },
      });
    },
    hideContent() {
      this.$router.push({ ...this.$route, query: {} });
    },
    close() {
      this.isOpen = false;
      document.body.classList.remove("overflow-hidden");
    },
  },
};
</script>

<style></style>
