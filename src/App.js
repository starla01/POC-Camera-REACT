import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class App extends Component {
  	constructor(props, context){
		super(props, context);
		this.state = {
      images: []
		}
  }
 
  onCameraError (error) {
    console.error('onCameraError', error);
  }
 
  onCameraStart (stream) {
    console.log('onCameraStart');
  }
 
  onCameraStop () {
    console.log('onCameraStop');
  }

  onTakePhoto(uri){
    const images = this.state.images
    images.push(uri)
    this.setState({image: images})
  }

  mobileCapture(e){
    const _this = this;
    const images = this.state.images;
    const img =  e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); 
    reader.onloadend = function() {
        const base64data = reader.result;
        console.log("G4: -> ", base64data);
        images.push(base64data)
        _this.setState({images: images})
    }
  }
  
  render() {
    console.log(this.state.images)
    const photos = this.state.images.map(images => <img src={images} width="300" />)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          sizeFactor = {1}
          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
          onCameraStop = { () => { this.onCameraStop(); } }
        />
        <p>Image URI</p>
        <p>{photos}</p>
        <input type="file" accept="image/*" capture="camera" onChange={(e) => { this.mobileCapture(e)}} />
      </div>
    );
  }
}

export default App;
