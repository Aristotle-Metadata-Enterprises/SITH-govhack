import { buildElement } from 'src/lib/html.js'
import $ from "jquery";

// DAL needs the full version
import 'select2/dist/js/select2.full.js'
import 'select2/dist/css/select2.css'


// Initialize all dal elements (urlFunc is optional)

// Build initial select2 element
function buildSelect2item(id, text, url, showId) {
    let strong = document.createElement('strong')
    strong.appendChild(document.createTextNode(text + ' '))
    if (showId) {
        // Add elements to strong element
        strong.appendChild(buildElement('small', {}, `(id: ${id}) `))
    }

    // Create and append link if we have a url
    if (url) {
        // Build link element
        let link = buildElement(
            'a', {'class': 'ac_preview_link', 'href': url, 'target': 'preview', 'title': 'Open in a new window',},
        )
        link.appendChild(buildElement('i', {'class': 'fa fa-external-link-square'}))
        // When clicking link open in small window
        link.addEventListener('click', () => {
            window.open(url, 'preview', 'height=600,width=650,resizeable=yes,scrollbars=yes')
        })
        strong.appendChild(link)
    }
    return strong
}

// Get function used to template result
function templateResultHtml(item) {
    if (item.selected_text) {
        var $result = $('<span>')
        $result.html(item.selected_text)
        $result.on('mouseup', '.ac_preview_link', function(e) {
            e.stopPropagation()
        });
        return $result
    }
    return item.text
}


// Create the select option element using local html creation, rather than getting HTML content from the API
function templateSelectionLocal(item) {
    if (item.id === '') {
        // This is a blank entry, return nothing
        return item.text
    }
    let displayId = item.element.getAttribute('data-display-id')
    let itemUrl = item.element.getAttribute('data-item-url')

    if (!displayId) {
        displayId = item.id
    }
    return buildSelect2item(displayId, item.text, itemUrl)
}


// Initialize a custom select2 box using templating functions from dal
// This is used in vue components to make boxes that look and behave like our dal ones
export function initCustomSelect2(element, options) {
    options.templateResult = templateResultHtml
    options.templateSelection = templateSelectionLocal

    $(element).select2(options)
}
