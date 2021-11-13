<template>
  <div class="user-information">
    <h3>Datos del usuario</h3>
    <div class="user-information__block">
      <Icon focused type="name" />
      <div v-if="isUserLogged" class="user-information__block__text">
        {{ user.name }}
      </div>
    </div>
    <div class="user-information__block">
      <Icon focused type="email" />
      <div v-if="isUserLogged" class="user-information__block__text">
        {{ user.email }}
      </div>
    </div>
    <div class="user-information__block">
      <Icon focused type="phone" />
      <div v-if="isUserLogged" class="user-information__block__text">
        {{ user.phoneNumber }}
      </div>
    </div>
    <div class="user-information__block">
      <Icon focused type="postalCode" />
      <div v-if="isUserLogged" class="user-information__block__text">
        {{ user.postalCode }}
      </div>
    </div>
    <div
      class="user-information__block user-information__block--logout"
      v-on:click="logout"
    >
      <Icon focused type="logout" />
      <div class="user-information__block__text">Cerrar sesión</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import Icon from "@/components/Icon";

export default {
  name: "UserInformation",
  components: { Icon },
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

  &__block {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;

    &--logout {
      cursor: pointer;
    }

    &__text {
      padding-left: 10px;
      word-break: break-all;
    }
  }
}
</style>