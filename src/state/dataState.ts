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


export type FriendItem = {
  name: string
  id?: number
  lastName: string
  src: string
}

export type FriendsPage = {
  friendsData: FriendItem[]
}

type RootDataState = {
  dialogsPage: DialogsPage
  profilePage: ProfilePage
  friendsPage: FriendsPage
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
  },
  friendsPage: {
    friendsData: [
      { id: 1, name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg' },
      { id: 2, name: 'Andre', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg' },
      { id: 3, name: 'Makar', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg' },
      { id: 4, name: 'Tatiana', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg' },
      { id: 5, name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg' },
      { id: 6, name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2017/08/10/15/06/girl-2623543_1280.jpg' },
      { id: 7, name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2020/02/20/23/21/woman-4866179_1280.jpg' },
    ]
  }
}

export default dataState;