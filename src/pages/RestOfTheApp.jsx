import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';


export const RestOfTheApp = () => {
  const { profile } = useAuthContext();

  // this is not the cleanest way to handle "authentication routing" but works for now
  if (!profile) {
    return (
      <div>
        <h1>Hello</h1>
        <p>
          Please <Link to='/login'>log in here</Link>
        </p>
      </div>
    );
  }

  return <Navigate to={'/home'} />

}
