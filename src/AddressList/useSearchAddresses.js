import { useState } from 'react';
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const searchAddresses = (term = '', orderBy, order) => (
  fetch('http://www.mocky.io/v2/581335f71000004204abaf83')
    .then(res => res.json() || {})
    .then(({ contacts }) => (
      term.length > 0
        ? (contacts || []).filter(contact => contact.name && contact.name.toLowerCase().includes(term))
        : contacts || []
    ))
    .then(contacts => contacts.sort((left, right) => left[orderBy].localeCompare(right[orderBy]) * order))
);

const useSearchAddress = () => {
  const [inputText, setInputText] = useState('');
  const [order, setOrder] = useState('asc'); // 1 === asc, -1 === desc
  const [orderBy, setOrderBy] = useState('name');
  const debouncedSearch = useConstant(() => AwesomeDebouncePromise(searchAddresses, 300));
  const search = useAsync(debouncedSearch, [inputText, orderBy, order === 'asc' ? 1 : -1]);
  const handleSort = (prop) => () => {
    const isDesc = orderBy === prop && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(prop);
  };

  return {
    inputText,
    setInputText,
    order,
    orderBy,
    handleSort,
    search
  };
};

export default useSearchAddress;