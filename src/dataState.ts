export type Messages = {
    message: string
    id: number
  }


export type Dialogs = {
    name: string
    id: number
  }

 
export type DialogsPage  = {
  dialogsData: Dialogs[]
  messagesData: Messages[]
}
  
type RootDataState = {
  dialogsPage: DialogsPage
}

let dataState: RootDataState =  {
  dialogsPage: {
  dialogsData: [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
    { id: 4, name: 'Four' },
    { id: 5, name: 'Five' },
    { id: 6, name: 'Six' },
    { id: 7, name: 'Seven' },
  ],
  messagesData: [
    { id: 1, message: 'Hi, how is going?' },
    { id: 2, message: 'Where are you?' },
    { id: 3, message: 'Ok' },
    {
      id: 4, message: 'Don\'t ask'
    },
    { id: 5, message: 'Five' },
    { id: 6, message: 'Six' },
    { id: 7, message: 'Seven' },
  ]
  }
}

export default dataState;