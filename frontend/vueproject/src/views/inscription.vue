<template>
  <div class="inscription">
    <mainHeader></mainHeader>
    <inscription></inscription>
    <mainFooter></mainFooter>
  </div>
</template>

<script>
import inscription from "../components/inscription.vue";
import mainFooter from "../components/mainFooter.vue";
import mainHeader from "../components/mainHeader.vue";
import rules from "../components/rules.vue";

export default {
  name: "inscriptionPage",
  components: {
    inscription: inscription,
    mainFooter: mainFooter,
    mainHeader: mainHeader,
  },
};
</script>

<style scoped>
</style>
