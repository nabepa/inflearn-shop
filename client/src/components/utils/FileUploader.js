import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUploader({ refreshFunction }) {
  const [images, setImages] = useState([]);

  const dropHandler = (files) => {
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    axios.post('/api/product/image', formData, config).then((res) => {
      if (res.data.success) {
        setImages((prevState) => {
          const newState = [...prevState, res.data.filePath];
          return newState;
        });
      } else {
        alert('파일을 저장하는데 실패 했습니다.');
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIdx = images.indexOf(image);
    setImages((prevState) => {
      const newState = [...prevState];
      newState.splice(currentIdx, 1);
      return newState;
    });
  };

  useEffect(() => {
    refreshFunction([...images]);
  }, [images]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: '1px solid lightgrey',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type='plus' style={{ fontSize: '3rem' }}></Icon>
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {images.map((image, idx) => (
          <div onClick={() => deleteHandler(image)} key={idx}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUploader;
