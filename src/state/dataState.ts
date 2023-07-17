export type Messages = {
  message: string
  id: number
}


export type Dialogs = {
  name: string
  id: number
}


export type DialogsPage = {
  dialogsData: Dialogs[]
  messagesData: Messages[]
}

export type PostItem = {
  title: string
  id: number
  post: string
  likeCounter: number
}

export type ProfilePage = {
  postsData: PostItem[]
}

type RootDataState = {
  dialogsPage: DialogsPage
  profilePage: ProfilePage
}

let dataState: RootDataState = {
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
  },
  profilePage: {
    postsData: [
      { id: 1, title: '1', post: 'There is a post 1 here...', likeCounter: 12 },
      { id: 2, title: '2', post: 'There is a post 2 here...', likeCounter: 12 },
      { id: 3, title: '3', post: 'There is a post 3 here...', likeCounter: 12 },
      { id: 4, title: '4', post: 'There is a post 4 here...', likeCounter: 12 },
      { id: 5, title: '5', post: 'There is a post 4 here...', likeCounter: 12 },
      { id: 6, title: '6', post: 'There is a post 4 here...', likeCounter: 12 },
      { id: 7, title: '7', post: 'There is a post 7 here...', likeCounter: 12 },
    ]
  }
}

export default dataState;