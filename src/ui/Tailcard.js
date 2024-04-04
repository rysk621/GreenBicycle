import logo from '../assets/images/logo.png'
import { MdTimer } from "react-icons/md";
import { IoBicycleSharp } from "react-icons/io5";
import { useParams } from 'react-router-dom';
export default function Tailcard({ name, title, course, tlength, time, lev, seq }) {

  const level = useParams().item;
  const levlist = {'1':'매우쉬움','2':'쉬움','3':'보통','4':'어려움','5':'매우어려움'}

  let hour = parseInt(time/60);
  let minute = time%60;

  return (
    <div className="border-2 border-slate-100  mt-10 shadow-md p-2">
      <div className="p-2 w-auto">
        <img src={logo} />
      </div>
      <div className="m-3 text-slate-600 font-semibold">
        {title}
      </div>
      <div className="text-4xl text-slate-800 font-medium m-3 font-bhs">
        {name}
      </div>
      <div className="m-3 text-slate-600 font-bold">
        {course}
      </div>
      <div className='flex justify-evenly p-2'>
        <div className='text-slate-600 font-extrabold flex items-center'><IoBicycleSharp />{tlength}km</div>
        <div className='text-slate-600 font-extrabold flex items-center'><MdTimer />{hour}시간{minute}분</div>
        <div className='text-slate-600 font-extrabold'>{levlist[lev]}</div>
      </div>
    </div>

  )
}
