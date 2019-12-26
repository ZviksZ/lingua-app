import React from 'react'
import s from './Table.module.scss'


export const TableHead = () => {
   return (
      <thead>
      <tr>
         <th className={s.tableHead}>Id</th>
         <th className={s.tableHead}>Name</th>
         <th className={s.tableHead}>Type</th>
         <th className={s.tableHead}>Picture</th>
         <th className={s.tableHead}>Other stats</th>
      </tr>
      </thead>

   )
}