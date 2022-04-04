const ThankYouPage = () =>{
    return(<>
        <div className="row justify-content-center m-0 ">
        <div className="card col-md-4 col-xs-12 mt-5 mb-5 bodyColor">
          <div style={{ textAlign: "center" }}>
            <img
              className="card-img-top mt-4"
              src="https://raw.githubusercontent.com/devck84/surveyvor/master/epstmlgv1.png"
              alt="Card image cap"
              style={{ width: "50%" }}
            />
          </div>
          <div className="card-body">
          <div style={{ textAlign: "center" }}>
            <h4 className="card-title">See you soon!  <span style={{color: "#d36b2ad5"}}>Thank you</span></h4>
            <hr />
            <p style={{ color:'gray'}}>Thank you for using our platform!</p>
            </div>
          </div>
        </div>
      </div>
    </>);
}

export default ThankYouPage;