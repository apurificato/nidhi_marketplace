
function About() {
    return (

    <section className="d-flex">
    <div className="row justify-content-center">
        <div className="container">
            <div className="row justify-content-center">
                <div className="column col-12 p-5">
                    <h1 className="display-3 py-3">Learn More About <span className="text-success">OUR_SITE</span> Marketplace</h1>
                    <p className="px-5 text-start">OUR_SITE was brought to life to give everyday consumers an environment to share, sell, and buy products on the secondhand market. As a digital marketplace, people can quickly and easily register an account to become a new user. Once they have created an account, they will then be able to post new product listings to the site and start selling to other users. Item posts will be public and once created, user item posts will render into a feed on a main page of OUR_SITE, available to other users to bid on those items.</p>
                </div>
                <div className="card text-white text-center bg-dark w-75 p-5">
                    <h3 className="card-header" id="techstack-header-title">How OUR_SITE Was Created</h3>
                    <div className="card-body">
                        <div className="d-flex flex-row pt-3 justify-content-between">
                            <div className="col-1"><img src="MongoDB-icon.svg" height="50px"/></div>
                            <div className="col-1"><img src="ExpressJS-icon.svg" height="50px"/></div>
                            <div className="col-1"><img src="react.svg" height="50px"/></div>
                            <div className="col-1"><img src="Node-js-icon.svg" height="50px"/></div>
                            <div className="col-1"><img src="GraphQL-icon.svg" height="50px"/></div>
                        </div>
                    </div>
                    <h5 className="card-title pt-5">This Full Stack website was built with the above M-E-R-N-G Stack Technology.</h5>
                </div>
                <div className="column col-12 p-5">
                    <h3 className="text-left display-6 py-3">OUR_SITE Creation, In-Depth</h3>
                    <p className="text-start px-5">The idea for OUR_SITE started as a Full-Stack software programming challenge, using MERNG technology. The Front-End coding on this website was done with React, CSS Bootstrap Framework, and other aspects of JavaScript. Back-End programming was done utilizing shell scripting in the command line terminal with <a className="text-primary" href="https://nodejs.org/en">Node.js</a> and <a className="text-primary" href="https://www.npmjs.com/">npm</a> (Node Package Manager) installs, specifically <a className="text-primary" href="https://expressjs.com/">Express.js</a>. Additionally, MongoDB was used for database storage, combined with GraphQL for querying user data into our MongoDB database. Once finished, the application was deployed unto the <a className="text-primary" href="https://www.render.com">Render</a> free cloud hosting platform. All of the above technologies combined make this project a Full-Stack Development application.</p>
                </div>
            </div>
        </div>
    </div>
</section>

    )
  }
  
  export default About

