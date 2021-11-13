<template>
  <div class="users">
    <div class="users__icon">
      <transition name="fade">
        <ButtonCarrousel
          icon="arrowLeft"
          v-show="position < users.length"
          @clicked="showPrevious"
        />
      </transition>
    </div>
    <div class="users__container" v-if="position !== null">
      <div v-for="(user, index) in users" :key="index">
        <div
          class="users__container__user"
          v-show="Number(index) + 1 === position"
          :id="`user${Number(index) + 1}`"
          v-on:click="goToUserProfile(user)"
        >
          <img class="users__container__user__img" :src="user.picture.large" />
        </div>
      </div>
    </div>
    <div class="users__icon">
      <transition name="fade">
        <ButtonCarrousel
          icon="arrowRight"
          v-show="position > 1"
          @clicked="showNext"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ButtonCarrousel from "@/components/ButtonCarrousel";

export default {
  name: "Users",
  components: {
    ButtonCarrousel,
  },
  data: function () {
    return {
      position: null,
    };
  },
  computed: { ...mapState(["users"]) },
  created() {
    this.$store
      .dispatch("getUsers", {
        results: 6,
        gender: "female",
        format: "json",
      })
      .then(() => (this.position = this.users.length));
  },
  mounted() {
    console.log(this.users.length);
  },
  methods: {
    emptyClasses(currentImg) {
      if (currentImg.classList.contains("users__container__user--hide-left")) {
        currentImg.classList.remove("users__container__user--hide-left");
      }
      if (currentImg.classList.contains("users__container__user--hide-right")) {
        currentImg.classList.remove("users__container__user--hide-right");
      }
      if (currentImg.classList.contains("users__container__user--show-left")) {
        currentImg.classList.remove("users__container__user--show-left");
      }
      if (currentImg.classList.contains("users__container__user--show-right")) {
        currentImg.classList.remove("users__container__user--show-right");
      }
    },
    showPrevious() {
      this.emptyClasses(document.getElementById(`user${this.position}`));

      document
        .getElementById(`user${this.position}`)
        .classList.add("users__container__user--hide-left");

      setTimeout(() => {
        this.position = Number(this.position) + 1;
        this.emptyClasses(document.getElementById(`user${this.position}`));
        document
          .getElementById(`user${this.position}`)
          .classList.add("users__container__user--show-left");
      }, 1000);
    },
    showNext() {
      this.emptyClasses(document.getElementById(`user${this.position}`));

      document
        .getElementById(`user${this.position}`)
        .classList.add("users__container__user--hide-right");

      setTimeout(() => {
        this.position = Number(this.position) - 1;
        this.emptyClasses(document.getElementById(`user${this.position}`));
        document
          .getElementById(`user${this.position}`)
          .classList.add("users__container__user--show-right");
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 80px;

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