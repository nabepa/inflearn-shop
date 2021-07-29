import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUploader from '../../utils/FileUploader';

const { Title } = Typography;
const { TextArea } = Input;

const CONTIENTS = [
  { key: 0, value: '아시아' },
  { key: 1, value: '아프리카' },
  { key: 2, value: '유럽' },
  { key: 3, value: '북미' },
  { key: 4, value: '남미' },
  { key: 5, value: '호주' },
  { key: 6, value: '남극' },
];

const UploadProductPage = ({ user, history }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [contient, setContient] = useState(1);
  const [images, setImages] = useState([]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'title':
        return setTitle(value);
      case 'description':
        return setDescription(value);
      case 'price':
        return setPrice(value);
      case 'contient':
        setContient(value);
      default:
    }
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!title || !description || !price || !contient || images.length === 0) {
      return alert('모든 값을 넣어주셔야 합니다.');
    }

    const body = {
      writer: user.userData._id,
      title,
      description,
      price,
      contient,
      images,
    };

    axios
      .post('/api/product', body) //
      .then((res) => {
        if (res.data.success) {
          alert('상품 업로드에 성공했습니다.');
          history.push('/');
        } else {
          alert('상품 업로드에 실패했습니다.');
        }
      });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>
      <Form onSubmit={submitHandler}>
        <FileUploader refreshFunction={updateImages} />
        <br />
        <br />
        <label>이름</label>
        {/* Todo: 굳이 value를 지정해줄 필요가 있나? antd같은 애들의 Input tag는 알아서 값 갱신 해주는데 */}
        <Input name='title' value={title} onChange={onChange} />
        <br />
        <br />
        <label>설명</label>
        <TextArea name='description' value={description} onChange={onChange} />
        <br />
        <br />
        <label>가격($)</label>
        <Input name='price' value={price} type='number' onChange={onChange} />
        <br />
        <br />
        <label>대륙</label>
        <select name='contient' value={contient} onChange={onChange}>
          {CONTIENTS.map((contient) => (
            <option key={contient.key} value={contient.key}>
              {contient.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType='submit'>확인</Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
