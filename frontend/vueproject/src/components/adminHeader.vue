<template>
  <nav class="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
    <div class="container">
      <a
        class="navbar-brand"
        rel="nofollow"
        target="_blank"
        href="http://www.groupomania.com"
        style="text-transform: uppercase"
      >
        GROUPOMANIA</a
      >
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <p>GESTION DES <br />UTILISATEURS <i class="fas fa-users-cog"></i></p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "adminHeader",
};
</script>

<style scoped>
.navbar {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 5px;
  margin-top: 0px;
}

.mx-background-top-linear {
  background: -webkit-linear-gradient(45deg, rgb(194, 60, 60) 48%, #dae0e6 48%);
  background: -webkit-linear-gradient(left, rgb(194, 60, 60) 48%, #dae0e6 48%);
  background: linear-gradient(45deg, rgb(194, 60, 60) 48%, #dae0e6 48%);
}

#navbarResponsive p {
  font-weight: bold;
  margin: auto;
  padding-left: 120px;
}

.fa-user {
  font-weight: bold;
}

@media (max-width: 415px) and (orientation: portrait) {
  .navbar-collapse {
    display: block;
    text-align: right;
  }
  #navbarResponsive p {
    padding-left: 100px;
  }
}
</style>