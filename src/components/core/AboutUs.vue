<template>
  <BaseModal page="aboutUs">
    <template #trigger="{ open }">
      <div class="flex space-x-2">
        <button
          @click="open"
          class="flex items-center px-2 py-2 font-medium text-gray-800"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1.5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <!-- <span>{{ $store.state.locale == "ru" ? "О нас" : "About us" }}</span> -->
        </button>
      </div>
    </template>
    <template #default="{ close }">
      <div class="py-4">
        <h3 class="px-4 mb-2 text-lg font-bold">Контактные данные</h3>
        <hr />
        <div class="px-4 mt-4 mb-2 bg-white">
          <h4 class="font-medium">Efendi Restaurant - 1</h4>
          <div class="flex items-center mt-1 mb-2 text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
              />
            </svg>
            (71) 233-15-02
          </div>
        </div>
        <yandex-map
          :settings="mapSettings"
          ymap-class="ymapClass"
          :coords="[`41.302460`, `69.287750`]"
          :zoom="17"
          :controls="controls"
        >
          <ymapMarker
            marker-id="1"
            :coords="[`41.302460`, `69.287750`]"
            type="Placemark"
            hint-content="Efendi Restaurant 1"
          ></ymapMarker>
        </yandex-map>
        <div class="px-4 mt-4 mb-2 bg-white">
          <h4 class="font-medium">Efendi Restaurant - 2</h4>
          <div class="flex items-center mt-1 mb-2 text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-2 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
              />
            </svg>
            (95) 177-09-93
          </div>
        </div>
        <yandex-map
          :settings="mapSettings"
          ymap-class="ymapClass"
          :coords="[41.327882, 69.269219]"
          :zoom="17"
          :controls="controls"
        >
          <ymapMarker
            marker-id="2"
            :coords="[41.327882, 69.269219]"
            type="Placemark"
            hint-content="Efendi Restaurant 2"
          ></ymapMarker>
        </yandex-map>
        <div class="mt-4 text-center">
          Сделано с любовью
          <a
            href="http://qrmenus.uz/"
            target="_blank"
            class="font-bold text-primary"
            >qrmenus.uz</a
          >
        </div>
        <button @click="close" class="absolute top-3 right-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "./BaseModal";
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  components: {
    BaseModal,
    yandexMap,
    ymapMarker,
  },
  data() {
    return {
      mapSettings: {
        apiKey: "3e7930fe-d6cb-40aa-a554-38c9f4cfb8f5",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
      controls: ["fullscreenControl", "zoomControl"],
    };
  },
  computed: {},
  methods: {
    onClick(e) {
      console.log(e.get("coords"));
    },
  },
};
</script>

<style>
.ymapClass {
  @apply w-full;
  @apply h-64;
}
</style>
