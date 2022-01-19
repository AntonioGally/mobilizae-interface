import React from 'react';
import ImageUploading from 'react-images-uploading';
import { Button } from "react-bootstrap"

const Image = ({ images, setImages, style }) => {

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper"
            style={imageList[0] ? { backgroundImage: `url(${imageList[0]["data_url"]})`, ...style } : { ...style }}
            onClick={onImageUpload}
            {...dragProps}>
            <div />
            <spam>Click or Drop here</spam>
            {!imageList[0] && (
              <div />
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <div className="image-item__btn-wrapper" onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
                  <Button variant="primary" style={{ marginRight: 15 }} onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button variant="primary" onClick={() => onImageRemove(index)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default Image;