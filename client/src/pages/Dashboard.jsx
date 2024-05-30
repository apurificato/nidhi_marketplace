import ImageSlider from "../components/Carousel";
import ProductForm from "../components/ProductForm";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  
  if (!user) {
    return <h1>Loading...</h1>;
  }

    return(
        <section className="dashboard">
  <div className="dash-container">
    <div className="left-column">
      <div className="user-info">
        <h2>Hi, {user.username}</h2>
        <p>What would you like to do?</p>
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
    <div className="carousel-container">
      <ImageSlider />
    </div>
  </div>
  <ProductForm />
</section>
    )
}

export default Dashboard