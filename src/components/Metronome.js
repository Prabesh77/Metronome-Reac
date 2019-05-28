import React, { Component } from "react";
import "../App.css";
import click1 from "../sounds/click1.wav";
import click2 from "../sounds/click2.wav";

export class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bpm: 100,
      playing: false,
      count: 0,
      beatsPerMeasure: 4
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = e => {
    const bpm = e.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      this.setState({
        count: 0,
        bpm
      });
    }

    this.setState({ bpm });
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true
        },
        this.playClick
      );
    }
  };

  render() {
    let { bpm, playing } = this.state;

    return (
      <div className="container mx-auto">
        <h3>{bpm} BPM</h3>
        <label htmlFor="slider">Slide Below</label>
        <input
          id="slider"
          type="range"
          min="60"
          max="240"
          value={bpm}
          onChange={this.handleBpmChange}
        />
        <br />
        <button className="btn btn-danger" onClick={this.startStop}>
          {playing ? "Stop" : "Start"}
        </button>
      </div>
    );
  }
}

export default Metronome;
