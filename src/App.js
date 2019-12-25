import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate                            from 'react-paginate';
import {observer}                               from "mobx-react-lite";
import {Loader}                                 from "./components/Loader/Loader.jsx";
import {Navbar}                                 from "./components/Navbar/Navbar.jsx";
import {Table}                                  from "./components/Table/Table.jsx";
import {PokemonStoreContext}                    from "./stores/PokemonStore.js";

const App = observer(() => {
   
   const store = useContext(PokemonStoreContext);
   /*const pageCount = Math.ceil(store.SortedPokemons.length / store.pageSize)*/

   useEffect(() => {      
      store.getPokemons()
   }, [])
   
   

   const handleChange = e => {
      store.setPageSize(e.target.value)
   }
   return (
      <div className="App">
         <Navbar/>
         <div>
            value = {store.pageSize}
            current = {store.currentPage}
         </div>
         
         <select name="select" onChange={handleChange} value={store.pageSize} className="d-block">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
         </select>
         {
            store.pokemons.length < 100 ? <Loader/> : <Table data={store.SortedPokemons}/>
         }
         <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={store.pages}
            forcePage={store.currentPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={store.pageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageClassName={'page-item'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
         />
      </div>
   );
})

export default App;
