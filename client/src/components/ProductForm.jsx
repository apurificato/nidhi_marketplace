import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_ITEM } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';

const initialFormState = {
  userId: '',
  name: '',
  description: '',
  startingBid: ''
};

function ProductForm() {
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
      navigate('/dashboard');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await createItem({
        variables: {
          userId: formData.userId,
          name: formData.name,
          description: formData.description,
          startingBid: parseFloat(formData.startingBid)
        }
      });
      console.log('Item created:', data);
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <section id="product-post-form">
      <h2>Create a Product Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="startingBid">Starting Bid:</label>
          <input
            type="number"
            id="startingBid"
            name="startingBid"
            step="0.01"
            value={formData.startingBid}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="hidden"
          name="userId"
          value={formData.userId}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default ProductForm;