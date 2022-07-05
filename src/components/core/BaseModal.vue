<template>
  <div>
    <slot name="trigger" :open="open"></slot>
    <div
      v-show="isOpen"
      class="fixed inset-0 z-20 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          flex
          items-center
          justify-center
          min-h-screen
          px-4
          pt-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <transition
          enter-active-class="duration-200 ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
          @after-enter="showContent = true"
        >
          <div
            v-show="isOpen"
            class="fixed inset-0 transition-opacity bg-gray-700 bg-opacity-75"
            aria-hidden="true"
            @click.stop="hideContent"
          ></div>
        </transition>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <transition
          enter-active-class="duration-300 ease-out"
          enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          enter-to-class="translate-y-0 opacity-100 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-class="translate-y-0 opacity-100 sm:scale-100"
          leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          @after-leave="close"
        >
          <div
            v-if="showContent"
            class="
              inline-block
              w-full
              overflow-hidden
              text-left
              align-bottom
              transition-all
              transform
              bg-white
              rounded-lg
              shadow-xl
              sm:my-8 sm:align-middle sm:max-w-2xl
            "
          >
            <slot name="default" :close="hideContent"></slot>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",

  props: {
    page: {
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
      showContent: false,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
      document.body.classList.add("overflow-hidden");
      this.$router.push({
        ...this.$route,
        query: { modalPage: this.page },
      });
    },
    hideContent() {
      this.showContent = false;
    },
    close() {
      this.isOpen = false;
      document.body.classList.remove("overflow-hidden");
      this.$router.push({
        ...this.$route,
        query: null,
      });
    },
  },
};
</script>

<style></style>
