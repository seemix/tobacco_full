import React, { useState } from 'react';
import { InputAdornment, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBarAdmin = () => {
    const [q, setQ] = useState('');
    const navigate = useNavigate();

    const handleEnter = (e) => {
        if (e.target.value.length >= 3 && e.key === 'Enter') navigate(`search?q=${q}`);
    }
    const handleClick = () => {
        if (q.length >= 3) navigate(`search?q=${q}`);
    }
    const handleChange = (e) => {
        setQ(e.target.value);
    }
    return (
        <div className={'search_wrapper'}>
            <TextField
                style={{ width: '250px' }}
                className={'TextField-without-border-radius'}
                id="search"
                type="search"
                label="Search"
                size={'small'}
                name={'q'}
                onChange={handleChange}
                onKeyDown={handleEnter}
                placeholder={'type to search'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {
                                <Button onClick={handleClick}>
                                    <SearchIcon/>
                                </Button>

                            }
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default SearchBarAdmin;