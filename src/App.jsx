import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {AiOutlineCloudDownload} from "react-icons/ai";

const App = () => {
    const webcamRef = useRef(null);
    const [zoom, setZoom] = useState(1);
    const [url , setUrl] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    // zoom in and zoom out function
    const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
    const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 1));

    const captureButton = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }


    return (
        <div>
            <div className="container">
                <div className="col-lg-6 col-md-6 mx-auto py-5">
                    <h1>Web Camera with Zoom</h1>
                    <hr />
                    <div className="camaraDiv overflow-hidden" >
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            width={'100%'}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            style={{
                                transform: `scale(${zoom})`,
                                transformOrigin: "center",
                            }}
                        />
                        <div className="camaraIcon d-flex justify-content-center align-items-center">
                            <button className="btn " onClick={zoomIn}>
                                <FaPlusCircle  className="text-white fs-3" />
                            </button>
                            <div>
                                <button className="btn" onClick={captureButton}>
                                    <div className="circle_cam"></div>
                                </button>
                            </div>
                            <button className="btn" onClick={zoomOut}>
                                <FaMinusCircle className="text-white fs-3"/>
                            </button>
                        </div>
                    </div>
                    {
                        url && (
                            <div className=" downloadPosition">
                                <img src={url} alt="image" className="img-fluid"/>
                                <div className="downloadBtn">
                                    <a href={url}
                                       download="captured-image.jpg"
                                       onClick={() => setUrl(null)}
                                       className="btn fs-1 text-white">
                                        <AiOutlineCloudDownload className="downloadIcon"/>
                                    </a>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default App;
