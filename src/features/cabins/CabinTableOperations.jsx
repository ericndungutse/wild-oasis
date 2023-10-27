import Filter from '../../ui/Filter';

function CabinTableOperations() {
  return (
    <>
      <Filter
        filterValue='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-no-discount', label: 'With discount' },
          { value: 'with-discount', label: 'No discount' },
        ]}
      />
    </>
  );
}

export default CabinTableOperations;
