import React from 'react';
import { useComments, SortingBehavior } from '@/lib/hooks/use-comments';

const SortCommentsSelect = (): JSX.Element => {
  const { sortingBehavior, setSortingBehavior } = useComments();

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>): void {
    setSortingBehavior(e.target.value as SortingBehavior);
  }
  return (
    <select
      className=""
      onChange={handleSelect}
      value={sortingBehavior}
      aria-label="Sort votes by"
    >
      <option value="pathVotesRecent">Top</option>
      <option value="pathMostRecent">New</option>
      <option value="pathLeastRecent">Old</option>
    </select>
  );
};

export default SortCommentsSelect;
