import React from 'react'
import { Link } from 'react-router-dom';
import { userToken } from './TokenAtom';
import { useRecoilValue } from 'recoil'

export default function Nav() {
    const Islogin = useRecoilValue(userToken)
    return (
        <div className='fixed top-0 bg-emerald-500 w-full h-auto text-white'>
            <nav className='w-2/3 m-auto flex justify-end items-center bg-emerald-500'>
                <Link to="/" className="hover:text-emerald-500 hover:bg-white p-6 mr-4 font-bhs">홈</Link>
                <Link to="/Bycle" className="hover:text-emerald-500 hover:bg-white p-6 mr-4 font-bhs">자전거길</Link>
                <Link to="/LogIn" className="hover:text-emerald-500 hover:bg-white p-6 mr-4 font-bhs">{Islogin ? "로그아웃" : "로그인"}</Link>
                <Link to="/Community" className="hover:text-emerald-500 hover:bg-white p-6 mr-4 font-bhs">커뮤니티</Link>
                {/* <Link to="/Sprout" className="hover:text-emerald-500 hover:bg-white p-6 font-bhs">내 새싹</Link> */}
            </nav>
        </div>
    )
}
