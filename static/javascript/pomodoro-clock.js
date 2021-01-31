const audio = document.getElementById("beep");

// Class component containing all app components and states
class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  // App default states
  state = {
    breakTime: 5,
    sessionTime: 25,
    clockTime: 25 * 60,
    currentTimer: 'Session',
    isPlaying: false
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handlePlayPause = () => {
    const {isPlaying} = this.state;
    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false
      });
    } else {
      this.setState({
        isPlaying: true
      });
      this.loop = setInterval(() => {
        const {
          clockTime,
          currentTimer,
          breakTime,
          sessionTime
        } = this.state;

        // if (clockTime <= 10) {
        //   document.getElementById("clockContainer").style.backgroundColor = "red";
        // } else {
        //   document.getElementById("clockContainer").style.backgroundColor = "rgba(192,192,192,0.2)";
        // }

        if (clockTime === 0) {
          this.setState({
            currentTimer: (currentTimer === 'Session') ? 'Break' : 'Session',
            clockTime: (currentTimer === 'Session') ? (breakTime * 60) : (sessionTime * 60)
          });
          audio.play();
        } else {
          this.setState({
            clockTime: clockTime - 1
          });
        }
      }, 1000);
    }
  }

  handleReset = () => {
    this.setState({
      breakTime: 5,
      sessionTime: 25,
      clockTime: 25 * 60,
      currentTimer: 'Session',
      isPlaying: false
    });
    clearInterval(this.loop);
    audio.pause();
    audio.currentTime = 0;
  }

  // Function to convert time from seconds into minutes and seconds in the mm:ss format
  convertTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    minutes = minutes < 10 ? ('0' + minutes) : minutes
    seconds = seconds < 10 ? ('0' + seconds) : seconds
    return `${minutes}:${seconds}`
  }

  handleBreakDecrement = () => {
    const {breakTime} = this.state;
    if (breakTime > 1) {
      this.setState({
        breakTime: breakTime - 1
      });
    };
  }

  handleBreakIncrement = () => {
    const {breakTime} = this.state;
    if (breakTime < 60) {
      this.setState({
        breakTime: breakTime + 1,
      });
    };
  }

  handleSessionDecrement = () => {
    const {sessionTime, clockTime, isPlaying} = this.state;
    if (sessionTime > 1 && isPlaying == false) {
      this.setState({
        sessionTime: sessionTime - 1,
        clockTime: (sessionTime - 1) * 60
      });
    }
  }

  handleSessionIncrement = () => {
    const {sessionTime, clockTime, isPlaying} = this.state;
    if (sessionTime < 60 && isPlaying == false) {
      this.setState({
        sessionTime: sessionTime + 1,
        clockTime: (sessionTime + 1) * 60
      });
    };
  }



  render() {

    const {
      breakTime,
      sessionTime,
      clockTime,
      currentTimer,
      isPlaying
    } = this.state;

    // Declaring the props for the break length controller
    const breakProps = {
      title: 'Break',
      count: breakTime,
      handleDecrement: this.handleBreakDecrement,
      handleIncrement: this.handleBreakIncrement
    }
    // Declaring the props for the session length controller
    const sessionProps = {
      title: 'Session',
      count: sessionTime,
      handleDecrement: this.handleSessionDecrement,
      handleIncrement: this.handleSessionIncrement
    }

    return (
      <div>
        <div className="flex">
          {/* Rendering the break and session length controllers to the UI with the SetTimer stateless functional component and adding props */}
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        {/* Rendering the clock timer countdown with controls to the UI */}
        <div className="clock-container" id="clockContainer">
          <h1 id="timer-label">{currentTimer}</h1>
          <span id="time-left">{this.convertTime(clockTime)}</span>
          <div className="flex">
            <button id="start_stop" onClick={this.handlePlayPause}>
              <i className={`fas fa-${isPlaying ? "pause" : "play"}`} />
            </button>
            <button id="reset" onClick={this.handleReset}>
              <i className="fas fa-sync" />
            </button>
          </div>
        </div>
      </div>
    );
  }
};
// Stateless functional component to create the break and session length controllers
const SetTimer = (props) => {
  const id = props.title.toLowerCase();
  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>{props.title} Length</h2>
      <div className="flex actions-wrapper">
        <button id={`${id}-decrement`} onClick={props.handleDecrement}>
          <i className="fas fa-arrow-down" />
        </button>
        <span id={`${id}-length`}>{props.count}</span>
        <button id={`${id}-increment`} onClick={props.handleIncrement}>
          <i className="fas fa-arrow-up" />
        </button>
      </div>
    </div>
  );
}
// ReactDOM rendering API
ReactDOM.render(<App />, document.getElementById('app'));
