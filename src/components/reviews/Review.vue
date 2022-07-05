<template>
  <div class="pb-12 px-4">
    <div v-for="step in steps" :key="step.id">
      <div v-if="currStep === step.id">
        <h3 class="text-xl font-medium text-center text-gray-500">
          {{ step.text }}
        </h3>

        <div class="flex justify-center mt-4">
          <button
            v-for="item in step.reactions"
            :key="item.text"
            class="p-4 rounded-xl"
            @click="react(step.id, item.value)"
          >
            <span v-html="item.emoji" class="text-6xl opacity-90"></span>
            <p class="text-gray-600 text-sm mt-2">{{ item.text }}</p>
          </button>
        </div>
      </div>
    </div>

    <Form
      v-if="currStep === 6"
      :data="data"
      @showSuccess="$emit('showSuccess')"
      @progress="progress = 100"
    />

    <div class="mt-6" aria-hidden="true">
      <div class="bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-2 bg-primary rounded-full w-0 duration-500 ease-in-out"
          :style="`width: ${progress}%`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Form from "./Form.vue";

export default {
  components: {
    Form,
  },

  data: () => {
    return {
      steps: [
        {
          id: 1,
          text: "Встреча и приветствие в ресторане",
          reactions: [
            {
              value: 1,
              text: "Ужасно",
              // emoji: "&#128545;",
              emoji: "👎",
            },
            {
              value: 2,
              text: "Нормально",
              // emoji: "&#128566;",
              emoji: "🙂",
            },
            {
              value: 3,
              text: "Отлично",
              // emoji: "&#129321;",
              emoji: "👍",
            },
          ],
        },
        {
          id: 2,
          text: "Чистота в зале",
          reactions: [
            {
              value: 1,
              text: "Ужасно",
              // emoji: "&#128545;",
              emoji: "👎",
            },
            {
              value: 2,
              text: "Нормально",
              // emoji: "&#128566;",
              emoji: "🙂",
            },
            {
              value: 3,
              text: "Отлично",
              // emoji: "&#129321;",
              emoji: "👍",
            },
          ],
        },
        {
          id: 3,
          text: "Внимательность обслуживающего вас официанта",
          reactions: [
            {
              value: 1,
              text: "Ужасно",
              // emoji: "&#128545;",
              emoji: "👎",
            },
            {
              value: 2,
              text: "Нормально",
              // emoji: "&#128566;",
              emoji: "🙂",
            },
            {
              value: 3,
              text: "Отлично",
              // emoji: "&#129321;",
              emoji: "👍",
            },
          ],
        },
        {
          id: 4,
          text: "Скорость обслуживания",
          reactions: [
            {
              value: 1,
              text: "Ужасно",
              // emoji: "&#128545;",
              emoji: "👎",
            },
            {
              value: 2,
              text: "Нормально",
              // emoji: "&#128566;",
              emoji: "🙂",
            },
            {
              value: 3,
              text: "Отлично",
              // emoji: "&#129321;",
              emoji: "👍",
            },
          ],
        },
        {
          id: 5,
          text: "Вкус приготовленных блюд",
          reactions: [
            {
              value: 1,
              text: "Ужасно",
              // emoji: "&#128545;",
              emoji: "👎",
            },
            {
              value: 2,
              text: "Нормально",
              // emoji: "&#128566;",
              emoji: "🙂",
            },
            {
              value: 3,
              text: "Отлично",
              // emoji: "&#129321;",
              emoji: "👍",
            },
          ],
        },
      ],
      currStep: 1,
      servantsRating: null,
      hostesRating: null,
      servingsRating: null,
      speedRating: null,
      servantMenuRating: null,
      progress: 0,
      data: "",
    };
  },

  methods: {
    react(step, value) {
      const reaction = {
        1: "👎",
        2: "🙂",
        3: "👍",
      };

      this.data = this.data.concat(` ${reaction[value]}`).trim();
      this.currStep = step + 1;
      this.progress = (step / 6) * 100;
      this.$router.push({ query: { ...this.$route.query, step: step + 1 } });
    },
  },

  watch: {
    "$route.query.step": {
      handler() {
        this.currStep = +this.$route.query.step;
      },
    },
  },
};
</script>
