import React from 'react';
import { Link } from 'react-router-dom';
const Navbar=()=>{
    return(
        <>
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
     <Link to={'/'} >
     <a className="navbar-brand" href="#">QuizApp</a>
     </Link>
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">


      <Link to ={'/createQuestion'}> 
      <a className="nav-item nav-link" href="#">Create Question</a>
      </Link>
      <Link to={'/EditQuestion'}>
      <a className="nav-item nav-link" href="#">Edit Question</a>
      </Link>
      <Link to={'/Login'}>
      <a className="nav-item nav-link" href="#">Login</a>
      </Link>

      
    </div>
  </div>
</nav>
        </>
    )
};

export default Navbar;
