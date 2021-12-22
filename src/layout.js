import { Children, forwardRef } from 'react'
import { memoize, omitBy, isNil, some, isEmpty } from 'lodash'

import { $ } from './tools'

const { toArray } = Children

export const Flex = forwardRef(function Flex(
  {
    container = false,
    direction = 'row',
    wrap = false,
    align = container ? 'stretch' : null,
    justify = 'start',
    scroll = false,
    className,
    children,
    item = false,
    overflow = scroll
      ? item
        ? 'auto'
        : 'hidden'
      : container &&
        some(
          toArray(children),
          (child) => child && child.props && child.props.scroll,
        )
      ? 'hidden'
      : null,
    grow = false,
    shrink = overflow === 'hidden' ? true : !grow,
    basis = shrink && overflow !== 'hidden' ? 'auto' : '0',
    Component = 'div',
    onClick,
    onContextMenu,
    onDoubleClick,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onPointerCancel,
    onPointerDown,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    onPointerOut,
    onPointerOver,
    onPointerUp,
    onScroll,
    onTouchCancel,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onWheel,
    tabIndex,
    ...style
  },
  ref,
) {
  /*
  Abstracts usage of CSS flexbox.
  */
  return $(
    Component,
    {
      style: merge(
        flex(
          container,
          direction,
          wrap,
          grow,
          shrink,
          basis,
          item,
          align,
          justify,
          overflow,
        ),
        style,
      ),
      className,
      onClick,
      onContextMenu,
      onDoubleClick,
      onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onMouseOut,
      onMouseOver,
      onMouseUp,
      onPointerCancel,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      onPointerOut,
      onPointerOver,
      onPointerUp,
      onScroll,
      onTouchCancel,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      onWheel,
      tabIndex,
      ref,
    },
    children,
  )
})

function merge(a, b) {
  return isEmpty(b) ? a : { ...a, ...b }
}

const flex = memoize(
  (
    container,
    direction,
    wrap,
    grow,
    shrink,
    basis,
    item,
    align,
    justify,
    overflow,
  ) =>
    omitBy(
      {
        // Container
        display: container ? 'flex' : null,
        flexFlow: container ? `${direction} ${wrap ? 'wrap' : 'nowrap'}` : null,
        alignItems: container ? alignFlex(align) : null,
        justifyContent: container ? alignFlex(justify) : null,
        // Item
        flex: item
          ? `${grow ? '1' : '0'} ${shrink ? '1' : '0'} ${basis}`
          : null,
        alignSelf: !container ? alignFlex(align) : null,
        // Container and item
        overflow,
      },
      isNil,
    ),
  (...args) => (args.length === 1 ? `${args[0]}` : args.join(' ')),
)

function alignFlex(align) {
  return !align
    ? null
    : align === 'start' || align === 'end'
    ? `flex-${align}`
    : align
}

export const Box = forwardRef(function Box(
  { children, className, Component = 'div', ...style },
  ref,
) {
  /*
  Merges provided style properties into `style` property.
  */
  return $(Component, { style, className, ref }, children)
})
