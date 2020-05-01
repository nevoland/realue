import { compose } from 'recompose'
import { map } from 'lodash'

import {
  cache,
  fetch,
  json,
  retry,
  toFetchQuery,
  queryString,
  searchParams,
  aggregate,
  logQuery,
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
  logQuery(),
  aggregate(),
  toFetchQuery(
    {
      value: {
        get: () => '/value',
        put: () => '/value',
      },
      device: {
        get: (query) => `/device/${query.value.id}`,
        list: (query) => `/device?${qs(query)}`,
      },
      user: {
        get: (query) => `/user/${query.value.id}`,
        list: (query) => `/user?${qs(query)}`,
      },
      person: {
        get: (query) => `/person/${query.value.id}`,
      },
      something: {
        get: () => `http://test.bonnet.cc/something`,
      },
    },
    (query) => {
      query.url =
        query.url[0] === '/' ? `http://localhost:4000${query.url}` : query.url
      return query
    },
  ),
  retry(),
  cache({
    serialize: (query) => query.method === 'GET' && query.url,
  }),
  json,
  fetch(),
)()
