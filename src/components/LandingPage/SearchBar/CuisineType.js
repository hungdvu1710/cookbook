import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const cuisineNames = [
    'American',
    'Asian',
    'British',
    'Caribbean',
    'Central Europe',
    'Chinese',
    'Eastern Europe',
    'French',
    'Indian',
    'Italian',
    'Japanese',
    'Kosher',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'South American',
    'South East Asian',
];

let cTagNamey = "";

function getCTagName() {
    return cTagNamey;
}

export default function CuisineType(props) {
    const [cTagName, setCTagName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCTagName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            cTagNamey = value,
        );
        props.setCTagName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            cTagNamey = value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="cuisine-multiple-checkbox-label">Cuisine Type</InputLabel>
                <Select
                    labelId="cuisine-multiple-checkbox-label"
                    id="cuisine-multiple-checkbox"
                    multiple
                    value={cTagName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {cuisineNames.map((cuisineNames) => (
                        <MenuItem key={cuisineNames} value={cuisineNames}>
                            <Checkbox checked={cTagName.indexOf(cuisineNames) > -1} />
                            <ListItemText primary={cuisineNames} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
