import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `};
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterValue, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredBy =
    searchParams.get(filterValue) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterValue, value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);

    console.log([...searchParams]);
  }

  return (
    <StyledFilter>
      {/* Use Render Prop pattern to customize the Filter button */}
      {options.map((option) => {
        const isactive = filteredBy === option.value;
        return (
          <FilterButton
            key={option.value}
            disabled={filteredBy === option.value}
            onClick={() => handleClick(option.value)}
            active={isactive}>
            {option.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
    // <StyledFilter>
    //   <FilterButton
    //     // disabled={filterdValue === 'all'}

    //     onClick={() => handleClick('all')}>
    //     All
    //   </FilterButton>
    //   <FilterButton
    //     // disabled={filterdValue === 'with-no-discount'}

    //     onClick={() => handleClick('with-no-discount')}>
    //     With no discount
    //   </FilterButton>
    //   <FilterButton
    //     // disabled={filterdValue === 'with-discount'}

    //     onClick={() => handleClick('with-discount')}>
    //     With discount
    //   </FilterButton>
    // </StyledFilter>
  );
}

export default Filter;
