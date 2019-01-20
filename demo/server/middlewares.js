/* eslint-disable no-console */

export default ({ request, response }) => {
  response.etag = 'YOLO'
  response.status = 200
  if (request.fresh) {
    console.log('FRESH')
    response.status = 304
    return
  }
  response.set('Cache-Control', 'no-cache')
  response.set('Expires', -1)
  response.body = '{ "message": "Hello!" }'
  response.type = 'json'
  console.log('-----')
  console.log(request)
  console.log(response)
}
