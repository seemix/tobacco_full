import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../store/search';
import { closeMenu, hideSearchBar } from '../../store/appearance';
import ItemCard from '../ItemCard/ItemCard';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(search(q));
        dispatch(closeMenu());
        dispatch(hideSearchBar());
    }, [q, dispatch]);
    const { results } = useSelector(state => state.searchStore);
    return (
        <div className={'main_container'}>
            <h2>Search results {`"${q}"`}</h2>
            <div className={'items_wrapper'}>
                {results.length > 0 &&
                    results.map(item => <ItemCard key={item._id} product={item}/>)
                }
                {results.length === 0 &&
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                        <h3>No results found. Try to modify your request </h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default Search;