import { useState } from "react";
import { ReactComponent as SearchIcon } from '../assets/icon/Search.svg';
import style from './Searchbar.module.css'
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // 사용자가 폼을 제출할 때
  // 폼의 기본 제출 동작(새로고침)이벤트 방지, onSearch 콜백 사용하여 쿼리를 부모 컴포넌트로 전달
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  //사용자가 검색어를 입력할 때
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={style.searchForm} >
      <input
        className={style.searchInput}
        type="text"
        placeholder="검색..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className={style.button}>
        <SearchIcon/>
      </button>
     
    </form>
  );
}

export default SearchBar