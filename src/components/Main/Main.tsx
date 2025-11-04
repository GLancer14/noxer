import { Categories } from "../Categories/Categories"
import { Goods } from "../Goods/Goods"
import { Promo } from "../Promo/Promo"

export function Main({ projectData, searchValue, visibleProducts, setVisibleProducts }) {
  return (
    <>
      <Promo />
      {projectData && <Categories categories={projectData.data.categories} />}
      <Goods
        searchValue={searchValue}
        visibleProducts={visibleProducts}
        setVisibleProducts={setVisibleProducts}
      />
    </>
    
  );
}