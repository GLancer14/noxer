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
import type { ProjectDataDTO } from './types/ProjectDataDTO';
import {  useAppSelector } from './hooks/reduxHook';

function App() {
  const [ projectData, setProjectData ] = useState<ProjectDataDTO | null>(null);
  const [ visibleProducts, setVisibleProducts ] = useState<Product[]>([]);
  const searchState = useAppSelector(state => state.searchReducer);

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

  return (
    <>
      <MenuNav
        setVisibleProducts={setVisibleProducts}
      />
      <Search
          setVisibleProducts={setVisibleProducts}
        />
      <main className="main">
        {searchState.isFocused ?
          <SearchBlock
            categories={projectData ? projectData.categories : null}
          /> :
          (
            <>
              <Promo />
              {projectData && <Categories categories={projectData.categories} />}
              <Goods
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
