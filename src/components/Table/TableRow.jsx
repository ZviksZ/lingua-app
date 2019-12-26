import React    from 'react'
import {styles} from "../helpers/colorStyleFn.js";
import s from './Table.module.scss'


export const TableRow = ({item}) => {
   return (
      <tr id={item.id}>
         <td>{item.id}</td>
         <td><span className={s.itemName}>{item.name}</span></td>
         <td>
            {
               item.types.map(t => <div className={s.typeBlock} style={{background: styles(t.type.name)}}>{t.type.name}</div>)
            }
         </td>
         <td>
            <img className={s.avatar} src={item.sprites.front_default} alt="1"/>
         </td>
         <td>Experience: <strong>{item.base_experience}</strong></td>
      </tr>                
   )
}