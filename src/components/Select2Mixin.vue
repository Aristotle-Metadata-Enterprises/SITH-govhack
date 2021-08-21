<template>
    <div class="vue-select2">
        <select :class="{textCenter: isCentered}"
                :style="{minWidth: width}" ref="select"
        />
    </div>
</template>

<script>
import {initCustomSelect2} from 'src/lib/dal_simple_init.js'
import {idtype} from '../lib/enum.js'

export default {
    props: {
        // The selected value
        value: {
            required: true
        },
        // The width of the select2 component
        width: {
            type: Number,
            default: 50,
        },
        isCentered: {
            type: Boolean,
            default: false
        },
        // Whether the component allows multiple selects or not
        multiple: {
            type: Boolean,
            default: false
        },
        // Whether select boxes are allowed to be cleared
        allowClear: {
            type: Boolean,
            default: true,
        },
        // Placeholder text for the empty option
        placeholder: {
            type: String,
            default: ""
        },
        // Whether to select values by id or uuid
        selectBy: {
            type: Number,
            default: idtype.UUID,
            validator: function (value) {
                // Must be a valid value in the idtype object
                return (Object.values(idtype).indexOf(value) !== -1)
            }
        },
        objUuid: {
            type: String,
        },
    },
    computed: {
        hasValue: function () {
            return this.identifier !== null
        },
        identifier: function () {
            return this.value
        }
    },
    methods: {
        getItemIdentifier: function () {
            // Returns a string for the value
            return (this.selectBy === idtype.ID ? 'id' : 'uuid')
        },
        // Check if select2 has an option for the given identifier
        hasOption: function (identifier) {
            for (const option of this.$refs.select.options) {
                if (identifier && option.value === identifier.toString()) {
                    return true
                }
            }
            return false
        },
        // Add an option to the select box for the given autocomplete item, also handle showing multiple options
        addOption: function (item) {
            if (Array.isArray(item)) {
                item.map(i => {
                    let option = document.createElement('option')
                    let item_identifer = this.getItemIdentifier()
                    option.value = i[item_identifer]
                    option.setAttribute('data-display-id', i.id)
                    if (i.url) {
                        option.setAttribute('data-item-url', i.url)
                    }
                    option.setAttribute('title', i.title)
                    option.appendChild(document.createTextNode(i.title))
                    this.$refs.select.appendChild(option)
                })
            } else {
                let option = document.createElement('option')
                let item_identifer = this.getItemIdentifier()
                if (item) {
                    option.value = item[item_identifer]
                    option.setAttribute('data-display-id', item.id)
                    if (item.url) {
                        option.setAttribute('data-item-url', item.url)
                    }
                    option.setAttribute('title', item.title)
                    option.appendChild(document.createTextNode(item.title))
                    this.$refs.select.appendChild(option)
                }
            }
        },
        getDropdownCssClass: function () {
            // Return either the single, or multiple dropdown class depending on selection
            // return 'aristotle-selct2-multiple'
            return (this.isMultiple ? 'aristotle-select2-multiple' : 'aristotle-select2')
        },
        initializeSelect2: function (u) {
            let options = {
                multiple: this.isMultiple,
                allowClear: this.allowClear,
                placeholder: this.placeholder,
                containerCssClass: 'vue-select2-container',
                dropdownCssClass: this.getDropdownCssClass(),
                ajax: {
                    url: this.completeUrl,
                    dataType: 'json',
                    cache: true,
                    data: (params) => ({
                        q: params.term,
                        page: params.page
                    }),
                    processResults: function (data) {
                        $.each(data.results, function (index, value) {
                            // Change the id of dataelement and dsscluster's child to id instead of uuid (because these two are saved to api by id)
                            var dtype = null
                            if (value.url) {
                                dtype = value.url.split("/")[value.url.split("/").length - 2]
                            }
                            if (dtype && (dtype === 'dataelement' || dtype === 'datasetspecification')) {
                                value.id
                            } else if (value.uuid) {
                                value.id = value.uuid
                            }
                        })
                        //delete invalid dss from cluster child options
                        if (u) {
                            for (var i = 0; i < data.results.length; i++) {
                                if (data.results[i].uuid == u) {
                                    data.results.splice(i, 1)
                                }
                            }
                        }
                        return data
                    },
                }
            }
            initCustomSelect2(this.$refs.select, options)

            let element = $(this.$refs.select)
            if (this.hasValue) {
                // if the value is an array(multiple choices)
                if (Array.isArray(this.value)) {
                    element.val(this.value)
                } else {
                    element.val(this.identifier)
                }
            }
            element.trigger('change', {fromValue: true})
            element.on('change', this.emitValue)
        }
    }
}
</script>

<style>
/* This css is not vue scoped since DOM elements inserted via select2 need to be styled
Rules here should only apply under the "vue-select2" class
 */
.vue-select2 {
    display: block;
}

.vue-select2 > span.select2 {
    min-width: 500px;
    /* if you add this back, please double check that the bulk downloader works */
    /*z-index: 1000; */
}

</style>
