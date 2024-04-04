import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userToken } from './TokenAtom';

export default function Detail() {

    const navigate = useNavigate();
    const { seq } = useParams();
    const [detial, setDetail] = useState([]);

    const token = useRecoilValue(userToken);

    const Update = () => {
        navigate("/member/board", {
            state: {
                seq: seq
            }
        });
    };

    const getDetail = async () => {
        const resp = await axios.get(`http://10.125.121.204:8080/board/${seq}`);
        setDetail(resp.data.body);
        // console.log("detail: ", resp.data.body)
    };

    const Delete = async () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            await axios.delete(
                `http://10.125.121.204:8080/member/board/${seq}`,
                {
                    headers: {
                        Authorization: token
                    }
                })
                .then((res) => {
                    // console.log(res.data.body)
                    if (
                        res.data.statusCodeValue == 200
                    ) {
                        alert("삭제되었습니다");
                        navigate("/Community")
                    }
                    else {
                        alert(res.data.body)
                    }
                })
        }
    }

    useEffect(() => {
        getDetail();
    }, []);

    return (
        <main className='mt-72'>
            <div className="flex justify-around p-2 border-b-2 border-slate-200">
                <h1 className="text-5xl font-bold text-slate-800 font-['Jua']">
                    {detial.title}
                </h1>
                <div>
                    <h1 className="text-xl font-bold text-slate-800 font-['Jua']">
                        조회수 : {detial.cnt}
                    </h1>
                    <h1 className="text-xl font-bold text-slate-800 font-['Jua']">
                        글쓴이 : {detial.writer}
                    </h1>
                </div>
            </div>
            <div className='flex justify-center h-96 rounded-md mt-2 border-2 border-slate-200'>
                <h1 className='font-bhs text-slate-600 text-2xl w-4/5'>
                    {detial.content}
                </h1>
            </div>
            <div className='flex justify-around'>
                <div className="w-1/2 mt-2">
                    <button className="border-2 border-slate-200 py-1 px-3 rounded-md text-slate-800 font-['Jua']">
                    <Link to="/Community">목록</Link>
                    </button>
                </div>
                <div className='flex justify-end w-1/2 mt-2'>
                    <button onClick={Update}
                        className="border-2 border-slate-200 py-1 px-3 me-3 rounded-md text-slate-800 font-['Jua']">수정</button>
                    <button onClick={Delete}
                        className="border-2 border-slate-200 py-1 px-3 rounded-md text-slate-800 font-['Jua']">삭제</button>
                </div>
            </div>
        </main>
    )
}
