import { atom } from 'recoil'

export const userToken = atom({
    key: 'res.headers.get("authorization")',
    default: localStorage.getItem('token')
})