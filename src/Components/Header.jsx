import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "./header.css"

let Header = ({user, setUser}) => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    const auth = getAuth()
    signOut(auth).then(() => {
      console.log('Sign out successful')
      setUser(null)
      navigate('/')
    })
  }

  return (
    <div className="header">
      <div className="titslo">
        <h1 className="Title">ProdPlanner</h1>
        <h2 className='slogan'>Plan Better</h2>
        <h2>Welcome, {user ? user.email : "Guest"}</h2>
      </div> 

      <div className="nav">
        {!user && (
            <ul>
              <li><Link to='/signup'>Sign up!</Link></li>
              <li><Link to='/login'>Log in!</Link></li>
              <li><Link to='/todolist'>Check To Do list</Link></li>
              <li><Link to='/todoform'>Add a new To Do!</Link></li>
            </ul>
            )}
        {user && (
          <ul>
            <li><Link to='/todolist'>Check To Do list</Link></li>
            <li><Link to='/todoform'>Add a new To Do!</Link></li>
            <li className='fakelink'
            onClick={handleSignOut}>Sign Out</li>
          </ul>
        )}
      </div>
  </div>
  )
}

export default Header