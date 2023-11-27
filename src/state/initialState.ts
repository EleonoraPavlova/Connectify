import { v1 } from "uuid";

export type MessagesType = {
  message: string
  id: string
}


export type DialogsType = {
  name: string
  id: string
}

export type DialogsPage = {
  dialogsData: DialogsType[]
  messagesData: MessagesType[]
}

export type PostItem = {
  title: string
  id: string
  post: string
  likeCounter: number
  authorId: string
}

export type ProfilePage = {
  postsData: PostItem[]
}


export type FriendItem = {
  name?: string
  id: string
  lastName?: string
  src: string
}

export type FriendsPage = {
  friendsData: FriendItem[]
}

export type usersItem = {
  id: string,
  topic: string,
  firstName: string,
  lastName: string,
  followed: boolean,
  src: string
  location: { city: string, country: string }
}

export type UsersPage = {
  usersData: usersItem[]
}

type RootDataState = {
  dialogsPage: DialogsPage
  profilePage: ProfilePage
  friendsPage: FriendsPage
  usersPage: UsersPage
}

export const friendsData = [
  { id: v1(), name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg' },
  { id: v1(), name: 'Andre', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg' },
  { id: v1(), name: 'Makar', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg' },
  { id: v1(), name: 'Tatiana', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg' },
  { id: v1(), name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg' },
  { id: v1(), name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2017/08/10/15/06/girl-2623543_1280.jpg' },
  { id: v1(), name: 'Irina', lastName: "LastName", src: 'https://cdn.pixabay.com/photo/2020/02/20/23/21/woman-4866179_1280.jpg' }
]

let dataState: RootDataState = {
  dialogsPage: {
    dialogsData: [
      { id: v1(), name: 'One' },
      { id: v1(), name: 'Two' },
      { id: v1(), name: 'Three' },
      { id: v1(), name: 'Four' },
      { id: v1(), name: 'Five' },
      { id: v1(), name: 'Six' },
      { id: v1(), name: 'Seven' },
    ],
    messagesData: [
      { id: v1(), message: 'Hi, how is going?' },
      { id: v1(), message: 'Where are you?' },
      { id: v1(), message: 'Ok' },
      { id: v1(), message: 'Don\'t ask' },
      { id: v1(), message: 'Five' },
      { id: v1(), message: 'Six' },
      { id: v1(), message: 'Seven' },
    ]
  },
  profilePage: {
    postsData: [
      { id: v1(), title: '1', post: 'There is a post 1 here...', likeCounter: 12, authorId: friendsData[0].id, },
      { id: v1(), title: '2', post: 'There is a post 2 here...', likeCounter: 12, authorId: friendsData[1].id, },
      { id: v1(), title: '3', post: 'There is a post 3 here...', likeCounter: 12, authorId: friendsData[2].id, },
      { id: v1(), title: '4', post: 'There is a post 4 here...', likeCounter: 12, authorId: friendsData[3].id, },
      { id: v1(), title: '5', post: 'There is a post 4 here...', likeCounter: 12, authorId: friendsData[4].id, },
      { id: v1(), title: '6', post: 'There is a post 4 here...', likeCounter: 12, authorId: friendsData[5].id, },
      { id: v1(), title: '7', post: 'There is a post 7 here...', likeCounter: 12, authorId: friendsData[6].id, },
    ]
  },
  friendsPage: {
    friendsData: friendsData
  },
  usersPage: {
    usersData: [
      {
        id: v1(), topic: 'I am a boss', firstName: 'Ben', lastName: "Carlisle", followed: false,
        src: "https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg", location: { city: "Kyiv", country: "Ukraine" }
      },
      {
        id: v1(), topic: 'I am a boss', firstName: 'Ben', lastName: "Carlisle", followed: true,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRRXSr4fj9_S-uoxa5iCQFditPI-kM1E6ZwQ&usqp=CAU", location: { city: "Valencia", country: "Spain" }
      },
      {
        id: v1(), topic: 'I am a boss', firstName: 'Ben', lastName: "Carlisle", followed: false,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRRXSr4fj9_S-uoxa5iCQFditPI-kM1E6ZwQ&usqp=CAU", location: { city: "Kyiv", country: "Ukraine" }
      },
      {
        id: v1(), topic: 'I am a boss', firstName: 'Ben', lastName: "Carlisle", followed: true,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRRXSr4fj9_S-uoxa5iCQFditPI-kM1E6ZwQ&usqp=CAU", location: { city: "Kyiv", country: "Ukraine" }
      },
      {
        id: v1(), topic: 'I am a boss', firstName: 'Ben', lastName: "Carlisle", followed: false,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ufOqFL6mbhJnkjVRCn4qf7mW-qSns1EvJA&usqp=CAU", location: { city: "Kyiv", country: "Ukraine" }
      },
      {
        id: v1(), topic: 'I am a boss', firstName: 'Sochnik', lastName: "Juicy", followed: false,
        src: "https://imageup.ru/img78/4593159/photo_2023-10-28-144747.jpeg", location: { city: "Epsom", country: "Uk" }
      },
      {
        id: v1(), topic: 'I am a boss', firstName: 'Sasha', lastName: "Carlisle", followed: true,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ufOqFL6mbhJnkjVRCn4qf7mW-qSns1EvJA&usqp=CAU", location: { city: "Kyiv", country: "Ukraine" }
      }
    ]
  },
}

export default dataState;