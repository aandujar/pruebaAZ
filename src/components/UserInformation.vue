<template>
  <div class="user-information">
    <h3>Datos del usuario</h3>
    <div v-if="isUserLogged">
      <UserInfoIcon :text="user.name" icon="name" />
      <UserInfoIcon :text="user.email" icon="email" />
      <UserInfoIcon :text="user.phoneNumber" icon="phone" />
      <UserInfoIcon :text="user.postalCode" icon="postalCode" />
    </div>
    <UserInfoIcon text="Cerrar sesión" icon="logout" v-on:click="logout" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import UserInfoIcon from "@/components/UserInfoIcon";

export default {
  name: "UserInformation",
  components: {  UserInfoIcon },
  computed: { ...mapState(["user"]), ...mapGetters(["isUserLogged"]) },
  methods: {
    logout() {
      this.$store.dispatch("setUser", null).then(() => this.$router.push("/"));
    },
  },
};
</script>

<style lang="scss" scoped>
.user-information {
  box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
  background-color: $white;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y: auto;

  &__title {
    margin-top: 20px;
  }

  &--logout {
    cursor: pointer;
  }
}
</style>