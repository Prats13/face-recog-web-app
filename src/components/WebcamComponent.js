import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);

  const handleSignUpButtonClick = async () => {
    setShowWebcam(true);
  };

  const handleCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      await axios.post('http://localhost:5001/api/users', { username: 'user1', image: imageSrc });
      alert('User image captured and stored successfully!');
    } catch (error) {
      console.error('Error storing user image:', error);
      alert('Failed to store user image');
    }
  };
  

  return (
    <div>
      <h1>Webcam SignUp</h1>
      {!showWebcam && (
        <Button variant="primary" onClick={handleSignUpButtonClick}>
          SignUp with Webcam
        </Button>
      )}
      {showWebcam && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
          />
          <Button variant="danger" onClick={() => setShowWebcam(false)}>
            Close Webcam
          </Button>
          <Button variant="success" onClick={handleCapture}>
            Capture Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default WebcamComponent;
