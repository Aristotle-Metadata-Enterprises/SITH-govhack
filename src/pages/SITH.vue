<template>
  <div class="home-page">
    <div class="jumbotron bg-light">
      <div class="container">
        <h4 class="text-center">
          Select a profession to get started
        </h4>
      </div>
      <div class="row">
        <Select2
            :value="professionUUID"
            :complete-url="classificationItemEndpoint"
            :select-by="idtype.UUID"
        />
      </div>
    </div>
    <JobInformation uuid="Receptionist"></JobInformation>
    <h1>Other similar jobs</h1>
    <JobInformation uuid="Special Forces Solider"></JobInformation>
    <JobInformation uuid="Petty Criminal"></JobInformation>

  </div>
</template>

<script>
import Select2 from "src/components/Select2.vue";
import {idtype} from "src/lib/enum.js";
import JobInformation from "src/components/JobInformation.vue";

export default {
  components: {
    JobInformation,
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