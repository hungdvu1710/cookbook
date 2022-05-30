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

const dishNames = [
    'Biscuits and Cookies',
    'Bread',
    'Cereals',
    'Condiments and Sauces',
    'Desserts',
    'Drinks',
    'Main Course',
    'Pancake',
    'Preps',
    'Preserve',
    'Salad',
    'Sandwiches',
    'Side Dish',
    'Soup',
    'Starter',
    'Sweets',
];

let dTagNamey = "";

function getDTagName() {
    return dTagNamey;
}

export default function MultipleSelectCheckmarks() {
    const [dTagName, setDTagName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDTagName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            dTagNamey = value,
        );
    };


    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="dish-multiple-checkbox-label">Dish Type</InputLabel>
                <Select
                    labelId="dish-multiple-checkbox-label"
                    id="dish-multiple-checkbox"
                    multiple
                    value={dTagName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {dishNames.map((dishNames) => (
                        <MenuItem key={dishNames} value={dishNames}>
                            <Checkbox checked={dTagName.indexOf(dishNames) > -1} />
                            <ListItemText primary={dishNames} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
