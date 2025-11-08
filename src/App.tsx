import { useEffect, useState, type ChangeEvent } from 'react'
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
import type { ProjectDataDTO } from './types/ProjectDataDTO';

function App() {
  const [ projectData, setProjectData ] = useState<ProjectDataDTO | null>(null);
  const [ searchFocused, setSearchFocused ] = useState(true);
  const [ searchValue, setSearchValue ] = useState("");
  const [ visibleProducts, setVisibleProducts ] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const getProjectDataAsync = async () => {
        const projectDataFromRequest = await getProjectData();
        if (projectDataFromRequest.status === "ok") {
          setProjectData(projectDataFromRequest);
        }
      }

      getProjectDataAsync();
    } catch(e) {
      throw new Error("Data request error");
    }
  }, []);

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleQuickSearchValueSelect(query: string) {
    setSearchValue(query.toLowerCase());
  }

  function handleSearchUnfocus() {
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
          handleSearchInput={handleSearchInput}
          handleSearchUnfocus={handleSearchUnfocus}
          setVisibleProducts={setVisibleProducts}
        />
      <main className="main">
        {!searchFocused ?
          <SearchBlock
            searchValue={searchValue}
            categories={projectData ? projectData.categories : null}
            handleQuickSearchValueSelect={handleQuickSearchValueSelect}
          /> :
          (
            <>
              <Promo />
              {projectData && <Categories categories={projectData.categories} />}
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
