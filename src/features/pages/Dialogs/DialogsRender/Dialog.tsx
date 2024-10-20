import { DialogItem } from '../DialogItem'

type Dialogs = {
  id: string
  name: string
}

export const Dialog = () => {
  const mocDialog: Dialogs[] = [
    { id: '1', name: 'Dialog 1' },
    { id: '2', name: 'Dialog 2' },
  ]
  let dialogsMap = mocDialog.map((d: Dialogs) => <DialogItem key={d.id} id={d.id} name={d.name} />)

  return <>{dialogsMap}</>
}
