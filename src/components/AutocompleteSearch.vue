<template>
  <Select2></Select2>
</template>

<script>
import Select2 from "src/components/Select2.vue";
export default {
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
  components: [
      Select2
  ]

}
</script>

<style scoped>

</style>