import { Component as BaseComponent, createRef } from 'react'
import { memoize, get, pickBy } from 'lodash'
import { compose, branch, withHandlers, mapProps } from 'recompose'

import { syncedProp } from './properties'
import { $, hasProp, setWrapperName, getGlobal } from './tools'
import { EMPTY_OBJECT } from './immutables'

const PROP_NAMES = {
  accept: true,
  acceptCharset: true,
  accessKey: true,
  action: true,
  allowFullScreen: true,
  alt: true,
  async: true,
  autoComplete: true,
  autoFocus: true,
  autoPlay: true,
  capture: true,
  cellPadding: true,
  cellSpacing: true,
  challenge: true,
  charSet: true,
  checked: true,
  cite: true,
  classID: true,
  className: true,
  cols: true,
  colSpan: true,
  content: true,
  contentEditable: true,
  contextMenu: true,
  controls: true,
  controlsList: true,
  coords: true,
  crossOrigin: true,
  data: true,
  dateTime: true,
  default: true,
  defer: true,
  dir: true,
  disabled: true,
  download: true,
  draggable: true,
  encType: true,
  form: true,
  formAction: true,
  formEncType: true,
  formMethod: true,
  formNoValidate: true,
  formTarget: true,
  frameBorder: true,
  headers: true,
  height: true,
  hidden: true,
  high: true,
  href: true,
  hrefLang: true,
  htmlFor: true,
  httpEquiv: true,
  icon: true,
  id: true,
  inputMode: true,
  integrity: true,
  is: true,
  keyParams: true,
  keyType: true,
  kind: true,
  label: true,
  lang: true,
  list: true,
  loop: true,
  low: true,
  manifest: true,
  marginHeight: true,
  marginWidth: true,
  max: true,
  maxLength: true,
  media: true,
  mediaGroup: true,
  method: true,
  min: true,
  minLength: true,
  multiple: true,
  muted: true,
  name: true,
  nonce: true,
  noValidate: true,
  onAbort: true,
  onAnimationEnd: true,
  onAnimationIteration: true,
  onAnimationStart: true,
  onBlur: true,
  onCanPlay: true,
  onCanPlayThrough: true,
  onChange: true,
  onClick: true,
  onCompositionEnd: true,
  onCompositionStart: true,
  onCompositionUpdate: true,
  onContextMenu: true,
  onCopy: true,
  onCut: true,
  onDoubleClick: true,
  onDrag: true,
  onDragEnd: true,
  onDragEnter: true,
  onDragExit: true,
  onDragLeave: true,
  onDragOver: true,
  onDragStart: true,
  onDrop: true,
  onDurationChange: true,
  onEmptied: true,
  onEncrypted: true,
  onEnded: true,
  onError: true,
  onFocus: true,
  onGotPointerCapture: true,
  onInput: true,
  onInvalid: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onLoad: true,
  onLoadedData: true,
  onLoadedMetadata: true,
  onLoadStart: true,
  onLostPointerCapture: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOut: true,
  onMouseOver: true,
  onMouseUp: true,
  onPaste: true,
  onPause: true,
  onPlay: true,
  onPlaying: true,
  onPointerCancel: true,
  onPointerDown: true,
  onPointerEnter: true,
  onPointerLeave: true,
  onPointerMove: true,
  onPointerOut: true,
  onPointerOver: true,
  onPointerUp: true,
  onProgress: true,
  onRateChange: true,
  onScroll: true,
  onSeeked: true,
  onSeeking: true,
  onSelect: true,
  onStalled: true,
  onSubmit: true,
  onSuspend: true,
  onTimeUpdate: true,
  onToggle: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchMove: true,
  onTouchStart: true,
  onTransitionEnd: true,
  onVolumeChange: true,
  onWaiting: true,
  onWheel: true,
  open: true,
  optimum: true,
  pattern: true,
  placeholder: true,
  poster: true,
  preload: true,
  profile: true,
  radioGroup: true,
  readOnly: true,
  rel: true,
  required: true,
  reversed: true,
  role: true,
  rows: true,
  rowSpan: true,
  sandbox: true,
  scope: true,
  scoped: true,
  scrolling: true,
  seamless: true,
  selected: true,
  shape: true,
  size: true,
  sizes: true,
  span: true,
  spellCheck: true,
  src: true,
  srcDoc: true,
  srcLang: true,
  srcSet: true,
  start: true,
  step: true,
  style: true,
  summary: true,
  tabIndex: true,
  target: true,
  title: true,
  type: true,
  useMap: true,
  value: true,
  width: true,
  wmode: true,
  wrap: true,
}

/*
Only keeps DOM properties.
*/
export const domProps = mapProps((props) =>
  pickBy(props, (value, name) => PROP_NAMES[name] === true),
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

export const withNode = (Component) =>
  /*
  Injects a `node` reference created with `React.createRef()` to be applied on any element through the `ref` attribute.
  */
  setWrapperName(
    Component,
    class withNode extends BaseComponent {
      constructor(props) {
        super(props)
        this.node = createRef()
      }
      render() {
        return $(Component, { ...this.props, node: this.node })
      }
    },
  )
