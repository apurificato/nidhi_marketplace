
import { useAuth } from '../context/AuthContext';



import ImageSlider from "../components/Carousel"

function Dashboard() {


    const { user } = useAuth();

    if (!user) {
      return <div>Loading...</div>;
    }

    return(

        <section className="dashboard">
  <div className="dash-container">
    <div className="left-column">
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
</section>

    )
}

export default Dashboard