import { createElement as $, Component as BaseComponent } from 'react'
import { memoize, get, pickBy } from 'lodash'
import { compose, branch, withHandlers, mapProps } from 'recompose'

import { syncedProp } from './properties'
import { hasProp, setWrapperName, getGlobal } from './tools'
import { EMPTY_OBJECT } from './immutables'

const PROP_NAMES = {
  accept: null,
  acceptCharset: null,
  accessKey: null,
  action: null,
  allowFullScreen: null,
  alt: null,
  async: null,
  autoComplete: null,
  autoFocus: null,
  autoPlay: null,
  capture: null,
  cellPadding: null,
  cellSpacing: null,
  challenge: null,
  charSet: null,
  checked: null,
  cite: null,
  classID: null,
  className: null,
  colSpan: null,
  cols: null,
  content: null,
  contentEditable: null,
  contextMenu: null,
  controls: null,
  controlsList: null,
  coords: null,
  crossOrigin: null,
  data: null,
  dateTime: null,
  default: null,
  defer: null,
  dir: null,
  disabled: null,
  download: null,
  draggable: null,
  encType: null,
  form: null,
  formAction: null,
  formEncType: null,
  formMethod: null,
  formNoValidate: null,
  formTarget: null,
  frameBorder: null,
  headers: null,
  height: null,
  hidden: null,
  high: null,
  href: null,
  hrefLang: null,
  htmlFor: null,
  httpEquiv: null,
  icon: null,
  id: null,
  inputMode: null,
  integrity: null,
  is: null,
  keyParams: null,
  keyType: null,
  kind: null,
  label: null,
  lang: null,
  list: null,
  loop: null,
  low: null,
  manifest: null,
  marginHeight: null,
  marginWidth: null,
  max: null,
  maxLength: null,
  media: null,
  mediaGroup: null,
  method: null,
  min: null,
  minLength: null,
  multiple: null,
  muted: null,
  name: null,
  noValidate: null,
  nonce: null,
  open: null,
  optimum: null,
  pattern: null,
  placeholder: null,
  poster: null,
  preload: null,
  profile: null,
  radioGroup: null,
  readOnly: null,
  rel: null,
  required: null,
  reversed: null,
  role: null,
  rowSpan: null,
  rows: null,
  sandbox: null,
  scope: null,
  scoped: null,
  scrolling: null,
  seamless: null,
  selected: null,
  shape: null,
  size: null,
  sizes: null,
  span: null,
  spellCheck: null,
  src: null,
  srcDoc: null,
  srcLang: null,
  srcSet: null,
  start: null,
  step: null,
  style: null,
  summary: null,
  tabIndex: null,
  target: null,
  title: null,
  type: null,
  useMap: null,
  value: null,
  width: null,
  wmode: null,
  wrap: null,
}

/*
Only keeps DOM properties.
*/
export const domProps = mapProps((props) =>
  pickBy(props, (value, name) => name in PROP_NAMES),
)

class Refresher {
  constructor() {
    this.elements = []
    this.refresh = false
    const {
      setTimeout,
      requestAnimationFrame = (callback) => setTimeout(callback, 0),
    } = getGlobal()
    const state = EMPTY_OBJECT
    this.tick = () => {
      if (!this.refresh) {
        return
      }
      const { elements } = this
      const { length } = elements
      for (let i = 0; i < length; i++) {
        elements[i].setState(state)
      }
      requestAnimationFrame(this.tick)
    }
    this.start = () => {
      this.refresh = true
      requestAnimationFrame(this.tick)
    }
  }

  add(element) {
    const { elements } = this
    if (elements.length === 0) {
      this.start()
    }
    elements.push(element)
  }

  remove(element) {
    const { elements } = this
    const index = elements.indexOf(element)
    if (index === -1) {
      return
    }
    elements.splice(index, 1)
    if (elements.length === 0) {
      this.refresh = false
    }
  }
}

export const refreshed = (() => {
  const refresher = new Refresher()
  return (Component) =>
    /*
    Re-renders the component at the browser refresh rate, using `requestAnimationFrame`.
    */
    setWrapperName(
      Component,
      class refreshed extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = {}
        }
        componentDidMount() {
          refresher.add(this)
        }
        componentWillUnmount() {
          refresher.remove(this)
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
})()

function onChangeFromPath(path) {
  switch (path) {
    case 'target.value':
      return ({ onChange, name }) => (event) =>
        onChange(event.target.value, name, event)
    case 'target.checked':
      return ({ onChange, name }) => (event) =>
        onChange(event.target.checked, name, event)
    case undefined:
    case null:
      return ({ value, onChange, name }) => (event) =>
        onChange(value, name, event)
    default:
      return ({ onChange, name }) => (event) =>
        onChange(get(event, path), name, event)
  }
}

export const fromEvent = memoize((path) => {
  /*
  Creates an `onChange` handler that takes the value from `get(event, path)`.
  If `path` is `nil`, the value is taken from the `value` prop instead.
  */
  return branch(
    hasProp('onChange'),
    withHandlers({ onChange: onChangeFromPath(path) }),
  )
})

export const syncedFocus = branch(
  /*
  Exposes the synced `focus` state of an element through the `onFocus()` and `onBlur()` event listener callbacks.
  */
  hasProp('node'),
  compose(
    withHandlers({
      onPullFocus: ({ node }) => (focus) => {
        node[focus ? 'focus' : 'blur']()
        return focus
      },
    }),
    syncedProp('focus'),
    withHandlers({
      onFocus: ({ onChangeFocus }) => () => onChangeFocus(true),
      onBlur: ({ onChangeFocus }) => () => onChangeFocus(false),
    }),
  ),
)

export function onKeysDown(keys) {
  /*
  Triggers the specified `keys` handlers on key down. Each handler is called with the current `(props, event)`.
  */
  return withHandlers({
    onKeyDown: (props) => (event) => {
      const handler = keys[event.key]
      if (handler == null) {
        return
      }
      handler(props, event)
    },
  })
}
