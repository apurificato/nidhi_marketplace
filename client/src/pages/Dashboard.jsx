
import { useAuth } from '../context/AuthContext';
import ProductForm from "../components/ProductForm"
import ImageSlider from "../components/Carousel"

function Dashboard() {


    const { user } = useAuth();

    if (!user) {
      return <div>Loading...</div>;
    }

    return(

<section className="dashboard">
  <div className="carousel-container">
    <ImageSlider />
  </div>
  <div className="dash-container">
    <div className="left-column">
      <div className="user-card">
        <h3>Hi, {user.username}</h3>        
        <h5>What are you looking for today?</h5>
      </div>
        <aside className="categories-table">
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
          <a className="categories-item" href="/">Category</a>
        </aside>
    </div>
    <div className='right-column'>
    <h2>Looking to Sell Some Products On Our Site?</h2>
      <ProductForm />
    </div>
  </div>
</section>

    )
}

export default Dashboard