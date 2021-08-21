<template>
<div>
  {{ anzscoCode }}
</div>
</template>

<script>
// A component to display basic information about a particular profession
// Needs to query a particular profession - which is a classification item, and
// display details from the classification item

import salary_data from '/src/data/salaries_dict.json'

export default {
  name: "PayGraphSection",
  props: {
    anzscoCode: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>