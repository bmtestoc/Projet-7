<template>
  <div class="userAcc">
    <accountHeader></accountHeader>
    <userAccount></userAccount>
  </div>
  
</template>

<script>
import accountHeader from "../components/accountHeader.vue";
import userAccount from "../components/userAccount.vue";

export default {
  name: "userAccountPage",
  components: {
    accountHeader: accountHeader,
    userAccount: userAccount
  },
};
</script>

<style scoped>
</style>
