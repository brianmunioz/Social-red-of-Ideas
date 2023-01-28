import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Header from './components/header/Header';
import Login from './views/User/Login';
import Register from './views/User/Register';
import IdeaIndividual from './views/IdeaIndividual/IdeaIndividual';
import NotFound from './views/notFound/NotFound';
import MyIdeas from './views/myIdeas/MyIdeas';
import CreateDeleteForm from './components/idea/CreateDeleteForm';
import TopIdeas from './views/top/TopIdeas';
import MyAccount from './views/User/MyAccount';
import Config from './views/User/Config';
import UserProfile from './views/userProfile/userProfile';
function App() {
  return (
    <div className="App background" style={{ height: "100%" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/idea/:ideaID" element={<IdeaIndividual />}></Route>
        <Route path="/myideas" element={<MyIdeas />}></Route>
        <Route path="/myaccount" element={<MyAccount />}></Route>
        <Route path="/myaccount/config" element={<Config />}></Route>
        <Route path="/edit/:ideaID" element={<CreateDeleteForm  mode="edit"  />}></Route>
        <Route path="/create" element={<CreateDeleteForm mode='create' />}></Route>
        <Route path="/top" element={<TopIdeas />}></Route>
        <Route path="/profileUser" element={<UserProfile/>}></Route>
        <Route path="/profileUser/:userID" element={<UserProfile/>}></Route>


        <Route  path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
