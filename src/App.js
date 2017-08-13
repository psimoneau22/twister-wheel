import React, { Component } from 'react';
import './App.css';
import Spinner from './Spinner';

class App extends Component {

  state = {
    angle: 0,
    spinning: false,
    lastStatus: {},
    currentStatus: { },
  };

  spin = () => {
    if(this.state.spinning)
      return;

    this.setState(state => {
      let angle, result;
      do {
        angle = Math.random() * 360 + 360 * 10 + state.angle;
        result = this.spinner.getResult(angle);
      } while(this.matchesCurrent(state.currentStatus, result));
      
      return {
        spinning: true,
        angle,
        lastStatus: result,
        currentStatus: {
          ...state.currentStatus,
          [result.appendage]: result,
        }
      };
    });
  }

  endSpin = () => {
    this.setState(state => ({
      angle: state.angle % 360,
      spinning: false,
    }));
  }

  matchesCurrent = (currentStatus, status) => currentStatus[status.appendage] && currentStatus[status.appendage].color === status.color;

  render() {
    return (
      <div className="App">
        <Spinner ref={el => this.spinner = el} {...this.state} onSpin={this.spin} onEndSpin={this.endSpin}/>
        <div>
          {Object.keys(this.state.currentStatus).map(appendage => (
            <div key={appendage} style={{backgroundColor: this.state.currentStatus[appendage] === this.state.lastStatus ? 'yellow': '' }}>{`${appendage}: ${this.state.currentStatus[appendage].color}`}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
