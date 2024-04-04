import React from 'react'
import Tailcard from './ui/Tailcard'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Bycle() {
    // fetch 데이터 저장
    const [tdata, setTdata] = useState([]);
  
    // 화면에 재 랜더링
    const [tags, setTags] = useState([]);
  
    useEffect(() => {
      fetch("http://10.125.121.204:8080/roadinfo")
        .then(resp => resp.json())
        .then(data => setTdata(data))
    }, []);
  
    // tdata 변경
    useEffect(() => {
      // console.log("tdata=", tdata);
      let tm = tdata.map((item) => (
        <Link to={`/roadinfo/${item.seq}`} key={item.seq}>
          <Tailcard
            name={item.roadname}
            title={item.subtitle}
            course={item.courseinfo}
            tlength={item.tlength}
            time={item.ete}
            lev={item.lev}
          />
        </Link>
      ));
      // console.log("tags", tm)
      setTags(tm);
      // console.log(tm)
    }, [tdata])
  
    return (
      <main className='mt-72 mb-20'>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {tags}
        </div>
      </main>
    )
  }