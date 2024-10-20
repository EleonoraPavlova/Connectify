import './index.scss'

type Props = {
  id: string
  message: string
}

export const DialogMessage = ({ id, message }: Props) => {
  return (
    <li className="dialog-message" id={`${id}`}>
      {message}
    </li>
  )
}
