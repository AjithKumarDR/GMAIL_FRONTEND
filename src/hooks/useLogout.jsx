import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../Contexts/AuthContext";
function useLogout(){
    const { setLoggedIn } = useAuthContext();
    
    let navigate = useNavigate()
    return ()=>{
        sessionStorage.clear()
        setLoggedIn(false);
        navigate('/login')
    }
}
export default useLogout 