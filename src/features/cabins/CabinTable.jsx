import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useFetchCabins } from './cabinHooks';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
  const [isLoading, cabins] = useFetchCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins?.length) return <Empty resourceName='cabins' />;

  // 1) Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  filteredCabins = filterValue === 'all' ? cabins : cabins;

  filteredCabins =
    filterValue === 'with-no-discount'
      ? cabins.filter((cabin) => cabin.discount === 0)
      : filteredCabins;
  filteredCabins =
    filterValue === 'with-discount'
      ? cabins.filter((cabin) => cabin.discount > 0)
      : filteredCabins;

  // 2) Sort

  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  let sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
