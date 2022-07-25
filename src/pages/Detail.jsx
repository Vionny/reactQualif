import { useQuery } from "@apollo/client";
import { useContext} from "react";
import { Link, useParams } from "react-router-dom";
import { detail_anime } from "../lib/queries/AllAnime";
import { ThemeContext } from "../lib/theme";

export default function Detail(){
    const {id} = useParams()
    const theme = useContext(ThemeContext); 
    const {loading,error,data}= useQuery(detail_anime,{variables:{id:id}})
    if(loading) return <h1>Loading...</h1>
    else{
        const detail = data.Page.media[0]
        return<div style={{
            backgroundColor: theme.backdrop,
            
        }}>
            <div style={{
                width:'100%',
                padding:'10px',
                paddingTop:'20px',
                paddingLeft:'42%'
            }}>
                <Link to={`/`}>Home</Link>
            </div>
            <b><h3 style={{textAlign:'center'}}>{detail.title.romaji}</h3></b>
            <img src={detail.coverImage.extraLarge} alt="cover"></img>
            <div style={{
                padding:'20px',
                textAlign:'justify'
            }}>
                <b>
                   <u><p>Status : {detail.status}</p></u> </b>
                <p style={{tabSize:'4px'}}> {detail.description}</p>
            </div>

        </div>
    }
    
}