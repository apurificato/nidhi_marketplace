import ImageSlider from "../components/Carousel"

function Dashboard() {




    return(
        <section className="dashboard">
  <div className="dash-container">
    <div className="left-column">
      <div className="user-info">
        <h2>Hi, user</h2>
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