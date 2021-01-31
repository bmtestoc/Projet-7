<template>
  <div class="connection">
    <mainHeader></mainHeader>
    <connection></connection>
    <mainFooter></mainFooter>
  </div>
</template>

<script>
import connection from "../components/connection.vue";
import mainFooter from "../components/mainFooter.vue";
import mainHeader from "../components/mainHeader.vue";

export default {
  name: "connectionPage",
  components: {
    connection: connection,
    mainFooter: mainFooter,
    mainHeader: mainHeader,
  },
};
</script>

<style scoped>
</style>
