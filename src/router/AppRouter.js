import React, { useEffect } from "react";
import { Routes, Route, Link, Outlet, useNavigate, useLocation, Navigate, } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import BooksContext from "../context/BooksContext";
// import AuthContext from "../context/AuthContext";

import CaseUploadScreen from "../screens/CaseUpload";
import Fincas from "../screens/Fincas";

import EditCase from "../screens/Edit/EditCase";
import { fakeAuthProvider } from './auth';


let AuthContext = React.createContext();

function AuthProvider({ children }) {
  // let [user, setUser] = React.useState(null);
    let [user, setUser] = React.useState("admin");
  // const [user, setUser] = useLocalStorage("user", "");
    // const [user, setUser] = useLocalStorage("user", "admin");


  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };
  let value = { user, signin, signout };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const AppRouter = () => {
  const [books, setBooks] = useLocalStorage("books", []);
  
  return (

    <AuthProvider>
      <BooksContext.Provider value={{ books, setBooks }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/protected" element={<ProtectedPage />} />
              <Route path="/cases" element={<CaseUploadScreen />} />
              <Route
                path="/edit/:id"
                element={
                  <EditCase
                  />
                }
              />
              <Route path="/fincas" element={<Fincas />} />

              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BooksContext.Provider>
    </AuthProvider>



    // <Router>
    //  <AuthProvider>
    //   <nav style={{ margin: 5, paddingBottom: 25 }}>
    //     <Link to="/" style={{ padding: 5 }}>
    //       Agricultores
    //     </Link>
    //     <Link to="/fincas" style={{ padding: 5 }}>
    //       Fincas
    //     </Link>

    //   </nav>
      
    //   <BooksContext.Provider value={{ books, setBooks }}>
    //     <Routes>
    //       <Route path="/" element={<Agricultores />} />
    //       <Route path="/fincas" element={<Fincas />} />
    //       <Route
    //         path="/edit/:id"
    //         element={
    //           <EditAgricultor
    //           />
    //         }
    //       />
    //     </Routes>
    //   </BooksContext.Provider>
    //   </AuthProvider>
    // </Router>
  );
};

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        {/* <li>
          <Link to="/public">Public Pageee</Link>
        </li> */}
        {/* <li>
          <Link to="/protected">Protected Page</Link>
        </li> */}
        <li>
          <Link to="/cases">Agricultores (Protected Page)</Link>
        </li>
        <li>
          <Link to="/fincas">Fincas (Protected Page)</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}


function LoginPage() {
  



  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

    useEffect(() => {
    if (auth.user !== null){
      console.log(auth)
      // navigate("agricultores", { replace: true })
    }
    // return () => {
    //   cleanup
    // }
  }, [auth])

  let state = location.state;
  let from = state ? state.from.pathname : '/';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get('username');

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      // navigate(from, { replace: true });
      navigate('/cases')
      
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function Dashboard() {
  return <h3>Dashboard</h3>;
}

function NotFound() {
  return <h3>NotFound</h3>;
}

export default AppRouter;


