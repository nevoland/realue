import { compose } from 'recompose'
import { map } from 'lodash'

import {
  cache,
  fetchJson,
  retry,
  toFetchQuery,
  queryString,
  searchParams,
  aggregate,
} from '../../src/queries'

function updateParams(params) {
  if (!params.order) {
    return params
  }
  params.order = map(
    params.order,
    ({ key, descending = false }) => `${descending ? '-' : ''}${key}`,
  )
  params.only = params.fields
  params.fields = null
  return params
}

function qs(query) {
  return queryString(updateParams(searchParams(query)))
}

export const request = compose(
  cache(),
  aggregate(),
  retry(),
  toFetchQuery(
    {
      value: {
        get: () => '/value',
        put: () => '/value',
      },
      device: {
        get: query => `/device/${query.value.id}`,
        list: query => `/device?${qs(query)}`,
      },
      user: {
        get: query => `/user/${query.value.id}`,
        list: query => `/user?${qs(query)}`,
      },
    },
    query => {
      query.url = `http://localhost:4000${query.url}`
      return query
    },
  ),
)(fetchJson()())
