<template>
  <div class="userAcc">
    <accountHeader></accountHeader>
    <burgerMenu></burgerMenu>
    <userAccount></userAccount>
  </div>
  
</template>

<script>
import accountHeader from "../components/accountHeader.vue";
import burgerMenu from "../components/burgerMenu.vue";
import userAccount from "../components/userAccount.vue";

export default {
  name: "userAccountPage",
  components: {
    accountHeader: accountHeader,
    burgerMenu: burgerMenu,
    userAccount: userAccount
  },
};
</script>

<style scoped>
</style>
