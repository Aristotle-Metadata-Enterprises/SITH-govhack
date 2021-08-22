<template>
<div>
  <div class="pay-banner card">
    <div class="card-header text-center">
      <b>Salary summary</b>
    </div>
    <div v-if="salaries" class="card-body p-3">
      <div class="row">
        <div class="col-3 text-center salary-compare">
          <span v-if="compareCode">
            <span v-if="betterOff" title="You could increase your average salary in this job!">
              <i class="fas fa-dollar-sign"></i>
              <br>
              Potential
              pay rise!
            </span>
            <span v-else title="Lookout, you could be taking a pay cut!">
              <i class="far fa-thumbs-down"></i>
              <br>
              Pay cut
              alert!
            </span>
          </span>
        </div>
        <div class="col-3 text-center female loud" :title="titleWomen">
          <i class="fas fa-2x fa-female"></i>
          <br>
          <span class="d-inline">${{wef}}</span>
        </div>
        <div class="col-3">
          <pie-chart :chartdata="chartData" :options="options" />

        </div>
        <div class="col-3 text-center male loud" :title="titleMen">
          <i class="fas fa-2x fa-male"></i>
          <br>
          <span class="d-inline">${{wem}}</span>
        </div>
      </div>
    </div>
    <div v-else class="card-body p-3 text-center">
      No salary data for this job.
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
    betterOff: function() {
      return this.wepc < this.wep
    },
    wep: function() {
      return this.salaries["Person Weekly Earnings"]
    },
    wepc: function() {
      return this.salary_data[this.compareCode.toString()]["Person Weekly Earnings"] 
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
      return "On average, men in this job earn $" + this.wem
    },
    titleWomen: function() {
      return "On average, women in this job earn $" + this.wef
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
  box-shadow: 5px 5px rgba(5,5,5,0.5);
}
.female {
  color: maroon;
}
.male {
  color: slateblue;
}
.loud {
  font-size: 12pt
}
.salary-compare {
  font-size: 10pt
}
.salary-compare .fas, .salary-compare .far {
  font-size: 24pt
}

</style>