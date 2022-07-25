import { gql } from "@apollo/client";

export const ALL_ANIME = gql`
    query AllAnime($page: Int, $perpage: Int){
    Page(page:$page, perPage:$perpage){
      media(type: ANIME, sort: TRENDING_DESC){
        id
        title{
          romaji
        }
        coverImage{
          large
        }
      }
    }
  }
`

export const detail_anime = gql`
  query animeDetail($id:Int){
    Page(page:1,perPage:1){
      media(type:ANIME, id:$id){
      title{
        romaji
      }
      coverImage{
        extraLarge
      }
      status
      description
    }
    }
  }
`