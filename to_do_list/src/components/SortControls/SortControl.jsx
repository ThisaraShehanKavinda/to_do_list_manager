import React from 'react'
import './SortControl.css'

const SortControl = ({sortOrder, setSortOrder}) => {
  return (
    <div className='sort-controls'>
      <label>Sort for Due Date</label>
      <select value={sortOrder} onChange={(e)=> setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )
}

export default SortControl
