import style from './WhiskeySorter.module.css'
function WhiskeySorter({ onSortChange }) {
  return (
    <div className={style.outerContainer}>
      <p>정렬</p>
      <div>
        <label htmlFor="sort-select"></label>
        <select id="sort-select" className={style.selector}
        onChange={(e)=>onSortChange(e.target.value)}>
          <option value="name-asc-kr">이름 순 (한국어)</option>
          <option value="name-desc-kr">이름 역순 (한국어)</option>
          <option value="name-asc-en">이름 순 (영어)</option>
          <option value="name-desc-en">이름 역순 (영어)</option>
          <option value="abv-asc">도수 낮은순</option>
          <option value="abv-desc">도수 높은순</option>
          <option value="price-asc">가격 낮은순</option>
          <option value="price-desc">가격 높은순</option>
        </select>

      </div>
    </div>
    
  )
}

export default WhiskeySorter