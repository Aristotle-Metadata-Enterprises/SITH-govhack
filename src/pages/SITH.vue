<template>
  <div class="home-page">
    <div class="jumbotron bg-light">
      <div class="container">
        <Select2
            :value="professionUUID"
            :complete-url="classificationItemEndpoint"
            :select-by="idtype.UUID"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Select2 from "src/components/Select2.vue";
import {idtype} from "src/lib/enum.js";

export default {
  components: {
    Select2
  },
  props: {
    registryURL: {
      type: String,
      default: 'https://aristotle-te-govhack-20-z09cgb.herokuapp.com'
    },
    anzscoUUID: {
      type: String,
      default: '3a64083b-528d-4abe-816d-ccbb739e1675'
    }
  },
  data: () => ({
    professionUUID: null,
    idtype: idtype
  }),
  computed: {
    classificationItemEndpoint: function () {
      return `${this.registryURL}/ac/classification/${this.anzscoUUID}/items`
    }
  }
}
</script>

<style scoped></style>