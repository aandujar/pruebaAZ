<template>
  <div class="user-information user-information--big" id="userInformation">
    <div class="user-information__header">
      <div v-on:click="togglePanel">
        <Icon
          v-show="panelOpened"
          class="user-information__header__icon"
          :pointer="true"
          type="arrowUp"
        />
        <Icon
          v-show="!panelOpened"
          class="user-information__header__icon"
          :pointer="true"
          type="arrowDown"
        />
      </div>
      <h3>Datos del usuario</h3>
    </div>
    <div
      v-if="isUserLogged"
      class="user-information__content user-information__content--shown"
      id="userContent"
    >
      <UserInfoIcon :text="user.name" icon="name" />
      <UserInfoIcon :text="user.email" icon="email" />
      <UserInfoIcon :text="user.phoneNumber" icon="phone" />
      <UserInfoIcon :text="user.postalCode" icon="postalCode" />
    </div>
    <UserInfoIcon
      text="Cerrar sesión"
      icon="logout"
      :pointer="true"
      @clicked="logout"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import UserInfoIcon from "@/components/UserInfoIcon";
import Icon from "@/components/Icon";

export default {
  name: "UserInformation",
  components: { UserInfoIcon, Icon },
  data: function () {
    return {
      panelOpened: true,
    };
  },
  computed: { ...mapState(["user"]), ...mapGetters(["isUserLogged"]) },
  methods: {
    logout() {
      this.$store.dispatch("setUser", null).then(() => this.$router.push("/"));
    },
    togglePanel() {
      if (this.panelOpened) {
        this.hidePanel();
      } else {
        this.shownPanel();
      }
    },
    shownPanel() {
      const panelContent = document.getElementById("userContent");
      if (panelContent.classList.contains("user-information__content--hided")) {
        panelContent.classList.remove("user-information__content--hided");
      }
      if (panelContent.classList.contains("user-information__content--shown")) {
        panelContent.classList.remove("user-information__content--shown");
      }
      panelContent.classList.add("user-information__content--shown");

      const panel = document.getElementById("userInformation");
      if (panel.classList.contains("user-information--small")) {
        panel.classList.remove("user-information--small");
      }
      if (panel.classList.contains("user-information--big")) {
        panel.classList.remove("user-information--big");
      }
      panel.classList.add("user-information--big");

      this.panelOpened = true;
    },
    hidePanel() {
      const panelContent = document.getElementById("userContent");
      if (panelContent.classList.contains("user-information__content--hided")) {
        panelContent.classList.remove("user-information__content--hided");
      }
      if (panelContent.classList.contains("user-information__content--shown")) {
        panelContent.classList.remove("user-information__content--shown");
      }
      panelContent.classList.add("user-information__content--hided");

      const panel = document.getElementById("userInformation");
      if (panel.classList.contains("user-information--small")) {
        panel.classList.remove("user-information--small");
      }
      if (panel.classList.contains("user-information--small")) {
        panel.classList.remove("user-information--small");
      }
      panel.classList.add("user-information--small");

      this.panelOpened = false;
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

  &--big {
    height: 100%;
  }

  &--small {
    height: 100%;
  }

  &__header {
    width: 100%;

    &__icon {
      display: none;
    }

    &__content {
      padding-right: 30px;

      &--hided {
        display: block;
      }

      &--shown {
        display: block;
      }
    }

    &--logout {
      cursor: pointer;
    }
  }
}

@media (max-width: 900px) {
  .user-information {
    box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 76%);
    background-color: $white;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    overflow-y: auto;

    &--big {
      height: 300px;
      transition: height 2s;
    }

    &--small {
      height: 50px;
      transition: height 2s;
    }

    &__header {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      width: 100%;

      &__icon {
        display: block;
        margin-right: 20px;
      }
    }

    &__content {
      padding-right: 30px;
      
      @keyframes showIcons {
        0% {
          opacity: 0;
          display: none;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
          display: block;
        }
      }

      @keyframes hideIcons {
        0% {
          opacity: 1;
          display: block;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 0;
          display: none;
        }
      }

      &--hided {
        animation-name: hideIcons;
        animation-duration: 500ms;
        animation-fill-mode: forwards;
      }

      &--shown {
        animation-name: showIcons;
        animation-duration: 2000ms;
        animation-fill-mode: forwards;
      }
    }

    &--logout {
      cursor: pointer;
    }
  }
}
</style>