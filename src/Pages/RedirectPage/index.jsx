import { useEffect } from "react";
import { useHistory } from "react-router-dom"

const RedirectPage = () => {
    const history = useHistory();
    useEffect(() => {
        localStorage.removeItem("access_token");
        history.push("/");
    }, [history]);
    return null
}

export default RedirectPage