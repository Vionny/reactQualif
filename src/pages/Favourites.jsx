
import { ALL_ANIME } from "../lib/queries/AllAnime";
import Card, {CardDetail, CardImage} from "../components/Card/Card";
import { useContext, useState } from "react";
import { arrayOf } from "prop-types";
import { ThemeContext } from "../lib/theme";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Favourites(){
   
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

    
    
    return <div >
        <div style={{
            backgroundColor: theme.backdrop,
            width:'100%',
            padding:'10px',
            paddingTop:'20px',
            textAlign:'center'
        }}><Link to={`/`}>Home</Link></div>
        <div style={{
            width:'100%',
            height:'40px',
            padding:'10px',
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
        </div><div>
            <div style={{
            padding:'20px',
            display:"grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: "1rem",
            width: "90%",
            backgroundColor: theme.backdrop
        }}
        >
            {fav&&fav.map( (anime, i) =>{
                let isFav = fav.indexOf(anime) !== -1
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
                                <button style={{border: "none",
                                backgroundColor: !isFav ? "rgb(14,165,233)" : "rgb(239, 68, 68)"}}
                                onClick = { () => HandleFav(anime)}>
                                    {isFav ? "-" : "+"}
                                    </button>
                            </CardDetail>
                        </Card>
                }
               

            })}
        </div>
    </div>
    </div>
}