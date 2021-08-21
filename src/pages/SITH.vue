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
            v-model="professionUUID"
            :complete-url="classificationItemEndpoint"
            :select-by="idtype.UUID"
        />
      </div>
    </div>
    <Loading v-if="!ready"></Loading>
    <div v-if="!professionUUID">
      <h1>SAM SAM SAM ADD SOME SHIT HERE</h1>
    </div>
    <div v-else>
      <JobInformation :uuid="professionUUID" code="1494"></JobInformation>

      <h1>Other similar jobs</h1>

      <JobInformation :uuid="professionUUID" code="1334" compareCode="1494"></JobInformation>
      <JobInformation :uuid="professionUUID" code="1331" compareCode="1494"></JobInformation>
      <JobInformation :uuid="professionUUID"></JobInformation>
    </div>
  </div>
</template>

<script>
import Select2 from "src/components/Select2.vue";
import {idtype} from "src/lib/enum.js";
import JobInformation from "src/components/JobInformation.vue";
import Loading from 'src/components/Loading.vue'
import axios from 'axios'

export default {
  components: {
    JobInformation,
    Select2,
    Loading
  },
  props: {
    // The URL of the registry that is being queried
    registryURL: {
      type: String,
      default: 'https://aristotle-te-govhack-20-z09cgb.herokuapp.com'
    },
    // The UUID of the anzsco code for the
    anzscoUUID: {
      type: String,
      default: '3a64083b-528d-4abe-816d-ccbb739e1675'
    }
  },
  data: () => ({
    professionUUID: "",
    idtype: idtype,
    ready: true,
    similarClassificationItems: [],
  }),
  computed: {
    classificationItemEndpoint: function () {
      return `${this.registryURL}/ac/classification/${this.anzscoUUID}/items`
    },
    similarClassificationItemEndpoint: function () {
      return `https://aristotle-te-govhack-20-z09cgb.herokuapp.com/api/internal/classification_similarity/${this.professionUUID}`
    }
  },
  watch: {
    professionUUID: function () {
      this.ready = false
      let similarProfessionPromise = axios.get(this.similarClassificationItemEndpoint)
      similarProfessionPromise.then((data) => {
        this.similarClassificationItems = data.data
      }).catch((error) => {
        this.errors.push(error)
      }).finally(() => {
        this.ready = true
      })
    }
  }
}
</script>
<style scoped></style>