<template>
<div class="card my-3 p-3">
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
  }
}
</script>

<style scoped>

</style>