import {observable, computed, configure, action, decorate, runInAction} from 'mobx';
import {createContext}                                                  from "react";
import axios                                                            from "axios";
import _                                                                from 'lodash'
import {colorArray}                                                     from "../components/helpers/colorArray.js";

configure({enforceActions: 'observed'});

class PokemonStore {
   pokemons = [];
   search: '';
   pageSize: 20;
   currentPage: 0;
   filterType: [];

   get SortedPokemons() {
      const {pokemons, search, filterType} = this

      let filteredData
      if (!search && !filterType) {
         filteredData = pokemons
      } else if (filterType.length > 0 && !search) {
         filteredData = []
         pokemons.forEach(data => {            
            let filtered = data.types.filter(types => filterType.some(t => t === types.type.name))
            if (filtered.length > 0) filteredData.push(data) 
         })         
      } else if (search){
         filteredData = []
         if(filterType) {
            pokemons.forEach(data => {
               let filtered = data.types.filter(types => filterType.some(t => t === types.type.name))
               if (filtered.length > 0) filteredData.push(data)
            })
         }
         filteredData = filteredData.filter(item => {            
            return item['name'].toLowerCase().includes(search.toLowerCase())
         })         
      } else {
         filteredData = pokemons
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
   
   get UnicalTypes() {
      let unic = [] 
      this.pokemons.forEach(item => {
         item.types.forEach((t => {
            unic.push({
               name: t.type.name,
               color: null
            })
         }))
      })
      return  _.uniqBy(unic, 'name').map((u, i) => {
         return {
            ...u,
            color: colorArray[i]
         }
      })
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
   searchHandler(value) {
      this.search = value
   }   
   setFilterType(type) {
      let filtered = this.filterType || []
      if (filtered.some(t => t === type)) {
         this.filterType = filtered.filter(f => f !== type)
      } else {
         this.filterType = [...filtered, type]
      }
   }
}


decorate(PokemonStore, {
   pageSize: observable,
   pokemons: observable,
   search: observable,
   filterType: observable,
   currentPage: observable,
   SortedPokemons: computed,
   UnicalTypes: computed,
   getPokemons: action.bound,
   getEachPokemon: action.bound,
   setPokemon: action,
   setPageSize: action.bound,
   pageChange: action.bound,
   searchHandler: action.bound,
   setFilterType: action.bound,
})

export const PokemonStoreContext = createContext(new PokemonStore());