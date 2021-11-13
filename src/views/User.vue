<template>
  <div class="user">
    <div class="user__data">
      <img class="user__data__img" :src="userSelected.picture.large" />
      <UserInfoIcon icon="name" :text="getFormattedName" />
      <UserInfoIcon icon="email" :text="userSelected.email" />
      <UserInfoIcon icon="phone" :text="userSelected.phone" />
      <UserInfoIcon icon="birthday" :text="getBirthday" />
      <UserInfoIcon :icon="userSelected.gender" :text="getGender" />
      <UserInfoIcon icon="postalCode" :text="getAddress" />
      <UserInfoIcon
        icon="back"
        text="Volver atrás"
        :pointer="true"
        @clicked="goBack"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserInfoIcon from "@/components/UserInfoIcon";

export default {
  name: "User",
  components: { UserInfoIcon },
  computed: {
    ...mapState(["userSelected"]),
    getFormattedName() {
      return `${this.userSelected.name.title} ${this.userSelected.name.first} ${this.userSelected.name.last}`;
    },
    getBirthday() {
      return this.userSelected.dob.date.split("T")[0];
    },
    getAddress() {
      return `${this.userSelected.location.city}, ${this.userSelected.location.state}, ${this.userSelected.location.country}`;
    },
    getGender() {
      return this.userSelected.gender === "female" ? "Mujer" : "Hombre";
    },
  },
  methods: {
    goBack() {
      this.$store.commit("setUserSelected", null);
      this.$router.push("/wrapper/users");
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 120px;

  &__data {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: $white;
    min-height: 580px;
    width: 40%;
    box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);

    &__img {
      align-self: flex-start;
    }
  }

  @media (max-width: 1200px) {
    &__data {
      display: flex;
      flex-direction: column;
      padding: 20px;
      background-color: $white;
      min-height: 580px;
      width: 60%;
      box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);

      &__img {
        align-self: flex-start;
      }
    }
  }
}
</style>