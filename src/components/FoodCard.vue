<template>
  <SlideOverVertical>
    <template #trigger="{ onClick }">
      <div
        class="flex flex-col items-center justify-center cursor-pointer"
        @click="onClick"
      >
        <img
          class="object-cover w-full mb-1 bg-gray-100 rounded-xl"
          src="../assets/dil_shurba.webp"
          alt="food"
        />
        <h2 class="my-3 text-lg font-medium text-gray-600">
          {{ "MAYONEZLI SALAM KASAR SALATASI".toLowerCase() }}
        </h2>
        <h6 class="w-full py-3 font-bold bg-gray-100 rounded-lg">25,000 sum</h6>
      </div>
    </template>
    <template #default="{ close }">
      <FoodInfo @close="close"></FoodInfo>
    </template>
  </SlideOverVertical>
</template>

<script>
import FoodInfo from "./FoodInfo";
import SlideOverVertical from "./SlideOverVertical.vue";
export default {
  name: "FoodCard",
  components: { FoodInfo, SlideOverVertical },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
