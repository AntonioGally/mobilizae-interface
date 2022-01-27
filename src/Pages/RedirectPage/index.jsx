import { useEffect } from "react";
import { useHistory } from "react-router-dom"

const RedirectPage = () => {
    const history = useHistory();
    useEffect(() => {
        history.push("/");
    }, [history]);
    return null
}

export default RedirectPage