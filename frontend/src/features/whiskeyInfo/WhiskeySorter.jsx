import { useState } from 'react';
function WhiskeySorter() {
  const [sortOrder, setSortOrder] = useState('name-asc')//이름 오름차순
  return (
    <div>
      <h1>정렬</h1>
      <div>
        <label htmlFor="sort-select"></label>
        <select id="sort-select">
          <option value="name-asc">이름 순</option>
          <option value="name-desc">이름 역순</option>
          <option value="abv-asc">도수 낮은순</option>
          <option value="abv-desc">도수 높은순</option>
        </select>

      </div>
    </div>
    
  )
}

export default WhiskeySorter