import React, { useState } from "react";
import WebCam from "react-webcam";
import axios from "axios";
import { auth, logout } from "../../user_auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 400,
  height: 600,
  facingMode: "user",
};

const ImageProcess = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [image, setImage] = useState(null);
  const [nutritionContent, setNutritionContent] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);

    axios({
      method: "post",
      url: "https://my-kalory-api.site/product/add",
      data: {
        image: imageSrc,
        uid: user.uid,
      },
    }).then((response) => {
      setNutritionContent(JSON.stringify(response.data));
    });
  }, [webcamRef]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-sm-12 mx-auto">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Please Capture What You Eat!</h5>
              <div className="d-flex justify-content-center align-items-center">
                <WebCam
                  audio={false}
                  height={500}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={1800}
                  videoConstraints={videoConstraints}
                />
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-primary mr-5"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/user/main_feed");
                  }}
                >
                  Go back to main feed
                </button>
                <button
                  type="button"
                  className="btn btn-primary ml-5"
                  onClick={(e) => {
                    e.preventDefault();
                    capture();
                  }}
                >
                  Capture
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-sm-12 mx-auto mt-3">
          <textarea
            className="form-control"
            readOnly
            value={nutritionContent}
            placeholder="Result"
          />
        </div>
      </div>
      <div className="row">
        <div className="mt-3 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageProcess;
