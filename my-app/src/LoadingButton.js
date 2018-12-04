import React from 'react';

export default class LoadingButton extends React.Component {
    constructor(props, context) {
        super(props, context);
  
        this.handleClick = this.handleClick.bind(this);
  
        this.state = {
            isLoading: false
        };
    }
  
    handleClick() {
        this.setState({ isLoading: true });
  
        console.log(this.props.age);
        console.log(this.props.gender);

        // This probably where you would have an `ajax` call
        
        setTimeout(() => {
            // Completed of async action, set loading state back
            this.setState({ isLoading: false });
            }, 2000);
        }
  
    render() {
        const { isLoading } = this.state;
        return (
            <button
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        );
    }
}