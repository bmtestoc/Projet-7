<template>
    <Slide right>
      <a id="addPost" href="#/">
        <span><i class="fas fa-plus"></i> Créer un sujet</span>
      </a>
      <a id="allRead" href="#/">
        <span><i class="far fa-flag"></i> Tout marquer comme lu</span>
      </a>
      <a id="myAccount" href="#/">
        <span><i class="fas fa-cogs"></i> Mon compte</span>
      </a>
      <a id="cgu" href="#/cgu" target="_blank">
        <span><i class="fas fa-book-reader"></i> CGU</span>
      </a>
      <a id="leave" href="#/">
        <span><i class="fas fa-power-off"></i> Déconnexion</span>
      </a>
    </Slide right>
</template>

<script>
import { Slide } from 'vue-burger-menu'


    export default {
  name: 'burgerMenu',
  components: {
      Slide
}

}
</script>

<style scoped>
a {
    color: white;
}

</style>
