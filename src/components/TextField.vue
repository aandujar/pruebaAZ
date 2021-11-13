<template>
  <div class="textfield">
    <div class="textfield__label">
      <transition name="fade">
        <label
          v-show="showLabel"
          :id="getLabelId"
          :for="label"
          class="textfield__label__text"
          >{{ label }}</label
        >
      </transition>
    </div>
    <div class="textfield__input">
      <Icon :focused="focusIcon" :type="icon" />
      <input
        class="textfield__input__field"
        :type="getType"
        :id="label"
        :placeholder="label"
        v-on:blur="removeFocusLabel"
        v-on:focus="focusLabel"
        v-on:input="sendValue"
      />
    </div>
    <div class="textfield__error">
      <transition name="fade">
        <p class="textfield__error__text" v-show="getErrorMessage.length > 0">
          {{ getErrorMessage }}
        </p>
      </transition>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  name: "Textfield",
  components: {
    Icon,
  },
  props: {
    label: { type: String, required: true },
    icon: { type: String, required: false },
    validateValue: { type: Boolean, required: true },
    type: { type: String, required: false },
  },
  data: function () {
    return {
      value: "",
      focused: false,
      focusIcon: false,
    };
  },
  computed: {
    getLabelId() {
      return `label${this.label}`;
    },
    getLabelId() {
      return `label${this.label}`;
    },
    showLabel() {
      return this.value.length > 0;
    },
    getErrorMessage() {
      let message = "";
      if (this.focused || this.validateValue) {
        if (!this.showLabel) {
          message = "Campo requerido";
        } else {
          switch (this.type) {
            case "email":
              message = this.getEmailErrors();
              break;
            case "phone":
              message = this.getPhoneErrors();
              break;
            case "postalCode":
              message = this.getPostalCodeErrors();
              break;
            default:
              break;
          }
        }
      }
      return message;
    },
    getType() {
      return this.type === "email" ? "email" : "text";
    },
  },
  methods: {
    focusLabel() {
      document
        .getElementById(this.getLabelId)
        .classList.remove("textfield__label__text--not-focused");
      document
        .getElementById(this.getLabelId)
        .classList.add("textfield__label__text--focused");
      this.focused = true;
      this.focusIcon = true;
    },
    removeFocusLabel() {
      document
        .getElementById(this.getLabelId)
        .classList.remove("textfield__label__text--focused");
      document
        .getElementById(this.getLabelId)
        .classList.add("textfield__label__text--not-focused");
      this.focusIcon = false;
    },
    sendValue() {
      this.value =
        document.getElementById(this.label).value != null
          ? document.getElementById(this.label).value
          : "";

      this.$emit("input", this.value);
    },
    getEmailErrors() {
      let message = "";
      const regex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!regex.test(this.value.toLowerCase())) {
        message = "Email incorrecto";
      }
      return message;
    },
    getPhoneErrors() {
      let message = "";
      const firstCharacter = this.value.charAt(0).toString();

      if (!Number(this.value)) {
        message = "Debe ser un número";
      } else if (
        firstCharacter !== "6" &&
        firstCharacter !== "7" &&
        firstCharacter !== "9"
      ) {
        message = "Debe empezar por 6, 7 o 9";
      } else if (this.value.toString().length !== 9) {
        message = "Debe tener 9 cifras";
      }
      return message;
    },
    getPostalCodeErrors() {
      let message = "";
      if (!Number(this.value)) {
        message = "Debe ser un número";
      } else if (this.value.toString().length !== 5) {
        message = "Debe tener 5 cifras";
      }
      return message;
    },
  },
};
</script>

<style lang="scss" scoped>
.textfield {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  height: 70px;

  &__label {
    height: 20px;
    width: 50%;

    &__text {
      width: 100%;
      &--not-focused {
        color: $black;
      }

      &--focused {
        color: $blue-primary;
      }
    }
  }

  &__input {
    display: flex;
    flex-direction: row;
    height: 28px;
    width: 50%;

    &__field {
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 1px solid $black;
      outline: 0;
      width: 100%;

      &:focus {
        outline: 0;
        border-bottom: 1px solid $blue-primary;
      }
    }
  }

  &__error {
    height: 20px;

    &__text {
      color: $red-error;
      margin: 0;
      padding-top: 5px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>