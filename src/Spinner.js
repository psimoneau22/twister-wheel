import React, { Component } from 'react';
import footSvg from './foot.svg';
import handSvg from './hand.svg';

const colors = [
    'green',
    'red',
    'yellow',
    'blue'
]
const appendages = [
    'Right Hand',
    'Right Foot',
    'Left Foot',
    'Left Hand',
]
const radius = 100;
const parts = 16;
const segmentAngle = 2 * Math.PI / parts;

export default class Spinner extends Component {

    getResult = angle => ({
        appendage: appendages[Math.floor((angle % 360) / 90)],
        color: colors[Math.floor((angle % 90) / (90 / colors.length))],
    })

    mapSegments = (_, index) => {

        const startAngle = index * segmentAngle;
        const endAngle = startAngle + segmentAngle;
        const x1 = radius * Math.sin(startAngle);
        const y1 = radius * -Math.cos(startAngle);
        const x2 = radius * Math.sin(endAngle);
        const y2 = radius * -Math.cos(endAngle);

        return <path key={index} fill={colors[index % colors.length]} d={`
            M 0 0
            L ${x1} ${y1}
            A ${radius} ${radius} 0 0 1 ${x2} ${y2}
            Z`} />
    }

    render() {
        const segments = [...Array(parts)].map(this.mapSegments);
        return (
            <div> 

                <svg    
                    version="1.1" 
                    baseProfile="full"
                    width="100vw" height="100vh"
                    viewBox="-100 -100 200 200" 
                    onClick={this.props.onSpin}>

                    {/* background */}
                    <rect x="-100" y="-100" width="200" height="200" fill="white" />

                    {/* colored segments */}
                    {segments}

                    {/* inner circle */}
                    <circle cx="0" cy="0" r="70" fill="white" />

                    {/* axis */}
                    <line x1="-100" y1="0" x2="100" y2="0" stroke="black"/>
                    <line x1="0" y1="-100" x2="0" y2="100" stroke="black"/>

                    <SpinnerHand {...this.props}/>

                    {/* labels */}
                    <text x="-95" y="-90" fontSize="10">Left Hand</text>
                    <text x="-95" y="95" fontSize="10">Left Foot</text>
                    <text x="95" y="95" textAnchor="end" fontSize="10">Right Foot</text>
                    <text x="95" y="-90" textAnchor="end" fontSize="10">Right Hand</text> 
                    
                    {/* icons */}
                    <use x="0" y="0" width="10" height="10"
                        href={`${footSvg}#foot`} 
                        style={{transform: 'rotateY(180deg) scale(.5) translateX(-110px)'}}
                        />
                    <use 
                        href={`${footSvg}#foot`}
                        style={{transform: 'scale(.5) translateX(-110px)'}}
                        />

                    <use 
                        href={`${handSvg}#hand`}
                        style={{transform: 'rotateY(180deg) scale(.4) translate(10px, -110px)'}}
                        />
                    <use 
                        href={`${handSvg}#hand`} 
                        style={{transform: 'scale(.4) translate(10px, -110px)'}}
                        />
                    
                </svg>
            </div>
        );
    }
}

class SpinnerHand extends Component {
    render() {
        const { angle, onEndSpin, spinning } = this.props;
        const style = {
            transform: `rotate(${angle}deg)`,
        }
        if(spinning) {
            style.transition = 'transform 5s ease-in-out';
        }

        return (
            <g style={style} onTransitionEnd={onEndSpin}>
                <circle cx="0" cy="0" r="4" fill="black" />
                <line x1="0" y1="0" x2="0" y2="-75" stroke="black" strokeWidth="3"/>
                <polygon points="-10,-65 0,-85 10,-65" fill="black"/>
            </g>
        );
    }
}