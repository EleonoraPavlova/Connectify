import dataState, { PostItem } from "src/state/dataState"
import { v1 } from "uuid"

export type AddPost = ReturnType<typeof addPostAC>
export type UpdatePost = ReturnType<typeof UpdatePostAC>


type ActionsType = AddPost | UpdatePost


export const initialState = dataState.profilePage.postsData

//НЕЛЬЗЯ МЕНЯТЬ ТОТ state КОТОРЫЙ ПРИШЕЛ! РАБОТАТЬ ТОЛЬКО С КОПИЕЙ!
export const profilePageReducer = (state: PostItem[] = initialState, action: ActionsType): PostItem[] => {
  switch (action.type) {
    case "ADD-POST":
      let newPost = {
        title: "New Post",
        id: v1(),
        post: action.textValue,
        likeCounter: Math.floor(Math.random() * 100),
        authorId: dataState.friendsPage.friendsData[3].id,
        src: 'https://cdn.pixabay.com/photo/2020/02/20/23/21/woman-4866179_1280.jpg'
      }
      return [newPost, ...state]
    case "UPDATE-POST":
      return state;
    default:
      return state;
  }
}

export const addPostAC = (textValue: string) => {
  return {
    type: 'ADD-POST', textValue
  } as const
}

export const UpdatePostAC = (textValue: string, postId: string) => {
  return {
    type: 'UPDATE-POST', textValue, postId
  } as const
}