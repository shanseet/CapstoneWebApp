import React from 'react';
import StartQns from './StartQns';
import ActivePrac from './ActivePrac';

class StartPrac extends React.Component {
    constructor() {
        super();
        this.state = {
            numDancers: 1,
            hasStarted: false
        };

        this.handleStart = this.handleStart.bind(this);
    }

    handleStart() {
        this.setState(state => ({
            hasStarted: !state.hasStarted
        }));
    };

    render() {
        return (
            <div className="text-center">
                {this.state.hasStarted ?
                    <ActivePrac /> 
                    :
                    <StartQns
                        setDancers={(e) => this.setState({ numDancers: parseInt(e.target.name) })}
                        numDancers={this.state.numDancers}
                        handleStart={this.handleStart}
                        hasStarted={this.state.hasStarted}
                    />
                }
            </div>
        )
    }
}

export default StartPrac;