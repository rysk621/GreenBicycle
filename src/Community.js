import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userToken } from './TokenAtom'

export default function Community() {

    const navigate = useNavigate();

    const islogin = useRecoilValue(userToken);

    const [board, setBoard] = useState([]);

    const getBoard = async () => {
        try {
            const resp = await axios.get("http://10.125.121.204:8080/board");

            setBoard(resp.data.body);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBoard();
        // console.log("useEffect 실행")
    }, []);


    useEffect(() => {
        // console.log("board", board); // setting 후에 board console에 출력 (위에 있는 useEffect 안의 getBoard() 끝난 이후에 console 출력 해야한다고 함. getBoard() 안에서 board 정보 찍으면 안됨)
    }, [board]);

    return (
        <main className='pt-72'>
            <h1 className="p-2 text-5xl font-bold text-slate-800 border-b-2 border-slate-200 font-['Jua']">자전거길 후기</h1>
            <div className='w-full'>
                <div className='flex justify-end'>
                    <button type='button' onClick={islogin ? () => navigate("/Write") : () => { navigate("/Login"); alert("로그인을 먼저 해주세요") }}
                        className='mt-2 p-2 px-4 rounded-lg bg-emerald-500 text-white hover:bg-white hover:text-emerald-500'>
                        글 쓰기
                    </button>
                </div>
                <div className='flex p-2'>
                    <div className='w-3/5 mx-auto ps-2'>제목</div>
                    <div className='flex justify-center w-1/5'>글쓴이</div>
                    <div className='flex justify-center w-1/5'>조회수</div>
                </div>
                <ul className='border-2 border-slate-200 rounded-md mb-36'>
                    {board.map((board, idx) => (
                        <Link to={`/board/${board.seq}`} className='flex border-b-2 border-slate-200 py-2 hover:bg-emerald-300 hover:text-white' key={idx}>
                            <div className='w-3/5 mx-auto ps-3' >{board.title}</div>
                            <div className='w-1/5 flex justify-center'>{board.writer}</div>
                            <div className='w-1/5 flex justify-center'>{board.cnt}</div>
                        </Link>
                    ))}
                </ul>
            </div>
        </main>
    )
}
