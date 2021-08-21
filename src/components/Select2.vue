<script>

import Requestor from 'src/lib/requests.js'
import {idtype} from 'src/lib/enum.js'
import Select2Mixin from 'src/components/Select2Mixin.vue';
import $ from "jquery";

export default {
    mixins: [Select2Mixin],
    props: {
        // The url of the autocomplete endpoint
        completeUrl: {
            type: String,
            required: true,
        },
    },
    watch: {
        identifier: function(identifier) {
            let select = $(this.$refs.select)
            select.val(identifier)
            // Trigger the change event so the select2 updates, but don't emit a change event
            select.trigger('change', {fromValue: true})
        }
    },
    mounted: function() {
        if (this.hasValue) {
            // When mounted only, do an API lookup to get item name
            this.getItemById(this.identifier).then((item) => {
                this.addOption(item)
                this.initializeSelect2()
            })
        } else {
            this.initializeSelect2()
        }
    },
    methods: {
        // Return a promise that gives a single item from autocomplete by id
        getItemById: function(id) {
            // Build query parameters
            let params = {}
            if (this.selectBy === idtype.ID) {
                params.id = id
            } else {
                params.uuid = id
            }
            let requestor = new Requestor()
            return requestor.get(this.completeUrl, params).then((response) => {
                return response.data.results[0]
            })
        },
        emitValue: function(event, options) {
            // Determine if the change was caused by value prop
            let fromValue = false
            if (options) {
                fromValue = options.fromValue
            }
            // Don't emit input when we are updating the select box due to the value prop changing
            // This allows reusing the same select2 component for multiple pieces of data
            if (!fromValue) {
                const select = event.target
                if (select.selectedIndex === -1) {
                    // No selection is displayed as 'None'
                    this.$emit('input', null)
                } else {
                    let value = select.value
                    // If selecting by id convert to int
                    if (this.selectBy === idtype.ID) {
                        value = parseInt(value, 10)
                    }
                    // Always emit as a LinkValue
                    this.$emit('input', value)
                }
            }
        }
    }
}
</script>
