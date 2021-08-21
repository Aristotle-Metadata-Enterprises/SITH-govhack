<template>
<div class="card my-3 p-3">
  <div class="row">
    <div class="col-8">
      What do <b>{{ classificationItemData['title'] }}</b> do?
      <hr>
      <span v-html="classificationItemData['explanatoryNotes'].trunc(250)"></span>
    </div>
    <div class="col-4">
      <PayGraphSection :anzsco-code="fetchedAnzscoCode" :compare-code="compareCode" />
    </div>
  </div>
</div>
</template>

<script>
// A component to display basic information about a particular profession
// Needs to query a particular profession - which is a classification item, and
// display details from the classification item
import {queryClassificationItem} from "src/lib/api.js";
import PayGraphSection from 'src/components/PayGraphSection.vue'


// This would be illegal in production - but guess what? we're not in production
String.prototype.trunc =
      function(n){
          return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
      };

export default {
  name: "JobInformation",
  components: {PayGraphSection},
  props: {
    uuid: {
      type: String,
      default: null
    },
    code: {
      type: String,
      default: null
    },
    compareCode: {
      type: String,
      default: null
    }
  },
  data: () => ({
    classificationItemData: null,
    errors: []
  }),
  watch: {
    uuid: function () {
      queryClassificationItem(this.uuid).then((data) => {
        this.classificationItemData = data.edges[0].node
        this.fetchedAnzscoCode = this.classificationItemData['code']
      }).catch((error) => {
        this.errors.push(error)
      }).finally(() => {
      })
    }
  }
}
</script>

<style scoped>

</style>