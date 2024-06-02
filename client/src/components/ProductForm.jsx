import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_ITEM } from '../graphql/mutations';
import { GET_USER_DETAILS, GET_ITEMS } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import FileUpload from './FileUpload';
import { useUserData } from '../context/UserDataContext';
import { useItemsData } from '../context/ItemsContext';

const initialFormState = {
  userId: '',
  name: '',
  description: '',
  startingBid: '',
  imageId: '' // Add imageId to the form state
};

function ProductForm({ handleClose }) {
  const {userDetails, setUserDetails} = useUserData()
  const {items, setItems} = useItemsData()

  const [formData, setFormData] = useState(initialFormState);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({ ...prevData, userId: user.id }));
    }
  }, [user]);

  const [createItem] = useMutation(CREATE_ITEM, {
    update(cache, { data: { createItem } }) {
      // Update the cache with the new post
      const { user: cachedUser } = cache.readQuery({
        query: GET_USER_DETAILS,
        variables: { id: user.id } // Use user.id from AuthContext
      });

      console.log(cachedUser)
      console.log(user)

      cache.writeQuery({
        query: GET_USER_DETAILS,
        variables: { id: user.id },
        data: {
          user: {
            ...cachedUser,
            itemsForSale: [...cachedUser.itemsForSale, createItem]
          }
        }
      });
      const { user: updatedUser } = cache.readQuery({
        query: GET_USER_DETAILS,
        variables: { id: user.id } // Use user.id from AuthContext
      })
      setUserDetails(updatedUser)
      
      let updatedItems = [...items,createItem]
      setItems(updatedItems)
    },
    onCompleted: () => {
     
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
      console.log('Item created:', data);
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };


  return (
    <section id="product-post-form" >

      <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center flex-column">
        <div className='p-2'>
          <input
            className="bg-dark-subtle border-0 rounded p-3 "
            type="text"
            id="name"
            name="name"
            placeholder="product name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='p-2'>
          <textarea
            className="text-bg-dark border-0 rounded p-3 color-light"
            id="description"
            name="description"
            placeholder="description"
            rows={5}
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className='p-2'>

          <input
            className="bg-dark-subtle border-0 rounded p-3"
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
        <button type="submit" onClick={handleClose}>Submit</button>
      </form>
    </section>
  );
}

export default ProductForm;

