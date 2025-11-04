import styles from "./Footer.module.scss";
import home from "../../assets/icons/navigation/home.svg";
import catalog from "../../assets/icons/navigation/catalog.svg";
import favorite from "../../assets/icons/navigation/favorite.svg";
import cart from "../../assets/icons/navigation/cart.svg";
import account from "../../assets/icons/navigation/account.svg";

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <nav className={styles.navMenu}>
          <ul className={styles.list}>
            <li>
              <a className={styles.link} href="#">
                <img src={home} alt="" />
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                <img src={catalog} alt="" />
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                <img src={favorite} alt="" />
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                <img src={cart} alt="" />
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                <img src={account} alt="" />
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}