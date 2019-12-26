import React from 'react'
import style from './TypesSelect.module.scss'

export const TypesSelect = ({types, onClick, filtered}) => {
   return (
      <>
         <h5 className="text-center">Choose type</h5>
         <ul className={style.typesList}>
            {
               types.map(t => (
                  <li key={`f${(~~(Math.random() * 1e8)).toString(16)}`}
                      style={{background: `${t.color}`}}
                      className={filtered.some(f => f === t.name) ? style.active : null}
                      onClick={() => onClick(t.name)}>
                     {t.name}
                  </li>
               ))
            }
         </ul>
      </>
   )
}