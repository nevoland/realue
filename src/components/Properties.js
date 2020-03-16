import { $ } from '../tools/$'

export function Properties(props) {
  return $('pre', JSON.stringify(props, null, 2))
}
