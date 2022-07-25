import { useEffect, useState } from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { THEME, ThemeContext } from './lib/theme';
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom';
import Favourites from './pages/Favourites';

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co/',
    cache: new InMemoryCache(),
  });
 
  const [currTheme, setCurrTheme] = useState(THEME.light)
  return <div>
<ApolloProvider client={client}>
    <ThemeContext.Provider value={currTheme}>
      <div style={{
        backgroundColor: currTheme.backdrop
      }}>
        <button style={{width:'50%',height:'40px',backgroundColor:'white'}}
        onClick={() => setCurrTheme(THEME.light)}
        > light 
        </button>
        <button style={{width:'50%',height:'40px',backgroundColor:'white'}}
        onClick={() => setCurrTheme(THEME.dark)}
        >
          dark
        </button>
      </div>

     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/>}/>
          <Route path="/detail/:id" element={<Detail/>}></Route>
          <Route path="/favouriteAnime" element={<Favourites/>}></Route>
        </Routes>
        
      </BrowserRouter>

    </ThemeContext.Provider>
  </ApolloProvider>
        
    </div>
}

export default App;
