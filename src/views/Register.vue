<template>
  <div class="register">
    <div class="register__box">
      <div class="register__box__title">
        <h2>Datos personales</h2>
      </div>
      <form>
        <TextField
          ref="name"
          label="Nombre"
          :validateValue="validateValue"
          icon="name"
          type="text"
          @input="setValue($event, 'name')"
        />
        <TextField
          ref="email"
          label="Email"
          :validateValue="validateValue"
          icon="email"
          type="email"
          @input="setValue($event, 'email')"
        />
        <TextField
          ref="phone"
          label="Teléfono"
          :validateValue="validateValue"
          icon="phone"
          type="phone"
          @input="setValue($event, 'phoneNumber')"
        />
        <TextField
          ref="postalCode"
          label="Código postal"
          :validateValue="validateValue"
          icon="postalCode"
          type="postalCode"
          @input="setValue($event, 'postalCode')"
        />
        <Button @clicked="createUser" />
      </form>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/TextField";
import Button from "@/components/Button";
export default {
  name: "Register",
  components: {
    TextField,
    Button,
  },
  data: function () {
    return {
      user: {
        name: "",
        email: "",
        phoneNumber: "",
        postalCode: "",
      },
      validateValue: false,
    };
  },
  methods: {
    setValue(data, property) {
      this.user[property] = data;
    },
    createUser() {
      this.validateValue = true;
      const correctName = this.$refs.name.getErrorMessage.length === 0;
      const correctEmail = this.$refs.email.getErrorMessage.length === 0;
      const correctPhoneNumber =
        this.$refs.phone.getErrorMessage.length === 0;
      const correctPostalCode =
        this.$refs.postalCode.getErrorMessage.length === 0;
      if (
        correctName &&
        correctEmail &&
        correctPhoneNumber &&
        correctPostalCode
      ) {
         this.$store.dispatch("setUser", this.user).then(() => this.$router.push("/wrapper"))
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;

  &__box {
    padding: 20px;
    background-color: white;
    min-height: 580px;
    width: 40%;
    box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
  }

   @media (max-width: 1600px) {
      &__box {
        padding: 20px;
        background-color: white;
        height: 500px;
        width: 50%;
        box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
      }
    }

     @media (max-width: 1260px) {
      &__box {
        padding: 20px;
        background-color: white;
        height: 500px;
        width: 60%;
        box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
      }
    }

    @media (max-width: 1000px) {
      &__box {
        padding: 20px;
        background-color: white;
        height: 500px;
        width: 70%;
        box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
      }
    }

   

  &__box__title {
    font-size: 20px;
    color: $blue-primary;
  }
}
</style>