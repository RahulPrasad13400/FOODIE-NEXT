"use client"
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({label, name}) {
  const imageInput = useRef()
  const [pickedImage, setPickedImage] = useState()

  function handlePickClick(){
      imageInput.current.click()
  }

  function handleImageChange(event){
    const file = event.target.files[0]
     if(!file){
        return
     }
     const fileReader = new FileReader()

     fileReader.onload = () => {
        setPickedImage(fileReader.result)
     }

     fileReader.readAsDataURL(file)
  }

  return ( 
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
            {!pickedImage && <p>No Image Picked yet</p>}
            {pickedImage && <Image src={pickedImage} alt='The image selected by the user' fill />}
        </div>
        <input ref={imageInput} type='file' id={name} 
         name={name} accept='image/png, image/jpeg' className={classes.input} 
         onChange={handleImageChange}/>
        <button onClick={handlePickClick} className={classes.button} type='button'>
            Pick an image
        </button>
      </div>  
    </div>
  )
}
