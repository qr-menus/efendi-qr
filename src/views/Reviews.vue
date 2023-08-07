<template>
  <div>
    <nav class="sticky top-0 z-10 bg-white">
      <Topbar />
    </nav>
    
    <div class="m-4 mt-0">
      <div class="flex justify-center">
        <div class="grid grid-cols-12 pt-6 pb-3 max-w-7xl flex-auto w-64">
          <div class="col-span-1">
            <!-- <button
            class="flex space-x-2 text-center"
            @click="goMain()"
        >
            <svg 
            class="h-6 w-4"
            version="1.1" 
            viewBox="0 0 512 512"  
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <polygon 
                points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256"
            />
            </svg>
            <span class="font-medium">
            {{ $store.state.locale=='ru' ? 'Меню' : 'Menu' }}
            </span>
        </button> -->
          </div>
        </div>
      </div>

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
};
</script>
