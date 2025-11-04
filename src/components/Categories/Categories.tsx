import noPhoto from "../../assets/no-photo.svg";
import type Category from "../../types/Category";
import styles from "./Categories.module.scss";

export function Categories({ categories }: { categories: Category[] }) {
  const sortedCategories = categories.sort((categoryA, categoryB) => {
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
  });

  return (
    <div className={styles.categories}>
      {sortedCategories.map((category) => {
        return (
          <a className={styles.category} key={category.Category_ID}>
            <img
              className={styles.image}
              src={
                category.Category_Image ||
                category.category_images?.[0]?.url ||
                noPhoto
              }
              alt={category.Category_Name}
            />
            <div className={styles.name}>{category.Category_Name}</div>
          </a>
        );
      })}
    </div>
  );
}