<template>
  <div class="home-page">
    <div class="jumbotron bg-light">
      <div class="container">
        <h2>SITH - Skills Interactive Transferability Handbook</h2>
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
      <p>Use SITH to find relevant jobs based on your existing skills and knowledge.</p>
      <p>Pay and concordance information is only available for 4-digit anzsco codes. Others may not work properly</p>
      <p>
        Good options are:
        <ul>
          <li>1333 - Importers, Exporters and Wholesalers</li>
          <li>2322 - Surveyors and Spatial Scientists</li>
          <li>6311 - Checkout Operators and Office Cashiers</li>
        </ul>
      </p>
      <h2>Why is it called SITH?</h2>
      <p>
        Because we are using data from the 
        <a href="https://www.nationalskillscommission.gov.au/our-work/jobs-and-education-data-infrastructure-jedi">Jobs and Education Data Infrastructure (JEDI)</a>
        National Skill Classification dataset.
        We are also using the ABS API to get salary data broken down by gender and ANZSCO code to produce salary information.
      </p>        
      <h2>How it works</h2>
      <p>TBD</p>        
    </div>
    <div v-else>
      <JobInformation :uuid="professionUUID" mainOccupation="true" code="1311"></JobInformation>
      <h1>Other similar jobs</h1>
      <div v-for="item in similarClassificationItems" :key="item['item_id']">
        <JobInformation :uuid="item['item_id']" :commonSkills="item['skills']" :code="item['code']" :compareCode="item['compare_code']"></JobInformation>
      </div>
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
        for (let item of data.data['similar items']) {
          this.similarClassificationItems.push({
            'item_id': item['item_id'], 'similarity' : item['similarity'],
            'code': item['code'],
            'skills': item['common skill list'],
            'compare_code': data.data['code']
          })
        }
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