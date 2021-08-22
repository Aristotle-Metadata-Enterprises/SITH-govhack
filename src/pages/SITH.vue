<template>
  <div class="home-page">
    <div class="jumbotron bg-light" style="background-color: white !important; margin-top: 5px">
      <div class="row">
        <div class="col align-self-center">
          <p>Enter a profession to get started...</p>
          <Select2
              :value="professionUUID"
              v-model="professionUUID"
              :complete-url="classificationItemEndpoint"
              :select-by="idtype.UUID"
              placeholder="6311 - Checkout Operators and Office Cashiers"
          />
        </div>
        <div class="col">
          <p>Use <strong>About the Skills Interactive Transfer Helper</strong> to find relevant jobs based on your
            existing skills and knowledge.</p>
          <p>Pay and concordance information is only available for 4-digit ANZSCO codes. Other codes do not have full
            functionality at this point.</p>
          Check these out first:
          <ul>
            <li><strong>1333</strong> - Importers, Exporters and Wholesalers</li>
            <li><strong>2322</strong> - Surveyors and Spatial Scientists</li>
            <li><strong>6311</strong> - Checkout Operators and Office Cashiers</li>
          </ul>
        </div>
      </div>
    </div>
    <Loading v-if="!ready"/>
    <div v-if="!professionUUID" style="margin-bottom: 20px">
      <div class="card">
        <div class="card-body">
          <div class="card-group">
            <div class="card">
              <h5 class="card-header">Why it is called SITH?</h5>
              <div class="card-body">
                <p class="card-text">
                  Because we are using data from the
                  <a
                      href="https://www.nationalskillscommission.gov.au/our-work/jobs-and-education-data-infrastructure-jedi">
                    Jobs and Education Data Infrastructure (JEDI)</a>
                  National Skill Classification dataset.
                  We are also using the <a href="https://api.gov.au/service/715cdfd0-4742-402e-8729-086a7fd42a51">ABS
                  API</a> to get salary data broken down by gender and ANZSCO code to produce salary information.
                </p>
              </div>
            </div>
            <div class="card">
              <h5 class="card-header">How does it work?</h5>
              <div class="card-body">
                <p class="card-text">
                SITH pulls data from a number of government sources in order to give Australian citizens insights
                  that can help
                  them plan their careers, transition to better paying jobs, or even find a new career that requires
                  similar
                  skills
                  to their previous employment.
                The ANZSCO clasification was first loaded into an
                  <a href="https://aristotle-te-govhack-20-z09cgb.herokuapp.com/home/">Aristotle Metadata Registry</a>,
                  which exposes a comprehensive API allowing us to search and query the classification.
                  This was connected to a autocomplete search component, allowing users to search for any profession in
                  milliseconds.
                  Once a profession was selected, the classification item was fetched from the API, as well as a custom
                  similarity  API  to identify other professions with shared skills.
                  These professions were then cross referenced with ABS salary information, so that users could find
                  upwards moves for their careers - better paying jobs that leverage skills they already possess!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    <div v-if="professionUUID">
      <JobInformation :uuid="professionUUID" :main-occupation="true" code="1311"></JobInformation>
      <h2 class="text-center underline">
        Other similar jobs
      </h2>
      <div v-for="item in similarClassificationItems" :key="item['item_id']">
        <JobInformation :uuid="item['item_id']" :common-skills="item['skills']" :code="item['code']"
                        :compare-code="item['compare_code']">
        </JobInformation>
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
      this.similarClassificationItems = []
      let similarProfessionPromise = axios.get(this.similarClassificationItemEndpoint)
      similarProfessionPromise.then((data) => {
        for (let item of data.data['similar items']) {
          this.similarClassificationItems.push({
            'item_id': item['item_id'], 'similarity': item['similarity'],
            'code': item['code'],
            'skills': item['common skill list'],
            'compare_code': data.data['code']
          })
        }
      }).catch((error) => {
      }).catch((error) => {
        this.errors.push(error)
      }).finally(() => {
        this.ready = true
      })
    }
  }
}
</script>
<style scoped>
.underline {
  text-decoration: underline;
}

.white {
  color: white;
}


</style>