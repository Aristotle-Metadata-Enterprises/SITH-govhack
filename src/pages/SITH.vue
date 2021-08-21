<template>
  <div class="home-page">
    <div class="jumbotron bg-light">
      <div class="container">
          <AutocompleteSearch></AutocompleteSearch>
      </div>
    </div>

  </div>

</template>

<script>
import AutocompleteSearch from "../components/AutocompleteSearch.vue";

export default {
  components: {AutocompleteSearch},

}
</script>

<style scoped>
.card-body {
  border-top: 1px solid lightgray;
}
</style>