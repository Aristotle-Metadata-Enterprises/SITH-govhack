<template>
  <div>
    What do <b>{{ classificationItemData['title'] }}</b> do?
    <hr>
    <span v-html="classificationItemData['explanatoryNotes']"></span>
  </div>
</template>

<script>
// A component to display basic information about a particular profession
// Needs to query a particular profession - which is a classification item, and
// display details from the classification item
import {queryClassificationItem} from "src/lib/api.js";

export default {
  name: "JobInformation",
  props: {
    uuid: {
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