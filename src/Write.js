import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRecoilValue } from 'recoil';
import { userToken } from './TokenAtom';
import { preventDefault } from 'ol/events/Event';

export default function Write() {

    const titleRef = useRef();
    const contentRef = useRef();

    const navigate = useNavigate();

    const token = useRecoilValue(userToken);

    const onWriterhandle = (e) => {
        e.preventDefault();

        if (titleRef.current.value === "") {
            alert("제목을 입력하세요")
            return;
        }
        if (contentRef.current.value === "") {
            alert("내용을 입력하세요")
            return;
        }
        axios(
            {
                url: "http://10.125.121.204:8080/member/board",
                method: 'post',
                data: {
                    title: titleRef.current.value,
                    content: contentRef.current.value
                },
                headers: {
                    Authorization: token
                }
            }
        ).then(function (response) {
            alert("등록되었습니다")
            navigate("/Community")
            // console.log(response.data)
        });
    }

    return (
        <main className='mt-72 mb-20 mx-auto border-2 rounded-md border-slate-200 shadow-md w-4/5'>
            <div className='w-full'>
                <form className="m-4 h-96 flex flex-col  justify-around">
                    <label className="py-1 text-slate-600 font-['Jua']">제목</label>
                    <input type="text"
                        ref={titleRef}
                        className="w-full h-1/6 outline-none p-2 border-2 border-slate-200" placeholder="제목을 입력해 주세요" required />
                    <label className="py-1 text-slate-600 font-['Jua']">내용</label>
                    <input type="text"
                        ref={contentRef}
                        className="w-full h-3/5 outline-none p-2 border-2 border-slate-200" placeholder="내용을 입력해 주세요" required />
                    <div className='w-full mt-2 flex justify-end'>
                        <Link to="/Community" className='flex justify-center w-1/6 py-2 mx-2 rounded-lg border-rose-500 border-2 text-rose-500 hover:bg-rose-500 hover:text-white'>
                            <button type='button'>
                                취소
                            </button>
                        </Link>
                        <button type='button'
                            onClick={onWriterhandle}
                            className='w-1/6 py-2 rounded-lg bg-emerald-500 text-white hover:bg-white hover:text-emerald-500'>
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
