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
          @after-enter="revealContent"
        >
          <div
            v-show="isOpen"
            class="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            aria-hidden="true"
            @click="hideContent"
          ></div>
        </transition>

        <div
          class="absolute inset-x-0 bottom-0 flex items-end justify-center max-w-full"
        >
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
            <div
              v-show="showContent"
              class="w-full h-full max-w-2xl overflow-x-hidden overflow-y-auto bg-white rounded-t-xl"
              style="max-height: 80vh"
            >
              <slot name="default" :close="hideContent"></slot>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name:"CartSlideOver",
  props:{
    showContent: {
      required: true,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
      document.body.classList.add("overflow-hidden");
    },
    hideContent() {
      this.$emit("update:showContent", false)
    },
    revealContent() {
      this.$emit('update:showContent', true)
    },
    close() {
      this.isOpen = false;
      document.body.classList.remove("overflow-hidden");
    },
  },
};
</script>

<style></style>
