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

/* <label htmlFor="name">Product Name:</label>

<label htmlFor="description">Description:</label>

<label htmlFor="startingBid">Starting Bid:</label> */
