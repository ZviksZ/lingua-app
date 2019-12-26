import React from 'react'
import style                 from './Pagination.module.scss'

export const SelectPageItems = ({handleChange, pageSize}) => {
   return (
      <div className="input-field">
         <select onChange={handleChange} value={pageSize} className={style.selectPages}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
         </select>
      </div>
   )
}
