<template>
<div class="card my-3 p-3">
  What do <b>{{ classificationItemData['title'] }}</b> do?
  <hr>
  <span v-html="classificationItemData['explanatoryNotes']"></span>
  <div class="row">
    <div class="col-8">
      {{ uuid }}
    </div>
    <div class="col-4">
      <PayGraphSection :anzsco-code="code" :compare-code="compareCode" />
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