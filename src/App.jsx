import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate  
} from "react-router-dom";

import {Emailroutes,Loginroutes}  from "./utils/EmailRoutes";
import React, { Suspense, lazy ,useState, useEffect} from "react";
import SuspenseLoader from "./components/common/SuspenseLoader";
import { useAuthContext } from "./Contexts/AuthContext";
const ErrorComponent = lazy(() => import("./components/common/ErrorComponent"));




const RedirectToInbox = () => {
  const navigate = useNavigate();  navigate('/emails/inbox');
  return null;
};


const Emailrouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route 
      path={Emailroutes.main.path}
       element={<Navigate to={`${Emailroutes.emails.path}/inbox`} />}
      />
      <Route path={Emailroutes.main.path} element={<Emailroutes.main.element />}>
        <Route
          path={`${Emailroutes.emails.path}/:type`}
          element={<Emailroutes.emails.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={Emailroutes.view.path}
          element={<Emailroutes.view.element />}
          errorElement={<ErrorComponent />}
        />
      </Route>
{/* 
      <Route
        path={Emailroutes.invalid.path}
        element={<Navigate to={`${Emailroutes.emails.path}/inbox`} />}
      /> */}
       
       <Route
        path="*"
        element={<RedirectToInbox />}
      />
    </Route>
  )
);
const Loginrouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      
<Route path={Loginroutes.Login.path}element={<Loginroutes.Login.element />}/>
<Route path={Loginroutes.ForgotMail.path}element={<Loginroutes.ForgotMail.element />}/>
<Route path={Loginroutes.SignUp.path}element={<Loginroutes.SignUp.element />}/>
<Route path={Loginroutes.Reset.path}element={<Loginroutes.Reset.element />}/>
<Route    path={Loginroutes.invalid.path}  element={<Navigate to={`/login`} />}/>
    </Route>
  )
);
function App () {
  const { isLoggedIn, decodedToken,isExpired } = useAuthContext();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000*5); // 5 seconds

    return () => clearTimeout(timer);
  }, []);
 
  if (!showContent) {
    return <SuspenseLoader />;
  }
  
 console.log("isLoggedIn :"+ isLoggedIn) 
console.log( "decodedToken") 
console.log( decodedToken?decodedToken.name:"") 

console.log("Token :"+isExpired);


  return (
    <Suspense fallback={<SuspenseLoader />}>
      {!isLoggedIn && <RouterProvider router={ Loginrouter } />}
      {isLoggedIn && <RouterProvider router={Emailrouter} />}
      
      
    </Suspense>
  );
}

export default App;
