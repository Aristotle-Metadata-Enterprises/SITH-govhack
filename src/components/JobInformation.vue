<template>
<div>
  {{ uuid }}
</div>
</template>

<script>
// A component to display basic information about a particular profession
// Needs to query a particular profession - which is a classification item, and
// display details from the classification item

export default {
  name: "JobInformation",
  props: {
    uuid: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>