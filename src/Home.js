import React from 'react'
import banner from '../src/assets/images/banner.png'

export default function Home() {
    return (
        <main className='mt-72 mb-20'>
            <h1 className="p-2 text-5xl font-bold text-slate-800 border-b-2 border-slate-200 font-['Jua']">자전거길 소개</h1>
            <img src={banner} />
            <div className='flex flex-col justify-center'>
                <div className='mt-8'>
                    <h1 className='m-3 mb-5 text-4xl font-medium text-slate-800 font-bhs'>국토종주 자전거길은</h1>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>2009년 초 녹색뉴딜정책의 일환으로 자전거 인프라 조성, 자전거 이용문화 확산 등을 목적으로 시작되었습니다.</p>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>2012년 4월에 완전 개통된 총연장 1,757km에 이르는 자전거길입니다.</p>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>2011년 10월 남한강 자전거길, 11월 새재 자전거길 개통에 이어 2012년 4월 22일 낙동강 자전거길이 개통되었습니다.</p>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>이로써 인천에서 부산 을숙도까지 이어지는 633km의 국토종주자전거길이 완성되었습니다.</p>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>국토종주 자전거길 개통과 함께 금강 자전거길과 영산강 자전거길도 함께 개통되어 총연장 1,757km의 4대강 국토종주 자전거길이 완성되었습니다.</p>
                    <h1 className='m-3 mt-5 mb-5 text-4xl font-medium text-slate-800 font-bhs'>국토종주 자전거길은 새로운길이 아닌</h1>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>2010년 12월 역사 속으로 사라진 경춘선 기찻길이 '북한강 자전거길'로 되살아났습니다.</p>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>버려진 기찻길이 자전거길로 태어나면서 경춘선이 지켜온 오랜 역사가 담겨 있습니다.</p>
                    <p className='mt-1 ml-3 font-semibold text-slate-800'>춘천행 기차에서만 바라보던 청평유원지,자라섬,강촌유원지의 정취를 느껴 보시기 바랍니다.</p>
                </div>
            </div>
        </main>
    )
}
