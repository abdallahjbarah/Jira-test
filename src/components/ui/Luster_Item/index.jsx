import styles from './style.module.scss';

export default function Luster_Item({ children, className }) {
  return <div className={`${styles["custom-luster"]} ${styles["luster"]} ${className}`}>
    {children}
    </div>;
}
