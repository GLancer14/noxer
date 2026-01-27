import { useEffect } from 'react'
import './assets/scss/index.scss';
import { Categories } from './components/Categories/Categories'
import { Promo } from './components/Promo/Promo'
import { Goods } from './components/Goods/Goods'
import { getProjectData } from './api/projectData'
import { SearchBlock } from './components/SearchBlock/SearchBlock';
import { Route, Routes } from 'react-router';
import { MainLayout } from './components/MainLayout/MainLayout';
import { useAppDispatch } from './hooks/reduxHook';
import { setProjectData } from './store/reducers/projectDataSlice';

function App() {
  const dispatch = useAppDispatch();

  const getProjectDataAsync = async () => {
    const projectDataFromRequest = await getProjectData();
    if (projectDataFromRequest.status !== "ok") {
      throw new Error("Data request error");
    }

    dispatch(setProjectData(projectDataFromRequest));
  }

  useEffect(() => {
    getProjectDataAsync();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
            <>
              <Promo />
              <Categories />
              <Goods />
            </>
          }
        />
        <Route path="search" element={<SearchBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
