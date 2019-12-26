import React       from 'react'
import {TableHead} from "./TableHead.jsx";
import {TableRow}  from "./TableRow.jsx";

export const Table = ({data}) => {
   return (
      <div className="table-wrap">
         <table>
           <TableHead/>
           
            <tbody>
            {
               data && data.map(item => <TableRow key={item.id} item={item}/>)
            }
            </tbody>
         </table>
      </div>
      
   )
}