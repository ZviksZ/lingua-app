import {observer}            from "mobx-react-lite";
import React, {useContext}   from 'react'
import ReactPaginate         from 'react-paginate';
import {PokemonStoreContext} from "../../stores/PokemonStore.js";
import style                 from './Pagination.module.scss'
import {SelectPageItems}     from "./SelectPageItems.jsx";


export const Pagination = observer(() => {
   const store = useContext(PokemonStoreContext)
   const handleChange = e => {
      store.setPageSize(e.target.value)
   }

   return (
      <div className={style.pagination}>
         <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={store.SortedPokemons.pages}
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
         <SelectPageItems handleChange={handleChange} pageSize={store.pageSize}/>
         
      </div>
   )
})