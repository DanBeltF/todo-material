import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Login} from "./component/Login";
import {TodoApp} from "./TodoApp";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

const LoginView = () => (
    <Login/>
);

const TodoView = () => (
    <TodoApp/>
);

localStorage.setItem('username', 'admin');
localStorage.setItem('password', 'admin');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false };
    }


    render() {

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">TODO React App</h1>
                    </header>

                    <br/>
                    <br/>

                    <ul>
                        { localStorage.getItem('isLoggedIn') === 'false'?
                        <li><Link to="/">Login</Link></li> :
                        <li><Link to="/todo">Todo</Link></li> }
                    </ul>

                    <div>
                        { localStorage.getItem('isLoggedIn') === 'false'?
                        <Route exact path="/" component={LoginView}/> :
                        <Route path="/todo" component={TodoView}/> }
                    </div>
                </div>
            </Router>
        );
    }

}

export default App;
