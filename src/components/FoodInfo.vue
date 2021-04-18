<template>
  <div class="w-full">
    <img
      class="object-cover object-center w-full h-72 md:h-96"
      src="../assets/iskander.jpg"
      alt=""
    />
    <div class="p-5">
      <h2 class="text-xl font-black">Iskander kebap</h2>
      <p
        class="pr-2 my-4 overflow-y-auto text-sm text-gray-600 max-h-48 sm:max-h-64"
      >
        Один из самых известных турецких мясных блюд, этот вид кебаба назван в
        честь изобретателя 19 века Искендера Эфенди. Как еда, кебаб, как
        правило, берет свое начало в культурах Ближнего Востока, Турции и Индии.
        Но хотя мы склонны думать о кусках мяса на вертеле, которые часто
        чередуются с кусочками овощей, когда мы слышим слово кебаб, на самом
        деле это более широкий термин, который охватывает многие мясные блюда на
        гриле.Но хотя мы склонны думать о кусках мяса на вертеле, которые часто
        чередуются с кусочками овощей, когда мы слышим слово кебаб, на самом
        деле это более широкий термин, который охватывает многие мясные блюда на
        гриле.
      </p>
      <hr class="mb-2" />
      <div class="mb-4 text-lg font-bold">25,000 sum</div>
      <button
        @click="$emit('close', close)"
        class="w-full p-2 text-white bg-green-500 rounded-lg"
      >
        НАЗАД
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
