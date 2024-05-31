import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_ITEM } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import FileUpload from './FileUpload';

const initialFormState = {
  userId: '',
  name: '',
  description: '',
  startingBid: '',
  imageId: '' // Add imageId to the form state
};

function ProductForm({ refetch }) {
  const [formData, setFormData] = useState(initialFormState);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({ ...prevData, userId: user.id }));
    }
  }, [user]);

  const [createItem] = useMutation(CREATE_ITEM, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error creating item:', error);
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'startingBid' ? parseFloat(value) : value
    });
  };

  const handleImageUpload = (publicId) => {
    setFormData((prevData) => ({ ...prevData, imageId: publicId }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createItem({
        variables: {
          userId: formData.userId,
          name: formData.name,
          description: formData.description,
          startingBid: parseFloat(formData.startingBid),
          imageId: formData.imageId // Include imageId in the mutation variables
        }
      });
      refetch();
      console.log('Item created:', data);
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };


  return (
    <section id="product-post-form">
      <h3>Fill Out Form to List an Item</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="product name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            placeholder="description"
            rows={5}
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>

          <input
            type="number"
            id="startingBid"
            name="startingBid"
            placeholder="place a bid"
            value={formData.startingBid}
            onChange={handleInputChange}
            required
          />
        </div>
        <FileUpload setImageId={handleImageUpload} />
        <input type="hidden" name="userId" value={formData.userId} />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default ProductForm;

/* <label htmlFor="name">Product Name:</label>

<label htmlFor="description">Description:</label>

<label htmlFor="startingBid">Starting Bid:</label> */

