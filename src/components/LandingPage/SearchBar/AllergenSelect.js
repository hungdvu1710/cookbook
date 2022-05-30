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

const healthNames = [
    'Alcohol-cocktail',
    'Alcohol-free',
    'Celery-free',
    'Crustacean-free',
    'Dairy-free',
    'DASH',
    'Egg-free',
    'Fish-free',
    'Fodmap-free',
    'Gluten-free',
    'Immuno-supportive',
    'Keto-friendly',
    'Kidney-friendly',
    'Kosher',
    'Low-fat-abs',
    'Low-potassium',
    'Low-sugar',
    'Lupine-free',
    'Mediterranean',
    'Mollusk-free',
    'Mustard-free',
    'No-oil-added',
    'Paleo',
    'Peanut-free',
    'Pescatarian',
    'Pork-free',
    'Red-meat-free',
    'Sesame-free',
    'Shellfish-free',
    'Soy-free',
    'Sugar-conscious',
    'Sulfite-free',
    'Tree-Nut-free',
    'Vegan',
    'Vegetarian',
    'Wheat-free',
];

let hTagNamey = "";

function getHTagName() {
    return hTagNamey;
}

export default function MultipleSelectCheckmarks() {
    const [hTagName, setHTagName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setHTagName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            hTagNamey = value,
        );
    };



    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="health-multiple-checkbox-label">Health Filters</InputLabel>
                <Select
                    labelId="health-multiple-checkbox-label"
                    id="health-multiple-checkbox"
                    multiple
                    value={hTagName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {healthNames.map((healthNames) => (
                        <MenuItem key={healthNames} value={healthNames}>
                            <Checkbox checked={hTagName.indexOf(healthNames) > -1} />
                            <ListItemText primary={healthNames} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
