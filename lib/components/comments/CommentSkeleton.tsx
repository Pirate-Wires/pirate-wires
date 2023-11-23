import React from 'react';
import cn from 'classnames';

const generateRandom = (max: number, min: number): number => {
  if (typeof window !== 'undefined') {
    return Math.random() * (max - min) + min;
  }

  return 0;
};

interface Props {
  children?: React.ReactNode;
  className?: string;
  style?: any;
}

const Skeleton = ({ children = null, className, style }: Props): JSX.Element => (
  <div
    className={cn('skeleton dark:skeleton-dark', className)}
    style={style}
    suppressHydrationWarning
  >
    {children}
  </div>
);

const CommentSkeleton = ({ innerRef = null }) => (
  <div className="" ref={innerRef}>
    <div className="">
      <Skeleton className=""></Skeleton>
      <div className="">
        <Skeleton className=""></Skeleton>
      </div>
      <div className="">
        <Skeleton className="" />
      </div>
      <div className="">
        <div className="">
          <Skeleton
            className=""
            // style={{ width: `${generateRandom(100, 85)}%` }}
          />
          <Skeleton
            className=""
            // style={{ width: `${generateRandom(100, 85)}%` }}
          />
          <Skeleton
            className=""
            // style={{ width: `${generateRandom(100, 85)}%` }}
          />
        </div>
        <div className="">
          <Skeleton className="" />
          <Skeleton className="" />
        </div>
      </div>
    </div>
  </div>
);

export default CommentSkeleton;
