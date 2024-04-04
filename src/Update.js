import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userToken } from './TokenAtom';

export default function Update() {

  const navigate = useNavigate();

  const titleRef = useRef();
  const contentRef = useRef();

  const token = useRecoilValue(userToken);

  const [board, setBoard] = useState({
    title: '',
    content: ''
  });

  const { title, content } = board;

  const location = useLocation();

  const seq = location.state.seq;

  const getBoard = async () => {
    const resp = await axios.get(`http://10.125.121.204:8080/board/${seq}`);
    setBoard(resp.data.body);
  };

  const Update = async (e) => {
    e.preventDefault();
    // console.log("seq", seq,token,board.title)
    await axios.put(`http://10.125.121.204:8080/member/board`,
    {
      seq: seq,
      title: titleRef.current.value,
      content: contentRef.current.value
    },
      {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        alert("수정되었습니다");
        
        navigate("/Community");
      });
  };

  const BackDetail = () => {
    navigate("/Community");
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <main className='mt-72'>
      <form className="m-4 h-96 flex flex-col  justify-around">
        <label className="py-1 text-slate-600 font-['Jua']">제목</label>
        <input type="text"
          ref={titleRef} defaultValue={title}
          className="w-full h-1/6 outline-none p-2 border-2 border-slate-200" placeholder="제목을 입력해 주세요" required />
        <label className="py-1 text-slate-600 font-['Jua']">내용</label>
        <input type="text"
          ref={contentRef} defaultValue={content}
          className="w-full h-3/5 outline-none p-2 border-2 border-slate-200" placeholder="내용을 입력해 주세요" required />
        <div className='flex justify-end mt-2'>
          <button onClick={Update}
            className="border-2 border-slate-200 py-1 px-3 me-3 rounded-md text-slate-800 font-['Jua']">수정</button>
          <button onClick={BackDetail}
            className="border-2 border-slate-200 py-1 px-3 rounded-md text-slate-800 font-['Jua']">취소</button>
        </div>
      </form>
      {/* <div className="flex justify-around p-2 border-b-2 border-slate-200">
        <h1 className="text-5xl font-bold text-slate-800 font-['Jua']">
          {board.title}
        </h1>
      </div>
      <div className='flex justify-center h-96 rounded-md mt-2 border-2 border-slate-200'>
        <h1 className='font-bhs text-slate-600 text-2xl w-4/5 flex justify-center '>
          {board.content}
        </h1>
      </div>
      <div className='flex justify-end mt-2'>
        <button onClick={Update}
          className="border-2 border-slate-200 py-1 px-3 me-3 rounded-md text-slate-800 font-['Jua']">수정</button>
        <button onClick={BackDetail}
          className="border-2 border-slate-200 py-1 px-3 rounded-md text-slate-800 font-['Jua']">취소</button>
      </div> */}
    </main>
  )
}
