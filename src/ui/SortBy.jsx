import React from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortedBy = searchParams.get('sortBy') || 'name-asc';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type='white'
      value={sortedBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
