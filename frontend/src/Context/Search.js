import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const SearchContext = createContext();
const SearchProvieder = (props) => {
  const [search, setSearch] = useState({
    keyword: "",
    product: [],
    status: "waiting",
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {props.children}
    </SearchContext.Provider>
  );
};
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvieder };
