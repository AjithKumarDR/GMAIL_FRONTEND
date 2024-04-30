
import { lazy } from "react";

 const Main = lazy(() => import("../pages/Main"));
//const Homepage = lazy(() => import("../components/Homepage"));
// const Email = lazy(() => import("../components/Email"));
const Emails = lazy(() => import("../components/Emails"));
const ViewEmails = lazy(() => import("../components/ViewEmail"));
const Login = lazy(() => import("../components/Login"));
const ForgotMail = lazy(() => import("../components/ForgotMail"));
const SignUp = lazy(() => import("../components/SignUp"));
const Reset = lazy(() => import("../components/Reset"));
export const Emailroutes = {
  main: {
    path: "/",
    element: Main,
  },
  emails: {
    path: "/emails",
    element: Emails,
  },
  view: {
    path: "/view",
    element: ViewEmails,
  },
  invalid: {
    path: "/",
    element: Main,
  },
  
};

export const Loginroutes = {

  Login: {
    path: "/login",
    element: Login,
  },
  SignUp: {
    path: "/signup",
    element:SignUp ,
  },
  ForgotMail: {
    path: "/ForgotMail",
    element:ForgotMail ,
  },
  Reset: {
    path: "/ForgotMail/Reset/*",
    element: Reset,
  },
  invalid: {
    path: "*",
    element: Login,
  },
}


