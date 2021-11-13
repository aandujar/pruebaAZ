<template>
  <div class="users">
    <Loader v-show="loading" />
    <div class="users__info">
      <UserInfoIcon
        text="Pincha en la imagen para ver el detalle del usuario"
        icon="info"
      />
    </div>
    <div class="users__carousel">
      <div class="users__carousel__icon">
        <transition name="fade">
          <ButtonCarrousel
            icon="arrowLeft"
            v-show="position < users.length"
            @clicked="showPrevious"
          />
        </transition>
      </div>
      <div class="users__carousel__container" v-if="position !== null && !loading">
        <div v-for="(user, index) in users" :key="index">
          <div
            class="users__carousel__container__user"
            v-show="Number(index) + 1 === position"
            :id="`user${Number(index) + 1}`"
            v-on:click="goToUserProfile(user)"
          >
            <img
              class="users__carousel__container__user__img"
              :src="user.picture.large"
            />
          </div>
        </div>
      </div>
      <div class="users__carousel__icon">
        <transition name="fade">
          <ButtonCarrousel
            icon="arrowRight"
            v-show="position > 1"
            @clicked="showNext"
          />
        </transition>
      </div>
    </div>
    <div class="users__filter">
      <UsersFilter @gender="setGender" @results="setResults" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ButtonCarrousel from "@/components/ButtonCarrousel";
import UsersFilter from "@/components/UsersFilter";
import UserInfoIcon from "@/components/UserInfoIcon";
import Loader from "@/components/Loader.vue";

export default {
  name: "Users",
  components: {
    ButtonCarrousel,
    UsersFilter,
    UserInfoIcon,
    Loader,
  },
  data: function () {
    return {
      position: null,
      gender: "female",
      results: 6,
    };
  },
  computed: { ...mapState(["users", "loading"]) },
  created() {
    this.searchUsers();
  },
  methods: {
    setGender(genderSelected) {
      this.gender = genderSelected;
      this.searchUsers();
    },
    setResults(resultsSelected) {
      this.results = resultsSelected;
      this.searchUsers();
    },
    searchUsers() {
      let params = { results: this.results, format: "json" };

      if (this.gender !== "both") {
        params["gender"] = this.gender;
      }
      
      this.$store
        .dispatch("getUsers", params)
        .then(() => this.position = this.users.length, 1000)
        .catch(() =>
          this.$notify({
            group: "foo",
            title: "Error",
            text: "Ha ocurrido un error al realizar la búsqueda de usuarios",
            type: "error",
          })
        );
    },
    emptyClasses(currentImg) {
      if (
        currentImg.classList.contains(
          "users__carousel__container__user--hide-left"
        )
      ) {
        currentImg.classList.remove(
          "users__carousel__container__user--hide-left"
        );
      }
      if (
        currentImg.classList.contains(
          "users__carousel__container__user--hide-right"
        )
      ) {
        currentImg.classList.remove(
          "users__carousel__container__user--hide-right"
        );
      }
      if (
        currentImg.classList.contains(
          "users__carousel__container__user--show-left"
        )
      ) {
        currentImg.classList.remove(
          "users__carousel__container__user--show-left"
        );
      }
      if (
        currentImg.classList.contains(
          "users__carousel__container__user--show-right"
        )
      ) {
        currentImg.classList.remove(
          "users__carousel__container__user--show-right"
        );
      }
    },
    showPrevious() {
      this.emptyClasses(document.getElementById(`user${this.position}`));

      document
        .getElementById(`user${this.position}`)
        .classList.add("users__carousel__container__user--hide-left");

      setTimeout(() => {
        this.position = Number(this.position) + 1;
        this.emptyClasses(document.getElementById(`user${this.position}`));
        document
          .getElementById(`user${this.position}`)
          .classList.add("users__carousel__container__user--show-left");
      }, 1000);
    },
    showNext() {
      this.emptyClasses(document.getElementById(`user${this.position}`));

      document
        .getElementById(`user${this.position}`)
        .classList.add("users__carousel__container__user--hide-right");

      setTimeout(() => {
        this.position = Number(this.position) - 1;
        this.emptyClasses(document.getElementById(`user${this.position}`));
        document
          .getElementById(`user${this.position}`)
          .classList.add("users__carousel__container__user--show-right");
      }, 1000);
    },
    goToUserProfile(user) {
      this.$store.commit("setUserSelected", user);
      this.$router.push("/wrapper/user");
    },
  },
};
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;

  &__info {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__carousel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &__icon {
      z-index: 5;
      height: 80px;
      width: 80px;
      margin-left: 40px;
      margin-right: 40px;
    }

    &__container {
      height: 300px;
      width: 300px;
      z-index: 5;

      &__user {
        background-color: white;
        border: 1px solid black;
        height: 300px;
        width: 300px;
        z-index: 10;
        position: relative;
        cursor: pointer;

        &__img {
          height: 100%;
          width: 100%;
        }

        @keyframes hideLeft {
          0% {
            opacity: 1;
            margin-left: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            margin-left: -200px;
          }
        }

        @keyframes showLeft {
          0% {
            opacity: 0;
            margin-left: 200px;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            margin-left: 0;
          }
        }

        @keyframes hideRight {
          0% {
            opacity: 1;
            margin-left: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            margin-left: 200px;
          }
        }

        @keyframes showRight {
          0% {
            opacity: 0;
            margin-left: -200px;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            margin-left: 0;
          }
        }

        &--hide-left {
          animation-name: hideLeft;
          animation-duration: 500ms;
          animation-fill-mode: forwards;
        }

        &--show-left {
          animation-name: showLeft;
          animation-duration: 500ms;
          animation-fill-mode: forwards;
        }

        &--hide-right {
          animation-name: hideRight;
          animation-duration: 500ms;
          animation-fill-mode: forwards;
        }

        &--show-right {
          animation-name: showRight;
          animation-duration: 500ms;
          animation-fill-mode: forwards;
        }
      }
    }

    @media (max-width: 900px) {
      &__container {
        height: 300px;
        width: 150px;

        &__user {
          background-color: white;
          border: 1px solid black;
          height: 300px;
          width: 150px;
          z-index: 10;
          position: relative;
          cursor: pointer;
        }
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

  &__filter {
    margin-top: 50px;
    width: 500px;
  }

  @media (max-width: 500px) {
    &__filter {
      margin-top: 50px;
      width: 90%;
    }
  }
}
</style>