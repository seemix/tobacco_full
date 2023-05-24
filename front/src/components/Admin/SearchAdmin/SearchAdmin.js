import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { search } from '../../../store/search';
import ProductCard from '../ProductsAdmin/ProductCard';

const SearchAdmin = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(search(q));

    }, [q, dispatch]);
    const { results } = useSelector(state => state.searchStore);
    return (
        <div>
            <h2>Search results {`"${q}"`}</h2>
            <div className={'items_wrapper'}>
                {results.length > 0 &&
                    results.map(item => <ProductCard key={item._id} product={item}/>)
                }
                {results.length === 0 &&
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                        <h3>No results found. Try to modify your request </h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchAdmin;