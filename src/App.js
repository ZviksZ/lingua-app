import React, {useContext, useEffect} from 'react';
import {observer}                               from "mobx-react-lite";
import {Loader}                                 from "./components/Loader/Loader.jsx";
import {Navbar}                                 from "./components/Navbar/Navbar.jsx";
import {Pagination}                             from "./components/Pagination/Pagination.jsx";
import {Table}                                  from "./components/Table/Table.jsx";
import {TableSearch}                            from "./components/TableSearch/TableSearch.jsx";
import {TypesSelect}                            from "./components/TypesSelect/TypesSelect.jsx";
import {PokemonStoreContext}                    from "./stores/PokemonStore.js";

const App = observer(() => {
   
   const store = useContext(PokemonStoreContext);
   
   useEffect(() => {
      store.getPokemons()
   }, [])
   
   return (
      <div className="App">
         <Navbar/>        
         
         {
            store.pokemons.length < 100
               ? <Loader/>
               : <>
                  <TableSearch searchHandler={store.searchHandler}/>
                  {
                     store.UnicalTypes && <TypesSelect types={store.UnicalTypes}
                                                       filtered={store.filterType || []}
                                                       onClick={store.setFilterType}/>
                  }
                  <Table data={store.SortedPokemons.chunkData}/>                  
                  <Pagination />
                  
               </>
         }
      </div>
   );
})

export default App;
