<template>
  <div class="userAcc">
    <adminHeader></adminHeader>
    <burgerMenu></burgerMenu>
    <admin></admin>
  </div>
</template>

<script>
import adminHeader from "../components/adminHeader.vue";
import burgerMenu from "../components/burgerMenu.vue";
import admin from "../components/admin.vue";

export default {
  name: "adminPage",
  components: {
    adminHeader: adminHeader,
    burgerMenu: burgerMenu,
    admin: admin,
  },
};
</script>

<style scoped>
</style>
