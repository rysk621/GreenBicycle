import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState({
        //email: ''
    });

    const [join, setJoin] = useState({
        email: '',
        password: '',
        confrim: '',
        name: '',
        birth: ''
    });

    const emailRef = useRef();
    const passRef = useRef();
    const confrimRef = useRef();
    const nameRef = useRef();
    const birthRef = useRef();

    // 중복 확인 버튼이 눌렸는지 여부를 나타내는 상태
    const [checkedButtonClicked, setCheckedButtonClicked] = useState(false);

    const Checked = (e) => {
        e.preventDefault();
        // console.log("button clicked");
        setEmail({
            id: emailRef.current.value
        });

        // 중복 확인 버튼이 눌렸음을 상태에 업데이트
        setCheckedButtonClicked(true);
    }

    useEffect(() => {
        if (!checkedButtonClicked) {
            // 중복 확인 버튼이 눌리지 않았을 때는 함수 종료
            return;
        }

        // 이메일 중복 확인 API 호출
        axios.post("http://10.125.121.204:8080/idCheck", email)
            .then((res) => {
                // console.log("res.data", res.data)
                // console.log("idCheck statusCodeValue:", res.data.statusCodeValue)
                if(res.data.statusCodeValue === 200){
                    alert("사용 가능한 email 입니다")
                }
                else if (res.data.statusCodeValue === undefined) {
                    alert("undefined")
                } else {
                    alert("중복된 email 입니다")
                }
            }).catch((error) => {
                console.log("Error", error)
            });

        // 중복 확인이 완료되었으므로 상태 초기화
        setCheckedButtonClicked(false);
    }, [checkedButtonClicked, email]);

    const onSubmithandle = (e) => {
        e.preventDefault();

        // console.log(emailRef.current.value)
        setJoin({
            id: emailRef.current.value,
            password: passRef.current.value,
            confirm: confrimRef.current.value,
            username: nameRef.current.value,
            birthDate: birthRef.current.value
        })
    }

    useEffect(() => {
        if (join.email === "") return;
        if (join.password !== join.confirm) {
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다')
        }

        if (join.email === "" || join.password ==="" || join.confrim ==="" || join.username ==="" || join.birthDate ===""){
            alert("정보를 입력해주세요")
            return;
        }
        else {
            const request = axios.post("http://10.125.121.204:8080/join", join)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            // console.log("정보", join)
            alert("회원가입을 축하드립니다")
            navigate("/Login")
        }

    }, [join]);

    return (
        <main className='mt-72 mb-20 flex-col'>
            <div className='w-1/3 border-2 mx-auto rounded-lg border-slate-300'>
                <form className='flex flex-col p-4'>
                    <div className='flex justify-between items-center'>
                        <label className="py-1 text-slate-600 font-['Jua']">이메일</label>
                        <button type='button' className='flex items-end justify-center w-2/5 mb-2 py-2 rounded-lg bg-emerald-500 text-white hover:bg-white hover:text-emerald-500'
                            onClick={Checked}>
                            중복 확인
                        </button>
                    </div>
                    <input type="email"
                        ref={emailRef}
                        className="outline-none p-2 border-2 rounded-md border-slate-200" placeholder="이메일을 입력해 주세요" required />
                    <label className="py-1 text-slate-600 font-['Jua']">비밀번호</label>
                    <input type="password"
                        ref={passRef}
                        className="outline-none p-2 border-2 rounded-md border-slate-200" placeholder="비밀번호를 입력해 주세요" required />
                    <label className="py-1 text-slate-600 font-['Jua']">비밀번호 확인</label>
                    <input type="password"
                        ref={confrimRef}
                        className="outline-none p-2 border-2 rounded-md border-slate-200" placeholder="비밀번호를 한번 더 입력해 주세요" required />

                    <label className="mt-5 py-1 text-slate-600 font-['Jua']">이름</label>
                    <input type="text"
                        ref={nameRef}
                        className="outline-none p-2 border-2 rounded-md border-slate-200" placeholder="이름을 입력해 주세요" required />
                    <label className="py-1 text-slate-600 font-['Jua']">생년월일</label>
                    <input type="number"
                        ref={birthRef}
                        onInput={(e) => {
                            if (e.target.value.length > e.target.maxLength)
                                e.target.value = e.target.value.slice(0, e.target.maxLength);
                        }}
                        className='outline-none p-2 border-2 rounded-md border-slate-200' maxLength={6} placeholder='생년월일 6자리를 입력해 주세요' required />

                    <div className='flex justify-around mt-8'>
                        <Link to="/" className='flex justify-center w-2/5 py-2 border-rose-500 border-2 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white'>
                            <button type='button'>
                                취소
                            </button>
                        </Link>
                        <button type='button' className='flex justify-center w-2/5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-white hover:text-emerald-500'
                            onClick={onSubmithandle}>
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
