import React    from 'react'
import {styles} from "../helpers/colorStyleFn.js";


export const Table = ({data}) => {
   return (
      <div className="table-wrap">
         <table>
            <thead>
               <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Picture</th>
                  <th>Other</th>
               </tr>
            </thead>

            <tbody>
            {
               data && data.map(item => (
                     <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                           {
                              item.types.map(t => <div style={{background: styles(t.type.name)}}>{t.type.name}</div>)
                           }
                        </td>
                        <td><img src={item.sprites.front_default} alt="1"/></td>
                        <td>$0.87</td>
                     </tr>
                  )
               )
            }
            </tbody>
         </table>
      </div>
      
   )
}