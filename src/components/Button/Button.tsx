import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import s from './button.module.scss'
import clsx from 'clsx'

type InferType<T> = T extends ElementType<infer U> ? U : never

type Props<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'icon' | 'link' | 'primary'
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: Props<T>, ref: ForwardedRef<InferType<T>>) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

    const cn = clsx(s.button, s[variant], className, fullWidth && s.fullWidth)

    return <Component className={cn} ref={ref} {...rest} />
  }
)

// import { memo } from 'react'
// import s from './button.module.scss'

// type Props = {
//   name: string
//   additionalClass: string
//   disabled?: boolean
//   callBack?: (() => void) | undefined
// }

// export const Button = memo(({ name, additionalClass, disabled, callBack }: Props) => {
//   const onClickHandler = () => {
//     if (callBack) callBack()
//   }

//   return (
//     <button className={`button ${additionalClass}`} type="submit" onClick={onClickHandler} disabled={disabled}>
//       {name}
//     </button>
//   )
// })
