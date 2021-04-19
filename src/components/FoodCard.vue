<template>
  <BaseModal>
    <template #trigger="{ open }">
      <div
        class="flex flex-col items-center justify-center cursor-pointer"
        @click="open"
      >
        <img
          class="object-cover w-full h-40 mb-1 md:h-64 lg:h-96 rounded-xl"
          src="../assets/iskanderr.jpg"
          alt="food"
        />
        <h2 class="my-3 text-lg font-medium text-gray-600">Iskander kebap</h2>
        <h6 class="w-full py-3 font-bold bg-gray-100 rounded-lg">25,000 sum</h6>
      </div>
    </template>
    <template #default="{ close }">
      <FoodInfo @close="close"></FoodInfo>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "./BaseModal";
import FoodInfo from "./FoodInfo";
export default {
  name: "FoodCard",
  components: { BaseModal, FoodInfo },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
