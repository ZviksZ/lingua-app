import {observable, computed, configure, action, decorate, runInAction} from 'mobx';
import {createContext}                                                                 from "react";
import axios                                                                           from "axios";
import _                                                                               from 'lodash'

configure({enforceActions: 'observed'});

class PokemonStore {
   pokemons = [];
   search: '';
   pageSize: 20;
   currentPage: 0;
   pagesCount: null;

   get SortedPokemons() {
      const {pokemons, search}= this
      
      let filteredData
      if (!search) {
         filteredData = pokemons
      } else {
         filteredData = pokemons.filter(item => {
            return item['name'].toLowerCase().includes(search.toLowerCase())
         })
      }
      const orderedData = _.orderBy(filteredData, ['id'], 'asc')
      
      let size = this.pageSize || 10
      let current = this.currentPage || 0
      
      return _.chunk(orderedData, size)[current]
   }
   
   get pages() {      
      return Math.ceil(this.SortedPokemons.length / this.pageSize)
   }

   getPokemons() {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
         .then(json => {
            if (json.data.results) {
               runInAction(() => {
                  this.getEachPokemon(json.data.results)
               })
            }
            return json
         })
   }

   getEachPokemon(urlArray) {
      let counter = 0
      urlArray.forEach(({url}) => {
         counter++
         axios.get(url).then(json => this.setPokemon(json.data))
      })
      
   }

   setPokemon(pokemon) {
      this.pokemons.push(pokemon)
   }
   setPageSize(size) {
      
      this.pageSize = size
   }
   pageChange({selected}) {
      alert(selected, this.currentPage)
      this.currentPage = selected
   }
}


decorate(PokemonStore, {
   pageSize: observable,
   pagesCount: observable,
   pokemons: observable,
   search: observable,
   currentPage: observable,
   SortedPokemons: computed,
   pages: computed,
   getPokemons: action.bound,
   getEachPokemon: action.bound,
   setPokemon: action,
   setPageSize: action.bound,
   pageChange: action.bound,
   /*setPagesCount: action*/
})

export const PokemonStoreContext = createContext(new PokemonStore());