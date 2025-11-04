// import categoriesData from "../../constants/categoriesData";
import noPhoto from "../../assets/no-photo.svg";
import styles from "./Categories.module.scss";

export function Categories({ categories }) {
  const sortedCategories = categories.sort((categoryA, categoryB) => {
    // return categoryB.sort_order - categoryA.sort_order;
    const categoryAImageURL = categoryA.Category_Image || categoryA.category_images?.[0]?.url;
    const categoryBImageURL = categoryB.Category_Image || categoryB.category_images?.[0]?.url;

    if (categoryAImageURL && categoryBImageURL) {
      return categoryA.sort_order - categoryB.sort_order;
    } else if (categoryAImageURL && !categoryBImageURL) {
      return -1;
    } else if (!categoryAImageURL && categoryBImageURL) {
      return 1;
    } else {
      return categoryA.sort_order - categoryB.sort_order;
    }
    // if (
    //   (categoryA.Category_Image !== "") &&
    //   (categoryB.Category_Image !== "")
    // ) {
    //   return categoryB.sort_order - categoryA.sort_order;
    // } else if (
    //   categoryA.Category_Image !== "" &&
    //   categoryB.Category_Image == ""
    // ) {
    //   return -1;
    // } else if (
    //   categoryA.Category_Image == "" &&
    //   categoryB.Category_Image !== ""
    // ) {
    //   return 1;
    // } else {
    //   return categoryB.sort_order - categoryA.sort_order;
    // }
    // if (
    //   (categoryA.category_images?.length || categoryA.Category_Image !== "") &&
    //   (categoryB.category_images?.length || categoryB.Category_Image !== "")
    // ) {
    //   return categoryB.sort_order - categoryA.sort_order;
    // } else if (
    //   (categoryA.category_images?.length > 0 || categoryA.Category_Image !== "") &&
    //   categoryB.category_images?.length === 0
    // ) {
    //   return 1;
    // } else if (
    //   categoryA.category_images?.length &&
    //   (categoryB.category_images?.length || categoryB.Category_Image !== "")
    // ) {
    //   return -1;
    // } else {
    //   return categoryB.sort_order - categoryA.sort_order;
    // }
  });

  return (
    <div className={styles.categories}>
      {sortedCategories.map((category) => {
        return (
          <a className={styles.category} key={categories.Category_ID}>
            <img
              className={styles.image}
              src={
                category.Category_Image ||
                category.category_images?.[0]?.url ||
                noPhoto
              }
              alt={category.name}
            />
            <div className={styles.name}>{category.Category_Name}</div>
          </a>
        );
      })}
      {/* {categoriesData.map((category, index) => {
        return (
          <div className="categories_category" key={index}>
            <img
            src={`./assets/categories/${category.imgName}`}
            alt={category.name} className="category-image" />
            <div className="category-name">{category.name}</div>
          </div>
        );
      })} */}
    </div>
  );
}