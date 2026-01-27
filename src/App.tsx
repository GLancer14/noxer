import { useEffect, useState } from 'react'
import './assets/scss/index.scss';
import { Categories } from './components/Categories/Categories'
import { Promo } from './components/Promo/Promo'
import { Goods } from './components/Goods/Goods'
import { getProjectData } from './api/projectData'
import { SearchBlock } from './components/SearchBlock/SearchBlock';
import type { ProjectDataDTO } from './types/ProjectDataDTO';
import { Route, Routes } from 'react-router';
import { MainLayout } from './components/MainLayout/MainLayout';

function App() {
  const [ projectData, setProjectData ] = useState<ProjectDataDTO | null>(null);

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
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
            <>
              <Promo />
              {projectData && <Categories categories={projectData.categories} />}
              <Goods />
            </>
          }
        />
        <Route path="search" element={<SearchBlock />} />
      </Route>
    </Routes>
  )
}

export default App;
