import { useState } from 'react'
import APIForm from './components/APIForm'
import Gallery from './components/Gallery'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import './App.css'

function App() {
  const[inputs, setInputs]= useState({
    url: "",
    format:"",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",

  });

  const[ currentImage, setCurrentImage] = useState(null);

  const [prevImages, setPrevImages] = useState([]);

  const makeQuery = (requestInputs) => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = requestInputs.url.startsWith("http")
      ? requestInputs.url
      : url_starter + requestInputs.url;
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${encodeURIComponent(fullURL)}&format=${requestInputs.format}&width=${requestInputs.width}&height=${requestInputs.height}&no_cookie_banners=${requestInputs.no_cookie_banners}&no_ads=${requestInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  }
  
  const submitForm=()=>{
    let defaultValues={
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };
    if(inputs.url==""||inputs.url==" "){
      alert("Please input a URL to take a screenshot of!");
      
    }
    else{
      const updatedInputs={...inputs};
      for (const[key,value] of Object.entries(inputs)){
        if(value==""||value==" "){
          updatedInputs[key]=defaultValues[key]
        }

      }
      setInputs(updatedInputs);
      makeQuery(updatedInputs);
    }
    
  }//end of submit form

  const reset=()=>{

    setInputs({
      url: "",
      format:"",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });

  }//end of reset

  const callAPI= async(query) =>{
    const response = await fetch(query);
    const json= await response.json();
    if(json.url== null){
      alert("Oops! Something went wrong. Please check your inputs and try again.")
    }
    else{
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
  }//end of callAPI

  return (
    <>
      <div className="whole-page">
        <h1> Build Your Own Screenshot!</h1>
        <APIForm
        inputs={inputs}
        handleChange={(e)=>
          setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value.trim(),
            
          }))
        }

        onSubmit={submitForm}
        />
                {currentImage ?(
            <img
            className=" screenshot"
            src={currentImage}
            alt="Screenshot returned"
            />
          ):(
          <>
            <div className="container">
                  <h3> Current Query Status: </h3>
                  <p>
                    https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
                    <br></br>
                    &url={inputs.url} <br></br>
                    &format={inputs.format} <br></br>
                    &width={inputs.width}
                    <br></br>
                    &height={inputs.height}
                    <br></br>
                    &no_cookie_banners={inputs.no_cookie_banners}
                    <br></br>
                    &no_ads={inputs.no_ads}
                    <br></br>
                  </p>
              </div>

            <br></br>
          </>
          )
          
        }
        <br></br>
      </div>
      
      <div className="container">
        <Gallery images={prevImages}/>
      </div>
    </>

    );
  
}

export default App;
