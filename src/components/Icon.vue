<template>
  <div class="icon">
    <svg-icon type="mdi" :path="getType" :color="getColor"></svg-icon>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiPhoneOutline, mdiMapMarker, mdiEmail, mdiLogout } from "@mdi/js";

export default {
  name: "Icon",
  props: {
    focused: { Type: Boolean, required: false, default: false },
    type: { type: String, required: true },
  },
  components: {
    SvgIcon,
  },
  computed: {
    getColor() {
      return this.focused ? "#3f51b5" : "black";
    },
    getType() {
      let icon = "";

      switch(this.type) {
          case 'name':
              icon = mdiAccount;
              break;
          case 'phone':
              icon = mdiPhoneOutline;
              break;
            case 'postalCode': 
                icon = mdiMapMarker;
                break;
            case 'email': 
                icon = mdiEmail;
                break;
            case 'logout': 
                icon = mdiLogout;
                break;
        default:
            break;

      }

      return icon;
    },
  },
  data: function () {
    return {
      account: mdiAccount,
    };
  },
};
</script>
