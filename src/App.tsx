import { useEffect, useState } from 'react'
import './assets/scss/index.scss';
import { MenuNav } from './components/MenuNav/MenuNav'
import { Footer } from './components/Footer/Footer'
import { Search } from './components/Search/Search'
import { Categories } from './components/Categories/Categories'
import { Promo } from './components/Promo/Promo'
import { Goods } from './components/Goods/Goods'
import { getProjectData } from './api/projectData'
import { SearchBlock } from './components/SearchBlock/SearchBlock';
import type Product from './types/Product';

function App() {
  const [ projectData, setProjectData ] = useState(null);
  const [ searchFocused, setSearchFocused ] = useState(true);
  const [ quickSearchValue, setQuickSearchValue ] = useState("");
  const [ searchValue, setSearchValue ] = useState("");
  const [ visibleProducts, setVisibleProducts ] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const getProjectDataAsync = async () => {
        const projectDataFromRequest = await getProjectData();
        setProjectData(projectDataFromRequest);
      }

      getProjectDataAsync();
    } catch(e) {
      throw new Error("Data request error");
    }
  }, []);

  function handleSearchInput(e) {
    setSearchValue(e.target.value);
  }

  function handleQuickSearchValueSelect(query: string) {
    setSearchValue(query.toLowerCase());
  }

  function handleSearchUnfocus() {
    // navigate("/search");
    setSearchFocused(false);
  }

  function handleBackBtnClick() {
    setSearchValue("");
    setSearchFocused(true);
  }

  return (
    <>
      <MenuNav
        setVisibleProducts={setVisibleProducts}
        searchFocused={searchFocused}
        handleBackBtnClick={handleBackBtnClick}
      />
      <Search
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearchInput={handleSearchInput}
          handleSearchUnfocus={handleSearchUnfocus}
          quickSearchValue={quickSearchValue}
          setVisibleProducts={setVisibleProducts}
        />
      <main className="main">
        {!searchFocused ?
          <SearchBlock
            searchValue={searchValue}
            categories={projectData.data.categories}
            handleQuickSearchValueSelect={handleQuickSearchValueSelect}
          /> :
          (
            <>
              <Promo />
              {projectData && <Categories categories={projectData.data.categories} />}
              <Goods
                searchValue={searchValue}
                visibleProducts={visibleProducts}
                setVisibleProducts={setVisibleProducts}
              />
            </>
        )}
        
      </main>
      <Footer />
    </>
  )
}

export default App;
