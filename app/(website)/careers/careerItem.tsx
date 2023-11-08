'use client';
import Link from 'next/link';
import styles from '../../../styles/pages/careers.module.scss';
import { useDateFormatter } from '@/hooks/useDateFormatter';

// Separate component for each career item
export default function CareerItem({ career }) {
  const formattedDate = useDateFormatter(career.date, true);

  return (
    <Link
      key={career.title}
      href={career.link}
      className={`${styles.careerRow} hasGoIcon`}
    >
      <h3>{career.title}</h3>
      <div className={styles.right}>
        <p className={styles.date}>{useDateFormatter(career.date, true)}</p>
        <div className="goIcon">
          <div className="leftHalf"></div>
          <div className="rightHalf"></div>
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
