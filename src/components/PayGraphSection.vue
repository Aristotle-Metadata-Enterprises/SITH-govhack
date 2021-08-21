<template>
<div>
  <div class="pay-banner p-3 card container">
    <div class="row">
      <div class="col-3 text-center">
        <i class="fas fa-chart-line"></i>
        <br>
        You could increase your average salary in this job!
      </div>
      <div class="col-3 text-center female loud" :title="titleWomen">
        <i class="fas fa-2x fa-female"></i>
        <br>
        ${{wef}}
      </div>
      <div class="col-3">
        <pie-chart :chartdata="chartData" :options="options" />

      </div>
      <div class="col-3 text-center male loud" :title="titleMen">
        <i class="fas fa-2x fa-male"></i>
        <br>
        ${{wem}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
// A component to display basic information about a particular profession
// Needs to query a particular profession - which is a classification item, and
// display details from the classification item

import salary_data from '../data/salaries_dict.json'
import PieChart from 'src/components/PieChart.vue'

export default {
  name: "PayGraphSection",
  components: {PieChart},
  data(){
      return{
          salary_data: salary_data
      }
  },
  props: {
    anzscoCode: {
      type: String,
      default: null
    },
    compareCode: {
      type: String,
      default: null
    }
  },
  computed: {
    salaries: function() {
      if (this.anzscoCode) {
        return this.salary_data[this.anzscoCode.toString()]
      } else {
        return {}
      }
    },
    wem: function() {
      return this.salaries["Male Weekly Earnings"]
    },
    wef: function() {
      return this.salaries["Female Weekly Earnings"]
    },
    aam: function() {
      return this.salaries["Male Average Age"]
    },
    aaf: function() {
      return this.salaries["Female Average Age"]
    },
    titleMen: function() {
      return "On average, men in this job earn $" + this.wef
    },
    titleWomen: function() {
      return "On average, women in this job earn $" + this.wem
    },
    options: function() {
      return {
        legend: {
          display: false
        },
      }
    },
    chartData: function() {
      return {
        labels: ['Males', 'Females'],
        datasets: [
          {
            label: 'Pay',
            backgroundColor: ['slateblue', 'maroon'],
            data: [this.wem, this.wef]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.pay-banner {
  width:400px;
}
.female {
  color: maroon;
}
.male {
  color: slateblue;
}
.loud {
  font-size: 14pt
}
</style>