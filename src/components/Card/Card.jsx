import { useContext } from "react"
import { Link } from "react-router-dom";
import { ThemeContext } from "../../lib/theme"

export default function Card({children, ...attr}){
    const theme = useContext(ThemeContext);

    return <div style={{
        backgroundColor: theme.background,
        color: theme.foreground
    }} {...attr}>

        {children}

    </div>

}

export function CardImage( {src,id, ...attr}){
    return <Link to={`/detail/${id}`}>
    <img style={{
        width:"100%",
        maxHeight:"302 px"
    }} 
    src={src} alt="" {...attr}/>
    </Link>
}

export function CardDetail( {children} ){
    return <div style={{padding: "8px"}}>{children}</div>
}