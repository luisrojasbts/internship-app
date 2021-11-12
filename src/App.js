import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context';
import { Home, Login, NotFound, Private } from './pages';
import './App.css';

function App() {
  return (
    <AuthProvider>
      {/*  
        Provider at top level to share information to all tree
        about the authentication
      */}

      <BrowserRouter>
        <Routes>
          <Route exact strict path="/" element={<Home />} />
          <Route exact strict path="/login" element={<Login />} />
          <Route
            exact
            string
            path="/private"
            element={
              <Authenticate>
                <Private />
              </Authenticate>
            }
          />
          {/* 
            Using path="*"" means "match anything", so this route 
            acts like a catch-all for URLs that we don't have 
            explicit routes for.
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function Authenticate({ children }) {
  const auth = useAuthContext();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default App;
