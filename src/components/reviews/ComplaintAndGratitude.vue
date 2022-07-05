<template>
  <Form @showSuccess="$emit('showSuccess')" />
</template>

<script>
import Form from "./Form.vue";
export default {
  components: {
    Form,
  },

  data: () => ({}),
};
</script>
