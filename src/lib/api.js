import axios from 'axios'
import {NiceError} from 'src/lib/error.js'


function graphqlQuery(query, variables) {
    // Url for our registries graphql endpoint
    const graphql_url = 'https://aristotle-te-govhack-20-qrjjxm.herokuapp.com/api/graphql/json'
    const query_obj = {query: query, variables: variables}
    return axios.post(graphql_url, query_obj, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
}


// Query a particular classification item
export function queryClassificationItem(uuid) {
    const query = `
    query ($uuid: UUID) {
        classificationItem (id: $uuid) {
            edges {
                node {
                    id
                    title
                    code
                    explanatoryNotes
                    correspondenceItemAsSource {
                        targetItem {
                          id
                          title
                        }
                    }        
                }
            }
        }
    }`

    return graphqlQuery(query, {uuid: uuid}).then((response) => {
        return response.data.data.classificationItem
    }).catch((error) => {
        throw new NiceError('Could not fetch classification item metadata', error)
    })
}
