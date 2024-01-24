import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';

export const BlogCreate = () => {
  const { profile } = useAuthContext();

  // this is not the cleanest way to handle "authentication routing" 
  if (!profile) {
    console.warn('profile is not defined. Redirecting to /login.');
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <h1>Create Blog</h1>
      <p>
        In this component, add code to fetch all of the <em>blogs</em> documents from
        Firestore (they should be in a single <em>blogs</em> collection).
      </p>
      <p>
        You will use a `useEffect` to asynchronously fetch the data, put it into
        a state variable (`useState`) and then display the values in that state
        variable here using `.map()`
      </p>
    </div>
  );
};
