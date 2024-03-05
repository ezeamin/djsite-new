'use client';

import {
  AlignContentTypes,
  AlignItemsTypes,
  GapTypes,
  JustifyContentTypes,
  LgColTypes,
  MdColTypes,
  RowSpanTypes,
  SmColTypes,
  VerticalAlignTypes,
  XlColTypes,
  XsColTypes,
} from './Grid.classes';

import { cn, removeLineBreaks } from '@/utilities';

import type { GridProps } from './Grid.types';

/**
 * A custom Grid component.
 *
 * @param props - The component props.
 * @param alignContent - How rows are positioned in multi-row flex and grid containers.
 * @param className - Additional class names to apply to the icon container.
 * @param component - The component to render.
 * @param container - For fixing an element's width to the current breakpoint.
 * @param gap - Distance between elements.
 * @param item - To control the flexbox behavior of an element.
 * @param justifyContent - How flex and grid items are positioned along a container's main axis.
 * @param md - How elements are sized and placed across grid columns using responsive design.
 * @param lg - How elements are sized and placed across grid columns using responsive design.
 * @param rowSpan - How elements are sized and placed across grid rows.
 * @param sm - How elements are sized and placed across grid columns using responsive design.
 * @param verticalAlign - How an individual flex or grid item is positioned along its container's cross axis.
 * @param xs - How elements are sized and placed across grid columns using responsive design.
 * @returns JSX.Element The rendered Icon component.
 *
 * ```
 * @example
 *
 * - Standalone usage:
 * <Grid container><Grid item>Some content</Grid></Grid>
 * ```
 */

const Grid = (props: GridProps): JSX.Element => {
  const {
    alignContent = '',
    alignItems = '',
    children,
    className = '',
    component: Component = 'div',
    container = false,
    gap = 0,
    item = false,
    justifyContent = '',
    xl,
    lg,
    md,
    rowSpan = 1,
    sm,
    xs,
    verticalAlign = '',
    ...rest
  } = props;

  const classes = (): string => {
    if (container) {
      return cn(
        removeLineBreaks`grid grid-cols-12
      ${gap ? GapTypes[gap] : ''}
      ${alignContent ? AlignContentTypes[alignContent] : ''}
      ${alignItems ? AlignItemsTypes[alignItems] : ''}
      ${justifyContent ? JustifyContentTypes[justifyContent] : ''}
      ${RowSpanTypes[rowSpan]}
      `,
        className
      );
    }

    if (item && xs) {
      return cn(
        removeLineBreaks`${XsColTypes[xs]}
        ${xl ? XlColTypes[xl] : ''}
        ${lg ? LgColTypes[lg] : ''}
        ${md ? MdColTypes[md] : ''}
        ${sm ? SmColTypes[sm] : ''}
        ${verticalAlign ? VerticalAlignTypes[verticalAlign] : ''}
        ${alignContent ? AlignContentTypes[alignContent] : ''}
        ${alignItems ? AlignItemsTypes[alignItems] : ''}
        ${justifyContent ? JustifyContentTypes[justifyContent] : ''}
      `,
        className
      );
    }

    return '';
  };

  return (
    <Component className={classes()} {...rest}>
      {children}
    </Component>
  );
};

export default Grid;
