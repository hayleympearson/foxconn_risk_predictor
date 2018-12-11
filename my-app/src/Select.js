import React from 'react';
import ReactSelect from 'react-select';
import {category_array, options_array} from './constants.js';
import './Select.css';

export default class Select extends React.Component {
    state = {
        selectedOption: null,
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.onFieldSelected(selectedOption.label);
    }

    render() {
        const { selectedOption } = this.state;

        const index = category_array.indexOf(this.props.category);
        const options = options_array[index];

        return (
            <div>
                <div><strong>{this.props.category}:</strong></div>
                <ReactSelect 
                    className="Select"
                    isSearchable={true}
                    onChange={this.handleChange}
                    options={options}
                    value={selectedOption}> 
                </ReactSelect>
            </div>
        );
    }
}
