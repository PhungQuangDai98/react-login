import React, {useState} from 'react';
// import { Redirect } from 'react-router-dom';
import { login } from "../../API/AxiosService";
// import queryString from "query-string";
// import $ from 'jquery';
// import { login } from "../../API/JQueryService";
import "./stylesheet.css"
// async function login() {

// }
function Login(props) {
    const [username, SetUsername] = useState("Administrator");
    const [password, SetPassword] = useState("Admin@123");

    const onChangeUsername = (event) => {
        console.log("username: ", event.target.value)
        SetUsername(event.target.value);
    }
    const onChangePassword = (event) => {
        console.log("password: ", event.target.value);
        SetPassword(event.target.value);
    }
    const handleLogin = async () => {
        login(username, password).then(() => {
            props.history.push("/Home");
        });
    }
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <h5 className="title">LOGIN USER</h5>
                {/* <div className="fadeIn first">
                    <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                </div> */}
                {/* Login Form */}
                <form>
                <div className="form-group">
                    <label htmlFor="username" className="text-info">Username:</label><br />
                    <input type="text" name="username" id="username" className="form-control" defaultValue="Administrator" value={username} onChange={e => onChangeUsername(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-info">Password:</label><br />
                    <input type="password" name="password" id="password" className="form-control" defaultValue="Admin@123" value={password} onChange={e => onChangePassword(e)} />
                </div>
                <div className="form-group text-center">
                    <input type="button" className="btn btn-info btn-md" defaultValue="Login" onClick={handleLogin} />
                </div>
                </form>
                <div id="formFooter">
                <a className="underlineHover" href="/Home">Forgot Password?</a>
                </div>
            </div>
        </div>
    );

}

export default Login;
