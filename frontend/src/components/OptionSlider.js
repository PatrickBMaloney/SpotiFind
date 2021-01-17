import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const OptionSlider = (props) => {
    const [searchOption, setSearchOption] = useState({
        title: props.name,
        value: 50
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setSearchOption((prevSearchOption) => {
            return {
                ...prevSearchOption,
                [name]: value
            };
        });
        props.onOptionUpdated(searchOption.title, searchOption.value);
    };

    return (
        <div className="slider">
            <Typography id="discrete-slider" gutterBottom>
                {props.name}
            </Typography>
            <Slider
                defaultValue={50}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChangeCommitted={handleChange}
                step={10}
                marks
                min={0}
                max={100}
            />
        </div>
    );
}

export default OptionSlider;