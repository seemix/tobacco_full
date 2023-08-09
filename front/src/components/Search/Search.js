import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { search } from '../../store/search';
import { closeMenu, hideSearchBar } from '../../store/appearance';
import ItemCard from '../ItemCard/ItemCard';
import './Search.css';
const Search = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(search(searchQuery));
        dispatch(closeMenu());
        dispatch(hideSearchBar());
    }, [searchQuery, dispatch]);

    const { results } = useSelector(state => state.searchStore);

    return (
        <div className={'main_container'}>
            <h2>Search results {`"${searchQuery}"`}</h2>
            <div className={'items_wrapper'}>
                {results.length > 0 &&
                    results.map(item => <ItemCard key={item._id} product={item}/>)
                }
                {results.length === 0 &&
                    <div className={'search_results_wrapper'}>
                        <h3>No results found. Try to modify your request </h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default Search;