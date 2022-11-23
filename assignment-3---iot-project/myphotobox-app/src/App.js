import logo from './logo.svg';
import React, {useState, useEffect} from 'react';

import firebase from 'firebase';

import {config} from './config.js';
import './App.css';


const storage = firebase.storage();
const storageRef = storage.ref();

function App() {
    const [pictureURLs, setPictureURLS] = useState([])

    useEffect(() => {
      const fetchImages = async () => {
        let result = await storageRef.listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL())
        
        // console.log( urlPromises.values)
        
        return Promise.all(urlPromises)
        
      }
      const loadImages = async () => {
        const urls = await fetchImages()
        setPictureURLS(urls)
      }
      loadImages()
      // console.log(pictureURLs)
      })
      
  return (
    <div>
      <h3 className="h3title">My photobox</h3>
        <div className="sectionPlace">
          <section>
                {
                  pictureURLs.map((url , name) => (
                    <aside key={url.name}>
                      <img src ={url} alt="photoboxImg"/>
                      <h1> {url.slice(75,99 )} </h1>
                      
                    </aside>
                  ))
                }
          </section>
        </div>
    </div>

    
    
  );
}

export default App;
