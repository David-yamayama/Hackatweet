import Login from '../components/Login';
import Home from '../components/Home';
import { useSelector } from 'react-redux';


export default function Index() {
  const user = useSelector((state) => state.user);
  console.log('USER', user)
  return user.token ? <Home /> : <Login />;
}


