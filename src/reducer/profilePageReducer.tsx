import dataState, { PostItem } from "src/state/dataState"
import { v1 } from "uuid"


export type AddPost = ReturnType<typeof addPostAC>

type ActionsType = AddPost


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
    default:
      throw new Error("error!");

  }
}

export const addPostAC = (textValue: string) => {
  return {
    type: 'ADD-POST', textValue
  }
}