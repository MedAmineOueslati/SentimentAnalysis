import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ProfilePage = () => {
    let {user} = useContext(AuthContext)
  return (
    <div>
        <p>Nom {user.first_name}</p>
        <p>Prenom {user.last_name}</p>
        <p>Email {user.email}</p>
        <p>DateDeNaissance {user.DateDeNaissance}</p>
    </div>
  )
}

export default ProfilePage
