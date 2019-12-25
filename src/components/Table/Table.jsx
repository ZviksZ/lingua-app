import React from 'react'

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
               data.map(item => (
                     <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>$0.87</td>
                        <td>$0.87</td>
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