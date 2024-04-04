import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { userToken } from './TokenAtom';

export default function LogIn() {

    const navigate = useNavigate();

    const [Islogin, setIsLogin] = useRecoilState(userToken);

    const [member, setMember] = useState({
        email: '',
        password: ''
    });

    const emailRef = useRef();
    const passRef = useRef();

    const onSubmithandle = (e) => {
        e.preventDefault();

        // console.log(emailRef.current.value)
        setMember({
            id: emailRef.current.value,
            password: passRef.current.value
            // id: "admin@email.com",
            // password: "1234"
        })
    }

    useEffect(() => {
        if (member.email === "") return;

        // console.log("member", member);
        axios.post("http://10.125.121.204:8080/login", member)
            .then(res => {
                // console.log("res", res)
                if (res.headers.get("authorization")) {
                    // console.log("login", res.headers.get("authorization"))
                    alert("로그인 되었습니다.")
                    navigate("/")

                    const accessToken = res.headers.get("authorization")
                    localStorage.setItem('token', accessToken);
                    setIsLogin(accessToken);
                }
                else {
                    alert("아이디와 비밀번호 정보를 확인해 주세요.")
                }
            })
            .catch(err => console.log(err))
    }, [member]);

    useEffect(() => {
        if (Islogin) {
            localStorage.removeItem('token', Islogin);
            setIsLogin(null);
            alert("로그아웃 되었습니다.")
            navigate("/")
        }
    }, [])

    return (
        <main className='mt-72 flex-col'>
            <div className='w-1/3 border-2 mx-auto rounded-lg border-slate-300'>
                <form className='flex flex-col p-4'>
                    <div className='flex flex-col'>
                        <label className="py-1 text-slate-600 font-['Jua']">ID</label>
                        <input type="email"
                            ref={emailRef}
                            className="outline-none p-2 border-2 rounded-md border-slate-200" placeholder="이메일을 입력해 주세요" required />
                    </div>
                    <div className='flex flex-col'>
                        <label className="py-1 text-slate-600 font-['Jua']">PASSWORD</label>
                        <input type="password"
                            ref={passRef}
                            className="outline-none p-2 border-2 rounded-md border-slate-200" placeholder="비밀번호를 입력해 주세요" required />
                    </div>
                    <div className='flex justify-around'>
                        <button type='button'
                            onClick={onSubmithandle}
                            className='w-2/5 mt-8 py-2 rounded-lg bg-emerald-500 border-2 border-emerald-500 text-white hover:bg-white hover:text-emerald-500 hover:border-2 hover:border-emerald-500'>
                            로그인
                        </button>
                    </div>
                </form>
            </div>
            <div className='flex justify-center'>
                <Link to="/Register" className='w-2/5 mt-8 py-2 border-slate-200 border-t-2 flex justify-center text-slate-500 hover:text-emerald-500'>
                    <button type='button' className='w-full'>
                        회원가입
                    </button>
                </Link>
            </div>
        </main>
    )
}
