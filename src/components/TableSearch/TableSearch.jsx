import React, {useState} from 'react'

export const TableSearch = ({searchHandler}) => {
   const [value, setValue] = useState('')

   const valueChangeHandler = e => {
      setValue(e.target.value)
   }
   const onClickSearch = () => searchHandler(value)

   return (
      <div className="row">
         <div className="input-field col s12 offset-l3 l5">
            <input id="last_name"
                   type="text"
                   value={value}
                   placeholder="Search pokemon by name"
                   onChange={valueChangeHandler}
                   className="validate"/>
         </div>
         <div className="input-field col s12 l3">
            <button className="btn waves-effect waves-light purple darken-4"
                    onClick={onClickSearch}
                    name="action">
               Search
            </button>
         </div>
      </div>
   )
}