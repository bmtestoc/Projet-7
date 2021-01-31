<template>
  <div class="userAcc">
    <adminHeader></adminHeader>
    <admin></admin>
  </div>
  
</template>

<script>
import adminHeader from "../components/adminHeader.vue";
import admin from "../components/admin.vue";

export default {
  name: "adminPage",
  components: {
    adminHeader: adminHeader,
    admin: admin
  },
};
</script>

<style scoped>
</style>
