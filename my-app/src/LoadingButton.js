import React from 'react';

export default class LoadingButton extends React.Component {
    constructor(props, context) {
        super(props, context);
  
        this.handleClick = this.handleClick.bind(this);
  
        this.state = {
            error : null,
            isLoading: false,
            loaded: false,
            items : {
                accident_risk: null,
                suicide_risk: null,
            },
        };
    }
  
    handleClick() {
        this.setState({ isLoading: true });

        setTimeout(() => {
            // Completed of async action, set loading state back
            fetch(`http://flask-foxconn-predictor-prod.us-east-2.elasticbeanstalk.com/predict?age=${encodeURIComponent(this.props.age)}&gender=${encodeURIComponent(this.props.gender)}&factory=${encodeURIComponent(this.props.factory)}`, {
                method: "GET",
            }).then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        isLoading: false,
                        loaded: true,
                        items: {
                            accident_risk: res['accident_risk'],
                            suicide_risk: res['suicide_risk'],
                        }, 
                    });
                    this.props.onResponse(this.state.items);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error: true,
                        isLoading: false,
                    });
                }
            )
            // this.setState({
            //     isLoading: false,
            //     loaded: true,
            //     items: {
            //         accident_risk: "high",
            //         suicide_risk: "low",
            //     }, 
            // });
            // this.props.onResponse(this.state.items);
        }, 1000);
    }
  
    render() {
        const {isLoading} = this.state;
        
        return (
            <div>
               <button
                disabled={isLoading || !this.props.age || !this.props.gender || !this.props.factory}
                onClick={!isLoading ? this.handleClick : null}>
                {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        );
    }
}
