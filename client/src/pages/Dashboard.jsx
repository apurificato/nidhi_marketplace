import { useAuth } from '../context/AuthContext';

function Dashboard( ) {

    const { user } = useAuth();

    if (!user) {
      return <div>Loading...</div>;
    }

    return(
        <section>
            <div className="dash-container">
                <div className="user-info">
                  <h1>Hi, {user.username}</h1>
                  <p>What would you like to do?</p>
                </div>
                <aside className="categories-table">
                    <a href="/">Category</a>
                    <a href="/">Category</a>
                    <a href="/">Category</a>
                    <a href="/">Category</a>
                    <a href="/">Category</a>
                </aside>
            </div>
            <div>
      
            </div>
        </section>
    )
}

export default Dashboard