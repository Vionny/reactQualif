import { useQuery } from "@apollo/client"
import { ALL_ANIME } from "../lib/queries/AllAnime";
import Card, {CardDetail, CardImage} from "../components/Card/Card";
import { useContext, useState } from "react";
import { arrayOf } from "prop-types";
import { ThemeContext } from "../lib/theme";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Home(){
    const {loading, error, data} = useQuery(ALL_ANIME, {
        variables:{
            page: 1,
            perpage: 10
        }
    });
    let favo =[]
    let favoId = []
    const theme = useContext(ThemeContext); 
    if(localStorage.getItem('fav')!==null){
       favo = JSON.parse(localStorage.getItem('fav'))
       favoId = JSON.parse(localStorage.getItem('id'))
    }
    const [fav, setFav] = useState(favo);
    const [favId,setFavId]= useState(favoId)
    
    const HandleFav = (anime) =>{
        let newArr = [...fav];
        let newArr2 = [...favId]
        let found = favId.indexOf(anime.id)
        if(found === -1){
            newArr.push(anime);
            newArr2.push(anime.id)
            localStorage.setItem('fav',JSON.stringify(newArr));
            localStorage.setItem('id',JSON.stringify(newArr2))
        } else {
            newArr.splice(found, 1);
            newArr2.push(anime.id)
            localStorage.setItem('fav',JSON.stringify(newArr));
            localStorage.setItem('id',JSON.stringify(newArr2))
        }
        setFav(newArr)
        setFavId(newArr2)
    }

    let searchInput = useRef()
    const [search,setSearch] = useState("")
    function handleSearch(){
        let currSearch = searchInput.current.value
        setSearch(currSearch)
    }

    
    
    if(loading) return <h1>Loading..</h1>
    else return <div>
        <div style={{
            backgroundColor: theme.backdrop,
            width:'100%',
            padding:'10px',
            paddingTop:'20px',
            paddingLeft:'35%'
        }}><Link to={`/favouriteAnime`}>Your Favourites</Link></div>
        <div style={{
            width:'100%',
            height:'40px',
            paddingLeft:'8px',
            paddingTop:'15px',
            backgroundColor: theme.backdrop
        }}><input style={{
            width:'70%',
            height:'30px',
            paddingLeft:'5px',
            marginRight:'10px'
        }} ref={searchInput} type="text" placeholder="Search..."></input>
        <button style={{
            width:'20%',
            height:'35px'
        }}onClick={()=>{handleSearch()}}>Search</button>
        </div>
        <div style={{
            position:'flex',
            width:'100%'
            
        }}>
        <div style={{
            display:"grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: "1rem",
            padding:'20px',
            backgroundColor: theme.backdrop
        }}
        >
            {data.Page.media.map( (anime, i) =>{
                let isFav = favId.indexOf(anime.id) !==-1
                // console.log(fav)
                // console.log("============================================")
                // console.log(anime)
                if(search ===""||anime.title.romaji.includes(search)){
                    return <Card 
                    key={anime.id}>
                            <CardImage src={anime.coverImage.large} id={anime.id}/>
                            <CardDetail style={{
                                display:"flex",
                                justifyContent: "space-between",
                                alignItems: "start"
                            }}>
                                <div> {anime.title.romaji} </div>
                                <div style={{
                                    width:"100%",
                                    
                                }}>
                                <button style={{border: "none",
                                backgroundColor: !isFav ? "rgb(14,165,233)" : "rgb(239, 68, 68)",
                                justifySelf:'right'
                                }}
                                onClick = { () => HandleFav(anime)}>
                                    {isFav ? "-" : "+"}
                                    </button>
                                    </div>
                            </CardDetail>
                        </Card>
        
                }
               

            })}
        </div>
        </div>
        
    </div>
}