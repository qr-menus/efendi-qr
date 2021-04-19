<template>
  <div class="w-full">
    <img
      class="object-cover object-center w-full h-72 md:h-96"
      src="../assets/iskanderr.jpg"
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
      <div class="flex items-center">
        <button
          @click="$emit('close', close)"
          class="w-full p-2 text-white bg-green-500 rounded-lg"
        >
          НАЗАД
        </button>
        <div class="ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#10B981"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
