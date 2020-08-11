import { useEffect, useState } from 'react';
import axios from 'axios'

export default function useUserData() {
  const [user, setUser] = useState({})

  function getUser(token) {  
    console.log('top o getuser');
    axios({
      method: "GET",
      url: `/auth/user`,
      headers: {Authorization: `Token ` + token}
    })
    .then (res => {
      setUser(res.data[0])
    }
    )
    .catch(err =>{ console.log(err);})
  
}
return {user, getUser}
}