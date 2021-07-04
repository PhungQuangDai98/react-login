import React from "react";
// import ProductAPI from "./API/ProductAPI";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
// import {getAccessToken} from "./API/AxiosService";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
    // useEffect(() => {
    //     ProductAPI.getAll()
    //         .then((result) => {
    //             console.log(result.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
        
    // }, []);
    // const history = useHistory();
    return (
        <Router>
            <Switch>
                <Route path="/" component={Login} exact></Route>
                <Route path="/Home" component={Home}></Route>
            </Switch>
        </Router>
    );
}

export default App;
