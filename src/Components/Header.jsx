import { Link } from 'react-router-dom'

let Header = ({user}) => {
  
  return (
    <div className="header">
      <div className="titslo">
        <h1 className="Title">ProdPlanner</h1>
        <h2 className='slogan'>Plan Better</h2>
        <h2>Welcome, {user ? user.email : "Guest"}</h2>
      </div> 
      <div className="nav">
            <ul>
              <li><Link to='/signup'>Sign up!</Link></li>
              <li><Link to='/login'>Log in!</Link></li>
              <li><Link to='/todolist'>Check To Do list</Link></li>
              <li><Link to='/todoform'>Add a new To Do!</Link></li>

            </ul>
      </div>
  </div>
  )
}

export default Header