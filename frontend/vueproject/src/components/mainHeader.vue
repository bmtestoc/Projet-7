<template>
<header class="site-header">
  <div class="site-identity">
    <a href="www.groupomania.com"><img src="../assets/icon-above-font.png" alt="Groupomania" /></a>
    <h1>Bienvenue sur le réseau social des collaborateurs de Groupomania</h1>
  </div>  
  <nav class="site-navigation">
    <ul class="nav">
      <li><a href="/cgu" target="_blank">Conditions générales d'utilisation</a></li> 
    </ul>
  </nav>
</header>
</template>

<script>

export default {
  name: 'mainHeader'
}

</script>

<style scoped>

body {
  font-family: Helvetica;
  margin: 0;
}
a {
  text-decoration: none;
  color: #000;
}
.site-header { 
  border-bottom: 1px solid #ccc;
  padding: .5em 1em;
  margin-bottom: 10px;
}

.site-header::after {
  content: "";
  display: table;
  clear: both;
}

.site-identity {
  float: left;
}

.site-identity h1 {
  font-size: 1.5em;
  margin: .7em 0 .3em 0;
  display: inline-block;
}

.site-identity img {
  max-width: 65px;
  float: left;
  margin: 0 10px 0 0;
}

.site-navigation {
  float: right;
}

.site-navigation ul, li {
  margin: 0; 
  padding: 0;
}

.site-navigation li {
  display: inline-block;
  margin: 1.4em 1em 1em 1em;
}

@media (max-height:703px) and (orientation: portrait) {
.site-identity img {
  display: none;
}
}

</style>