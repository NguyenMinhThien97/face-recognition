import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  loadModels,
  getFullFaceDescription,
  createMatcher,
  isFaceDetectionModelLoaded
} from '../api/face';
import DrawBox from '../components/drawBox';
import ShowDescriptors from '../components/showDescriptors';
import { JSON_PROFILE } from '../common/profile';

const MaxWidth = 600;
const boxColor = '#BE80B5';



const INIT_STATE = {
  url: null,
  imageURL: null,
  fullDesc: null,
  imageDimension: null,
  error: null,
  loading: false
};

class FaceRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INIT_STATE,
      faceMatcher: null,
      showDescriptors: false,
      WIDTH: null,
      HEIGHT: 0,
      isModelLoaded: !!isFaceDetectionModelLoaded(),
      txtName : '',
      txtAge : ''
    };
  }
changeInput = (event) =>{
  const target = event.target
  const name = target.name
const value =target.value
  // const descriptor = target.descriptor
  this.setState({
    [name] : value
  });
}

  submitForm = (event) =>{
    event.preventDefault();
    const {txtName,txtAge} = this.state;
    const item = {};
    item.name =txtName+' - '+txtAge;
    // item.descriptors = 
    console.log(item)
    // var fs = require('browserify-fs');

    // fs.mkdir('/home', function() {
    //   fs.writeFile('hello-world.txt', 'Hello world!\n', function() {
    //     fs.readFile('hello-world.txt', 'utf-8', function(err, data) {
    //       console.log(data);
    //     });
    //   });
    // });
  }

  componentWillMount() {
    this.resetState();
    let _W = document.documentElement.clientWidth;
    if (_W > MaxWidth) _W = MaxWidth;
    this.setState({ WIDTH: _W });
    this.mounting();
  }

  mounting = async () => {
    await loadModels();
    await this.matcher();
    // await this.getImageDimension(testImg);
    // await this.setState({ imageURL: testImg, loading: true });
    // await this.handleImageChange(testImg);
  };

  matcher = async () => {
    const faceMatcher = await createMatcher(JSON_PROFILE);
    this.setState({ faceMatcher });
  };

  handleFileChange = async event => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true
    });
    this.handleImageChange();
  };

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  };

  handleButtonClick = async () => {
    this.resetState();
    let blob = await fetch(this.state.url)
      .then(r => r.blob())
      .catch(error => this.setState({ error }));
    if (!!blob && blob.type.includes('image')) {
      this.setState({
        imageURL: URL.createObjectURL(blob),
        loading: true
      });
      this.handleImageChange();
    }
  };

  handleImageChange = async (image = this.state.imageURL) => {
    await this.getImageDimension(image);
    await getFullFaceDescription(image).then(fullDesc => {
      this.setState({ fullDesc, loading: false });
    });
  };

  getImageDimension = imageURL => {
    let img = new Image();
    img.onload = () => {
      let HEIGHT = (this.state.WIDTH * img.height) / img.width;
      this.setState({
        HEIGHT,
        imageDimension: {
          width: img.width,
          height: img.height
        }
      });
    };
    img.src = imageURL;
  };

  handleDescriptorsCheck = event => {
    this.setState({ showDescriptors: event.target.checked });
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };
  render() {
    const {
      WIDTH,
      HEIGHT,
      imageURL,
      fullDesc,
      faceMatcher,
      showDescriptors,
      isModelLoaded,
      error,
      loading
    } = this.state;

    // Display working status
    // let status = <p>Status: Model Loaded = {isModelLoaded.toString()}</p>;
    // if (!!error && error.toString() === 'TypeError: Failed to fetch') {
    //   status = (
    //     <p style={{ color: 'red' }}>Status: Error Failed to fetch Image URL</p>
    //   );
    // } else if (loading) {
    //   status = <p style={{ color: 'blue' }}>Status: LOADING...</p>;
    // } else if (!!fullDesc && !!imageURL && !loading) {
    //   if (fullDesc.length < 2)
    //     status = <p>Status: {fullDesc.length} Face Detect</p>;
    //   if (fullDesc.length > 1)
    //     status = <p>Status: {fullDesc.length} Faces Detect</p>;
    // }

    // Loading Spinner
    let spinner = (
      <div
        style={{
          margin: 0,
          color: '#BE80B5',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textShadow: '2px 2px 3px #fff'
        }}
      >
        <div className="loading" />
        <h3>Processing...</h3>
      </div>
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* {status} */}
        <div
          style={{
            position: 'relative',
            width: WIDTH,
            height: HEIGHT
          }}
        >
          {!!imageURL ? (
            <div
              style={{
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute' }}>
                <img style={{ width: WIDTH }} src={imageURL} alt="imageURL" />
              </div>
              {!!fullDesc ? (
                <DrawBox
                  fullDesc={fullDesc}
                  faceMatcher={faceMatcher}
                  imageWidth={WIDTH}
                  boxColor={boxColor}
                />
              ) : null}
            </div>
          ) : null}
          {loading ? spinner : null}
        </div>
        <form action="POST" onSubmit={(e)=> this.submitForm(e)}>
        <div
          style={{
            width: WIDTH,
            padding: 10,
            border: 'solid',
            marginTop: 10
          }}
        >
          <p>Nhập tập tin hình ảnh hoặc URL</p>
          <input
            id="myFileUpload"
            type="file"
            onChange={this.handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <br />
          <div className="URLInput">
            <input
              type="url"
              name="url"
              id="url"
              placeholder="Place your photo URL here (only .jpg, .jpeg, .png)"
              pattern="https://.*"
              size="30"
              onChange={this.handleURLChange}
            />
            <button onClick={this.handleButtonClick}>Upload</button>
          </div>
          <div>
            <input
              name="descriptors"
              type="checkbox"
              checked={this.state.showDescriptors}
              onChange={this.handleDescriptorsCheck}
            />
            <label>Show Descriptors</label>
          </div>
          <div>
            <input name= "txtName" type="text" placeholder="Nhập tên" value ={this.state.txtName} onChange = { (e) => this.changeInput(e)}></input>
            <input name= "txtAge" type="text" placeholder="Nhập tuổi" value ={this.state.txtAge} onChange = { (e) => this.changeInput(e)}></input>
          </div>
          <input type="submit" value="Submit"></input>
          {!!showDescriptors ? <ShowDescriptors fullDesc={fullDesc} /> : null}
        </div>
        </form>
      </div>
    );
  }
}

export default withRouter(FaceRecognition);
