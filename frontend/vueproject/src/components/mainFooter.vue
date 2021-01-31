<template>
<div class="footer">

  <div class="copyright">
    <p>&copy; 2021 - Groupomania</p>
  </div>
  <div class="social">
    <a href="mailto:moderateur@groupomania.com" class="support">Contact us</a>
    <a href="https://fr-fr.facebook.com/groupomania" class="face">f</a>
    <a href="https://twitter.com/groupomania" class="tweet">t</a>
    <a href="https://fr.linkedin.com/company/groupomania" class="linked">in</a>
  </div>

</div>
</template>

<script>

export default {
  name: 'mainFooter'
}

</script>

<style scoped>

@import url(https://fonts.googleapis.com/css?family=Raleway);
* {
  margin: 0;
  padding: 0;
}

html, body {
  font-family: Raleway, sans-serif;  
  background-color: #fff;
}

.footer {
  width: 100%;
  display: inline-block;
  height: 70px;
  /*margin: 2em 0;*/
  background-color: rgb(194, 60, 60);
  position: fixed;
    bottom: 0;
	left:0;
}
.copyright {
    width: 50%;
    float: left;
	background-color:rgb(194, 60, 60);
	line-height: 70px;
	color: white;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
.footer.copyright.p {
      padding-left: 10%;
      color: white;
      font-size: 0.7em;
      line-height: 70px;
      text-transform: capitalize;
      letter-spacing: 1px;
      @media (max-width: 600px) {
        text-align: center;
        padding: 0;
      }
    }
  .social {
      width: 50%;
      float: right;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
     a {
      float: left;
      line-height: 70px;
      text-decoration: none;
      color: white;
      text-align: center;
      font-weight: bold; 
}
a:hover {
         background-color: #999;
}

.linked {
  background-color: #1E83AE;
  font-size: 1.2em;
  width: 20%;
}

.face {
  background-color: #3D5B94;
  font-size: 1.2em;
  width: 20%;
}

.tweet {
  background-color: #3DACDD;
  font-size: 1.2em;
  width: 20%;
}

.support {
  background-color: #6dcd9a;
  font-size: 0.8em;
  width: 40%;
}


</style>