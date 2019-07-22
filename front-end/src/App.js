import React from "react";
import "./App.css";
import axios from "axios";
import Loader from "react-loader-spinner";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      loading: false
    };
  }

  async componentWillMount() {
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/fetchAll`
      );
      this.setState({ images: data.images, loading: false });
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="Loading">
          <Loader
            type="Ball-Triangle"
            color="#00BFFF"
            height="100"
            width="100"
          />
        </div>
      );
    } else if (!this.state.loading && this.state.images.length > 0) {
      return (
        <div className="App">
          {this.state.images.map((image, key) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
            >
              <img
                className={"image"}
                src={`${process.env.REACT_APP_API_URL}${image.imageUrl}`}
                alt={image.filname}
                key={key}
              />
            </a>
          ))}
        </div>
      );
    } else {
      return <div className="Loading">
        <h3>Oups... No data!</h3>
      </div>;
    }
  }
}

export default App;
