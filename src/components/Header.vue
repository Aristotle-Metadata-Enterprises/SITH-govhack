<template>
  <nav class="navbar navbar-custom navbar-expand-lg">
    <ul class="navbar-nav mr-auto">
      <router-link class="navbar-brand" :to="{name: 'mainPage'}">
        <img class="responsive" src="../assets/sith.png" style="height: 60px;">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"/>
      </button>
    </ul>
    <div style="padding-right: 5px" class="border-right">
      <a href="https://www.australia.gov.au/">
        <img class="responsive" style="height: 60px" src="../assets/ausgov.png">
      </a>
    </div>
    <div style="padding-right: 7px; padding-left: 10px" class="border-right">
        <a href="https://www.nationalskillscommission.gov.au/">
          <img class="responsive" style="height: 60px" src="../assets/nsc.png">
        </a>
    </div>
    <div style="padding-right: 7px; padding-left: 10px" class="border-right">
      <a href="https://aristotlemetadata.com">
        <img class="responsive" style="height: 60px" src="../assets/bigaris.png">
      </a>
    </div>
     <div style="padding-right: 7px; padding-left: 10px">
       <a href="https://govhack.org">
        <img class="responsive" style="height: 60px" src="../assets/govhack.png">
       </a>
    </div>

  </nav>
</template>

<style scoped>
/* Dont grow or shrink header */
.navbar-custom {
  flex: 0 0 auto;
}

/* Custom styling for navbar to make it aristotle green */
.navbar-custom {
  background-color: white;
}

/* change the brand and text color */
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
  color: black;
}

/* change the link color */
.navbar-custom .navbar-nav .nav-link {
  color: black
}

/* change the color of active or hovered links */
.navbar-custom .nav-item.active .nav-link,
.navbar-custom .nav-item:hover .nav-link {
  color: black;
}

/* for dropdown only - change the color of droodown */
.navbar-custom .dropdown-menu {
  background-color: black;
}

.navbar-custom .dropdown-item {
  color: black;
}

.navbar-custom .dropdown-item:hover,
.navbar-custom .dropdown-item:focus {
  color: black;
  background-color: black;
}
</style>
