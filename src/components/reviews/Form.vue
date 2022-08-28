<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <ValidationProvider rules="required|alpha_spaces" v-slot="{ errors }">
          <label
            for="name"
            class="block text-gray-700 text-sm mb-1 font-medium"
          >
            Имя
          </label>
          <input
            v-model="form.name"
            id="name"
            name="name"
            type="text"
            class="w-full py-2.5 px-2 border-2 rounded-lg"
            placeholder="Азиз Олимов"
          />
          <span class="text-sm text-red-500">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="mt-4">
          <ValidationProvider rules="required|length:19" v-slot="{ errors }">
            <label for="phone" class="block text-gray-700 text-sm font-medium">
              Номер телефона
            </label>
            <div class="mt-1">
              <input
                v-model="form.phone"
                id="phone"
                v-mask="'+(###) ## ###-##-##'"
                class="w-full py-2.5 px-2 border-2 rounded-lg"
                name="phone"
                type="phone"
              />
            </div>
            <span class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <div class="mt-4">
          <ValidationProvider
            :rules="`${required ? 'required' : ''}`"
            v-slot="{ errors }"
            class="mt-4"
          >
            <label
              for="message"
              class="block text-gray-700 text-sm font-medium"
            >
              Сообщение
            </label>
            <div class="mt-1">
              <textarea
                v-model="form.message"
                id="message"
                class="w-full py-2.5 px-2 border-2 rounded-lg"
                placeholder="Напишите ваши сообщения..."
                name="message"
                rows="4"
              ></textarea>
            </div>
            <span class="text-sm text-red-500">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <button
          class="
            mt-4
            py-2.5
            w-full
            font-medium
            rounded-lg
            bg-primary
            text-white
            flex
            space-x-2
            justify-center
            mx-auto
            disabled:opacity-75
          "
          type="submit"
          :class="{ 'opacity-75': invalid }"
          :disabled="invalid"
        >
          Подтвердить
          <svg
            v-if="loading"
            class="animate-spin w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            style="fill: rgba(255, 255, 255, 1); transform: ; msfilter: "
          >
            <path
              d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
            ></path>
          </svg>
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from "axios";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
  },

  props: {
    data: {
      type: String,
    },
  },

  data: () => ({
    form: {
      name: "",
      phone: "998",
      message: "",
    },
    chat_id: -1001691865706,
    BOT_API: "5563215767:AAH6OVeuUnzpe4hjrQiQgdzYdKO-cJmpORI",
    loading: false,
  }),

  computed: {
    required() {
      return (
        this.$route.query.page === "gratitude" ||
        this.$route.query.page === "complaint"
      );
    },

    content() {
      const reviewTypes = {
        review: "⭐️ Отзыв",
        gratitude: "❤️ Благодарность",
        complaint: "⚫️ Жалоба",
      };

      const name = `👤 ${this.form.name}\n📞 ${this.form.phone}`;
      const reviewType = reviewTypes[this.$route.query.page];
      const message = `✉️ ${this.form.message}`;
      const reviews = this.data ? `${this.data}\n` : "";

      return `${reviewType}\n${reviews}\n${name}\n${message}`;
    },
  },

  methods: {
    submit() {
      this.loading = true;
      setTimeout(() => {
        this.request();
      }, 1000);
    },

    async request() {
      try {
        this.$emit("progress");

        await axios({
          method: "post",
          url: `https://api.telegram.org/bot${this.BOT_API}/sendMessage?chat_id=${this.chat_id}`,
          params: {
            text: this.content,
          },
        });
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
      this.$router.push({ query: { modalPage: "review" } });
      this.$emit("showSuccess");
    },
  },
};
</script>
