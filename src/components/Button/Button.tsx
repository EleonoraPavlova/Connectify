import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import s from './button.module.scss'
import clsx from 'clsx'

type InferType<T> = T extends ElementType<infer U> ? U : never

type Props<T extends ElementType = 'button'> = {
  as?: T
  bold?: boolean
  variant?: 'icon' | 'link' | 'primary'
  fontSize?: 'small' | 'medium' | 'large'
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: Props<T>, ref: ForwardedRef<InferType<T>>) => {
    const { as: Component = 'button', className, bold, variant = 'primary', fontSize = 'small', ...rest } = props

    const cn = clsx(s.button, s[variant], s[fontSize], className, bold && s.bold)

    return <Component className={cn} ref={ref} {...rest} />
  }
)
