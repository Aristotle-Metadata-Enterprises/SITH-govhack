import axios from 'axios'
import {NiceError} from 'src/lib/error.js'


function graphqlQuery(query, variables) {
    // Url for our registries graphql endpoint
    const graphql_url = 'https://registry.aristotlemetadata.com/api/graphql/json'
    const query_obj = {query: query, variables: variables}
    return axios.post(graphql_url, query_obj)
}


// Query a particular classification item
export function queryClassificationItem(uuid) {
    const query = `
   query ($uuid: UUID) {
        classificationItem (id: $uuid) {
            edges {
                node {
                        title
                        code
                        explanatoryNotes
                }
            }
        }
    }`

    return graphqlQuery(query, {uuid: uuid}).then((response) => {
        return response.data
    }).catch((error) => {
        throw new NiceError('Could not fetch clasification item metadata', error)
    })
}