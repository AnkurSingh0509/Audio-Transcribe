import { useState } from "react";
import axios from 'axios';

const AudioUploader =() =>{
    const[file,setFile]=useState(null);
    const[transcription,setTranscription]=useState("");

    const handleFilechange =(e)=>{
        setFile(e.target.files[0]);
    };

    const handleUpload= async()=>{
        const formData = new FormData();// creating new object of form data to construct key value pairs to represent forms fields and value
        formData.append('file',file);// sending files through through http request
        try{

            //sending post request to api
            const response= await axios.post('http://loacalhost:8080/api/transcribe',formData,{
                headers:{
                    "Content-Type": 'multipart/form-data',
                }
            });
            setTranscription(response.data);//after getting the response updating the response
        }catch (error){
            console.error("Error in Transcribing Audio",error);
        }
    };


    return (
        <div className="container">
            <h1>
                Audio to To Transcriber</h1>
                <div className=" file-input">
                    <input type="file" accept="audio/*" onChange={handleFilechange}/>
                </div>
                <button className="upload-button" onClick={handleUpload} >Upload and Transcribe</button>
                <div className="transcription-result">
                    <h2>Transcription Result</h2>
                    <p>{transcription}</p>

                </div>
        </div>
    );
}
export default AudioUploader;