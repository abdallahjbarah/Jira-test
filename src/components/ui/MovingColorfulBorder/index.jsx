import styles from './style.module.scss';

export default function MovingColorfulBorder({ children, className }) {
  return <div className={`${styles["border-box"]} ${className}`}>{children}</div>;
}
