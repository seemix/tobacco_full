import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LanguageSelect = () => {
    const [age, setAge] = React.useState(10);
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 60 }} size="small">
            <InputLabel id="demo-select-small"></InputLabel>
            <Select
                sx={{'& .Mui-focused': {
                border: 0
                }
                }}
                variant={'standard'}
                size={'small'}
                InputProps={{
                    //startAdornment: <AccountCircle />, // <== adjusted this
                    disableUnderline: true, // <== added this
                }}
                style={{border: '0px solid red'}}
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                //label="Age"
                onChange={handleChange}
                defaultValue={20}
            >
                <MenuItem value={10}>EN</MenuItem>
                <MenuItem value={20}>DA</MenuItem>
                <MenuItem value={30}>RU</MenuItem>
            </Select>
        </FormControl>
    );
};
export default LanguageSelect;