import React, { useContext, useState } from 'react';
import './Create.css';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../Loading/Loading';

const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false);
  const date = new Date()
  const handleSubmit = () => {
    setLoading(true);
    if (!name.trim() || !category.trim() || !price.trim() || !image) {
      setLoading(false)
      toast.error("All fields are required and must not contain only spaces!");
      return;
    }
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString()
        })
        setLoading(false); 
        navigate('/')
      })
      .catch((error) => {
        setLoading(false); 
        toast.error("Error adding product!");
        console.error("Error adding product: ", error);
      });
  }).catch((error) => {
    setLoading(false); 
    toast.error("Error uploading image!");
    console.error("Error uploading image: ", error);
  });
};
  return loading? <Loading /> : (
    <div className="container">
      <ToastContainer />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="fname"
          name="Name"
          placeholder="Name"
        />

        <label htmlFor="category">Category</label>
        <input
          className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          name="Category"
          placeholder="Category"
        />

        <label htmlFor="price">Price</label>
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="price"
          name="Price"
          placeholder='Price'
        />

        {image ? <img
          alt="Posts"
          className="previewImage"
          src={image ? URL.createObjectURL(image) : ''}
        /> : ''}

        <input
          className="fileInput"
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
        />

        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </div>

  );
};  

export default Create;
