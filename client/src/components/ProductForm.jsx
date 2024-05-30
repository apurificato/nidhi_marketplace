import { useState } from 'react';



const initialFormState = {
    id: '',
  name: '',
  description: '',
  startingBid: ''
};

function ProductForm() {
const [formData, setFormData] = useState(initialFormState);


    const handleInputChange = (event) => {
    const {name, value} = event.target;
        
        setFormData({
            ...formData,
            [name]: value
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('Form submitted:', formData);

        setFormData(initialFormState)
    }


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
              value={formData.startingBid}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="hidden"
            name="id"
            value={formData.id}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    )
}


export default ProductForm