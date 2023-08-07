<template>
  <div>
    <nav class="sticky top-0 z-10 bg-white">
      <Topbar />
    </nav>
    <div class="m-4 mt-6">
      <div class="mx-auto max-w-2xl">
        <Form />
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/core/Topbar";
import Form from "@/components/reviews/Form.vue";
export default {
  name: "Reviews",
  components: {
    Topbar,
    Form,
  },
  methods: {
    goMain() {
      this.$router.push("/");
    },
  },
};
</script>
