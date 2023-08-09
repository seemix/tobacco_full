import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { search } from '../../../store/search';
import ProductCard from '../ProductsAdmin/ProductCard/ProductCard';
import './SearchAdmin.css';
const SearchAdmin = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(search(searchQuery));

    }, [searchQuery, dispatch]);
    const { results } = useSelector(state => state.searchStore);
    return (
        <div>
            <h2>Search results {`"${searchQuery}"`}</h2>
            <div className={'items_wrapper'}>
                {results.length > 0 &&
                    results.map(item => <ProductCard key={item._id} product={item}/>)
                }
                {results.length === 0 &&
                    <div className={'no_results'}>
                        <h3>No results found. Try to modify your request </h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchAdmin;