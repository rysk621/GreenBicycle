import { BrowserRouter, Route, Routes } from 'react-router-dom';

import logo from '../src/assets/images/logo.png'
import Home from './Home'
import LogIn from './LogIn';
import Community from './Community';
import Sprout from './Sprout';
import MapTest from './MapTest';
import Register from './Register';
import Write from './Write';
import Bycle from './Bycle';
import Nav from './Nav';
import Detail from './Detail';
import Update from './Update';
import Road from './Road';

import { RecoilRoot } from 'recoil'

import './App.css';


function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
      <div className='static'>
        <Nav />
        <div className='w-2/3 m-auto'>
          <div className="absolute top-0 w-64 h-64 rounded-b-2xl bg-green-600">
            <img src={logo} className='p-8 pb-0'/>
            <div className='flex flex-row justify-center'>
              <h2 className="font-['Jua'] text-4xl text-white">Green</h2>
              <h2 className="font-['Jua'] text-2xl text-slate-800 pl-2 pt-2">자전거</h2>
            </div>
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Bycle' element={<Bycle />} />
            <Route path='/LogIn' element={<LogIn />} />
            <Route path='/Community' element={<Community />} />
            <Route path='/Write' element={<Write />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/board/:seq' element={<Detail />} />
            <Route path='/member/board' element={<Update />} />
            <Route path='/roadinfo/:seq' element={<Road />} />
            {/* <Route path='/Sprout' element={<Sprout />} /> */}
            {/* <Route path='/MapTest' element={<MapTest />} /> */}
          </Routes>
        </div>
      </div>
      {/*<footer className='h-52 w-full bg-gray-100 flex justify-center items-center'>
        <h1 className='text-slate-300 text-8xl'>FOOTER</h1>
      </footer>*/}
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
