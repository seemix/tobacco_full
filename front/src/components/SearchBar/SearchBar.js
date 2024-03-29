import React, { useState } from 'react';
import { InputAdornment, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [showButton, setShowButton] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.value.length >= 3) {
            setShowButton(true);
            setSearchQuery(e.target.value);
        }
    }
    const handleEnter = (e) => {
        if (e.target.value.length >= 3 && e.key === 'Enter') navigate(`search?searchQuery=${searchQuery}`);
    }
    return (
        <div className={'search_wrapper'}>
            <TextField
                className={'TextField-without-border-radius'}
                id="search"
                type="search"
                label="Search"
                size={'small'}
                name={'searchQuery'}
                onChange={handleChange}
                onKeyDown={handleEnter}
                placeholder={'type to search'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {showButton && <>
                                <Button onClick={() => navigate(`search?searchQuery=${searchQuery}`)}>
                                    <SearchIcon/>
                                </Button>
                            </>
                            }
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default SearchBar;