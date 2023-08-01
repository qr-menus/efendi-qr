<template>
  <div>
    <!-- Select Brach -->
    <template v-if="!$route.query.branch">
      <h2 class="text-2xl font-bold text-center">
        {{ $store.state.locale=='ru' ? 'Выберите филиал' : 'Choose branch' }}
      </h2>
      <div class="w-full flex gap-4 justify-center mt-8 flex-wrap">
        <button v-for="branch in branches" :key="branch.key" @click="changeBranch(branch.key)" 
        class="w-40 px-4 py-8 bg-red-600 rounded-lg hover:bg-red-500 text-white font-semibold md:text-lg"
        >
          {{ $store.state.locale=='ru' ? branch.title_ru : branch.title_en }}
        </button>
      </div>
    </template>

    <!-- Form -->
    <template v-else>
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-center">
          {{ $store.state.locale == 'ru' ? 'Оставьте отзыв' : 'Leave a comment' }}
        </h2>
        <p class="mt-2 font-medium text-center text-gray-500">
          {{ $store.state.locale == 'ru' ? `Филиал "${currentBranchName.title_ru}"` : `Branch "${currentBranchName.title_en}"` }}
        </p>
      </div>

      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <ValidationProvider rules="required|alpha_spaces" v-slot="{ errors }">
            <label
              for="name"
              class="block text-gray-700 text-sm mb-1 font-medium"
            >
              {{ $store.state.locale=='ru' ? 'Имя' : 'Name' }}
              <span class="text-red-600">*</span>
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
              <label 
                for="phone" 
                class="block text-gray-700 text-sm font-medium"
              >
                {{ $store.state.locale=='ru' ? 'Номер телефона' : 'Phone number' }}
                <span class="text-red-600">*</span>
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
              v-slot="{ errors }"
              class="mt-4"
            >
              <label
                for="message"
                class="block text-gray-700 text-sm font-medium"
              >
                {{ $store.state.locale=='ru' ? 'Сообщение' : 'Message' }}
              </label>
              <div class="mt-1">
                <textarea
                  v-model="form.message"
                  id="message"
                  class="w-full py-2.5 px-2 border-2 rounded-lg"
                  :placeholder="`${ $store.state.locale=='ru' ? 
                                'Пишите свои пожелания, предложения или жалобу...' 
                                : 'Write your wishes, suggestions or complaint'}`"
                  name="message"
                  rows="4"
                ></textarea>
              </div>
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div v-for="grading in gradings" :key="grading.id">
            <label 
              class="block mt-4 text-gray-700 text-sm font-medium"
            >
              {{ $store.state.locale=='ru' ? grading.title_ru : grading.title_en }}
              <!-- <span class="text-red-600">*</span> -->
            </label>
            <div class="flex justify-center p-4">
              <div v-for="reaction in reactions" :key="reaction.value">
                <button
                  type="button"
                  :name="reaction.text"
                  class="p-4 m-3"
                  @click="grading.grade = reaction.value"
                >
                  <div 
                    v-text="reaction.emoji" 
                    class="text-5xl icon-emoji hover:opacity-100"
                    :class="grading.grade !== reaction.value && 'opacity-30'"
                  />
                </button>
  
              </div>
            </div>
          </div>
          
          <div class="flex justify-center mb-4 overflow-auto">
            <button
              class="
                my-4
                py-2.5
                w-full
                font-medium
                rounded-lg
                bg-primary
                text-white
                flex
                justify-center
                mx-auto
                disabled:opacity-75
              "
              type="submit"
              :class="{ 'opacity-60': invalid }"
              :disabled="invalid"
            >
              {{ $store.state.locale=='ru' ? 'Подтвердить' : 'Confirm' }}
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
          </div>
        </form>
      </ValidationObserver>
    </template>
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
    reactions: [
      {
        value: 1,
        text: "Плохо",
        emoji: "👎",
      },
      {
        value: 2,
        text: "Хорошо",
        emoji: "🙂",
      },
      {
        value: 3,
        text: "Прекрасно",
        emoji: "👍",
      },
    ],
    branches: [
      {
        key: 'anhor',
        title_ru: 'Анхор Локомотив',
        title_en: 'Anhor Lokomotiv',
      },
      {
        key: 'sodiqazimov',
        title_ru: 'Содик Азимов (Ц1)',
        title_en: 'Sodiq Azimov (C1)',
      },
    ],
    gradings: [
      {
        id: 0,
        title_ru: 'Встреча гостей',
        title_en: 'Meeting with guests',
        grade: null,
      },
      {
        id: 1,
        title_ru: 'Качество обслуживания',
        title_en: 'Quality of service',
        grade: null,
      },
      {
        id: 2,
        title_ru: 'Скорость обслуживания',
        title_en: 'Service speed',
        grade: null,
      },
      {
        id: 3,
        title_ru: 'Вкус блюд',
        title_en: 'Taste of dishes',
        grade: null,
      },
      {
        id: 4,
        title_ru: 'Чистота в зале',
        title_en: 'Cleanliness in the hall',
        grade: null,
      },
    ],
    chat_id_anhor: -1001691865706,
    chat_id_sodiq: -900898567,
    BOT_API: "5563215767:AAH6OVeuUnzpe4hjrQiQgdzYdKO-cJmpORI",
    loading: false,
  }),

  computed: {
    currentBranchName() {
      return this.branches.find(item => item.key === this.$route.query.branch)
    },

    content() {
      const gradings = this.gradings.reduce((acc, curr) => {
        return acc += `${curr.title_ru}: ${this.reactions[curr.grade - 1]?.emoji || ''} ${this.reactions[curr.grade - 1]?.text || ''}\n`
      }, '');
      const name = `👤 ${ this.form.name }\n📞 ${ this.form.phone }`;
      const message = `✉️ ${ this.form.message }`;

      return `${name}\n${message}\n${gradings}`;
    },
  },

  methods: {
    changeBranch(key) {
      this.$router.push({ ...this.$router, query: { branch: key } });
    },

    async request() {
      try {
        this.$emit("progress");
        await axios({
          method: "post",
          url: `https://api.telegram.org/bot${this.BOT_API}/sendMessage?chat_id=${this.$route.query.branch === 'anhor' ? this.chat_id_anhor : this.chat_id_sodiq}`,
          params: {
            text: this.content,
          },
        })
      } catch (error) {
        console.log(error);
      }
      this.loading = false
      this.$store.state.successMessageVisible = true
      this.$router.push('/')
    },

    submit() {
      this.loading = true;
      setTimeout(() => {
        this.request();
      }, 1000);
    },
  },
};
</script>
