import { Component as BaseComponent, createRef } from 'react'
import {
  memoize,
  get,
  pickBy,
  pull,
  fromPairs,
  map,
  intersection,
  debounce,
  pick,
} from 'lodash'
import { compose, branch, withHandlers, mapProps } from 'recompose'

import { syncedProp, withEffect } from './properties'
import { $, hasProp, setWrapperName, getGlobal } from './tools'
import { interval } from './promises'
import { same } from './immutables'

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

export const refreshable = (Component) =>
  /*
  Adds an `onRefresh` prop that enables refreshing the component.
  */
  setWrapperName(
    Component,
    class withRefresh extends BaseComponent {
      constructor(props) {
        super(props)
        this.onRefresh = (callback) => this.forceUpdate(callback)
      }
      render() {
        return $(Component, { ...this.props, onRefresh: this.onRefresh })
      }
    },
  )

export const refreshed = compose(
  /*
  Refreshes the component at a given `delay` interval. See `interval` for the behavior based on `delay`.
  */
  refreshable,
  withEffect(['delay'], ({ delay, onRefresh }) => interval(delay, onRefresh)),
)

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

  Example:

    const Example = withNode(({ node }) =>
      $('div', { ref: node }, node.current ? 'Referenced' : 'Not referenced'),
    )
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

const DEFAULT_BOUNDS_PROPERTIES = ['height', 'width', 'top', 'left']

const DEFAULT_OFFSET = (node) => node.getBoundingClientRect()

export function withBounds(
  properties = DEFAULT_BOUNDS_PROPERTIES,
  offset = DEFAULT_OFFSET,
) {
  /*
  Injects bounds `properties` returned from `offset(node.current)`.

  Example:

    withBounds(['width', 'height'])(({ width, height }) =>
      $('div', null, 'Dimensions: ', width, ' x ', height),
    )
  */
  const defaultState = fromPairs(map(properties, (property) => [property, 0]))
  return (Component) =>
    setWrapperName(
      Component,
      class withBounds extends BaseComponent {
        constructor(props) {
          super(props)
          const { delay = 0 } = props
          this.state = defaultState
          this.updateBounds = debounce(() => {
            const { node } = this.props
            const element =
              node == null ? node : node.current ? node.current : node
            if (element == null) {
              return
            }
            const state = pick(offset(element), properties)
            if (!same(state, this.state, properties)) {
              this.setState(state)
            }
          }, delay)
        }
        componentDidMount() {
          const { updateBounds } = this
          GLOBAL_LISTENERS.subscribe('onResize', updateBounds, true)
          if (intersection(properties, ['top', 'left']).length) {
            GLOBAL_LISTENERS.subscribe('onScroll', updateBounds, true)
          }
          GLOBAL_LISTENERS.subscribe('onOrientationChange', updateBounds, true)
          updateBounds()
        }
        componentDidUpdate() {
          this.updateBounds()
        }
        componentWillUnmount() {
          const { updateBounds } = this
          GLOBAL_LISTENERS.unsubscribe('onResize', updateBounds, true)
          if (intersection(properties, ['top', 'left']).length) {
            GLOBAL_LISTENERS.unsubscribe('onScroll', updateBounds, true)
          }
          GLOBAL_LISTENERS.unsubscribe(
            'onOrientationChange',
            updateBounds,
            true,
          )
        }
        render() {
          return $(Component, {
            ...this.props,
            ...this.state,
            updateBounds: this.updateBounds,
          })
        }
      },
    )
}

const EVENT_MAPPING = {
  onMouseUp: 'mouseup',
  onMouseMove: 'mousemove',
  onMouseDown: 'mousedown',
  onTouchStart: 'touchstart',
  onTouchMove: 'touchmove',
  onTouchEnd: 'touchend',
  onTouchCancel: 'touchcancel',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onClick: 'click',
  onScroll: 'scroll',
  onResize: 'resize',
  onOrientationChange: 'orientationchange',
}

const GLOBAL_LISTENERS = {
  listeners: {},
  observers: {},
  subscribe(eventType, observer, capture = false) {
    const nativeEventType = EVENT_MAPPING[eventType]
    const global = getGlobal()
    if (!(`on${nativeEventType}` in global)) {
      return
    }
    if (this.listeners[eventType] == null) {
      this.listeners[eventType] = {}
      this.observers[eventType] = {}
    }
    if (this.observers[eventType][capture] == null) {
      const observers = (this.observers[eventType][capture] = [])
      global.addEventListener(
        nativeEventType,
        (this.listeners[eventType][capture] = (event) => {
          const { length } = observers
          for (let i = 0; i < length; i++) {
            observers[i](event)
          }
        }),
        capture,
      )
    }
    this.observers[eventType][capture].push(observer)
  },
  unsubscribe(eventType, observer, capture = false) {
    const nativeEventType = EVENT_MAPPING[eventType]
    const global = getGlobal()
    if (!(`on${nativeEventType}` in global)) {
      return
    }
    if (pull(this.observers[eventType][capture], observer).length === 0) {
      global.removeEventListener(
        nativeEventType,
        this.listeners[eventType][capture],
        capture,
      )
      this.observers[eventType][capture] = null
    }
  },
}
