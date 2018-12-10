import React from 'react';

export default class LoadingButton extends React.Component {
    constructor(props, context) {
        super(props, context);
  
        this.handleClick = this.handleClick.bind(this);
  
        this.state = {
            error : null,
            isLoading: false,
            loaded: false,
            items : []
        };
    }
  
    handleClick() {
        this.setState({ isLoading: true });
  
        console.log(this.props.age);
        console.log(this.props.gender);

        //TODO: change this to real endpoint
        fetch(`http://127.0.0.1:5000/predict?age=${encodeURIComponent(this.props.age)}&gender=${encodeURIComponent(this.props.gender)}`, {
        method: "GET",
        }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
            items: result.items, loaded: true
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoading: false,
            error: true,
          });
        }
      )
        
        // setTimeout(() => {
        //     // Completed of async action, set loading state back
        //     this.setState({ isLoading: false });
        //     }, 2000);
        }
  
    render() {
            const { error, isLoading, loaded, items } = this.state;
        return (
            <div>
               <button
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}>
                {isLoading ? 'Loading...' : 'Submit'}
                </button>
                
                {/* <h2>
                    {loaded ? 'Success! ' : "Please enter your information"}
                </h2> */}
            </div>


        );
    }
}