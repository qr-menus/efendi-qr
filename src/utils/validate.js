import { extend } from "vee-validate";
import { required, email, alpha_spaces } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Поле обязательно для заполнения",
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Неверный формат текста",
});

extend("email", {
  ...email,
  message: "Неверный формат почты",
});

extend("length", {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ["length"],
  // message: "Длина поля должна быть не менее {length}",
  message: "Неверный формат номера телефона",
});
