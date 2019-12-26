import React        from 'react'
import {colorArray} from "../helpers/colorArray.js";

export const TypesSelect = ({types, onClick}) => {
   return (
      <ul>

         {
            types.map((t, index) => (
               <li key={`f${(~~(Math.random() * 1e8)).toString(16)}`}
                   style={{background: `${t.color}`}}
                   onClick={() => onClick(t.name)}>
                  {t.name} {t.color} {t.i}
               </li>
            ))
         }
      </ul>
   )
}