import { useEffect, useState } from 'react';
import axios from 'axios'

export default function useUserData() {
  const [user, setUser] = useState({})

 
return {user, setUser}
}