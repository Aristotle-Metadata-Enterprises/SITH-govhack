<template>
  <div class="card my-3 p-3">
    <div class="row">
      <div class="col-8">
        What do <a :href="uuid">
        <b>{{ classificationItemData['title'] }}</b>
      </a> do? <small>ANZSCO code: {{ code }}</small>
        <hr>
        <span v-html="classificationItemData['explanatoryNotes'].trunc(250)"></span>
      </div>
      <div class="col-4">
        <PayGraphSection :anzsco-code="classificationItemData['code']" :compare-code="compareCode"/>
      </div>
    </div>
    <div v-if="mainOccupation">
      <b>Top 10 Main Skills for this job</b>
      <div class="skills-list">
        <span v-for="item in mainSkills" :key="item['targetItem']['title']">
          <span class="badge badge-info smallskill mr-2">
          {{ item['targetItem']['title'] }}
          </span>
        </span>
      </div>
    </div>
    <div v-else>
      <b>Skills you might have for this job</b><br>
      <div class="skills-list">
        <span v-for="item in similarSkills" :key="item['title']">
          <span class="badge badge-info smallskill mr-2">
            {{ item['title'] }}
          </span>
        </span>
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
    function (n) {
      return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
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
    },
    mainOccupation: {
      type: Boolean,
      default: false
    },
    commonSkills: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
    classificationItemData: null,
    errors: []
  }),
  mounted: function () {
    queryClassificationItem(this.uuid).then((data) => {
      this.classificationItemData = data.edges[0].node
    }).catch((error) => {
      this.errors.push(error)
    }).finally(() => {
    })
  },
  computed: {
    similarSkills: function () {
      return this.commonSkills.slice(0, 10)
    },
    anzscoCode: function () {
      if (this.fetchedAnzscoCode === null) {
        return this.code
      } else {
        return this.fetchedAnzscoCode
      }
    },
    mainSkills: function () {
      return this.classificationItemData['correspondenceItemAsSource'].slice(0, 10)
    }
  },
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
.smallskill {
  font-size: 10pt;
  font-weight: normal;
}
</style>