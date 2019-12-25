import {observable, computed, configure, action, decorate, runInAction} from 'mobx';
import {createContext}                                                  from "react";
import axios                                                            from "axios";
import _                                                                from 'lodash'

configure({enforceActions: 'observed'});

class PokemonStore {
   pokemons = [];
   search: '';
   pageSize: 20;
   currentPage: 0;
   pagesCount: null;
   sortedPokemons: [];

   get SortedPokemons() {
      const {pokemons, search} = this

      let filteredData
      if (!search) {
         filteredData = pokemons
      } else {
         filteredData = pokemons.filter(item => {
            return item['name'].toLowerCase().includes(search.toLowerCase())
         })
      }
      let size = this.pageSize || 10
      let current = this.currentPage || 0
      let orderData = _.orderBy(filteredData, ['id'], 'asc')
      let pageCount = Math.ceil(orderData.length / size)
      return {
         chunkData: _.chunk(orderData, size)[current],
         pages: pageCount
      }
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
      this.currentPage = selected
   }
}


decorate(PokemonStore, {
   pageSize: observable,
   pagesCount: observable,
   pokemons: observable,
   search: observable,
   sortedPokemons: observable,
   currentPage: observable,
   SortedPokemons: computed,
   getPokemons: action.bound,
   getEachPokemon: action.bound,
   setPokemon: action,
   setPageSize: action.bound,
   pageChange: action.bound,
})

export const PokemonStoreContext = createContext(new PokemonStore());