import { IBackendRes, ICompany, IUser } from '@/types/backend';
import axios from 'config/axios-customize';

/**
 * 
Module Auth
 */
export const callRegister = (name: string, email: string, password: string, age: number, gender: string, address: string) => {
    return axios.post('/api/v1/auth/register', { name, email, password, age, gender, address })
}

export const callLogin = (username: string, password: string) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}





/**
 * 
Module Company
 */
export const callCreateCompany = (name: string, address: string, description: string) => {
    return axios.post<IBackendRes<ICompany>>('/api/v1/companies', { name, address, description })
}

export const callUpdateCompany = (id: string, name: string, address: string, description: string) => {
    return axios.patch<IBackendRes<ICompany>>(`/api/v1/companies/${id}`, { name, address, description })
}

export const callDeleteCompany = (id: string) => {
    return axios.patch<IBackendRes<ICompany>>(`/api/v1/companies/${id}`);
}

export const callFetchCompany = (query: string) => {
    return axios.patch<IBackendRes<ICompany>>(`/api/v1/companies?${query}`);
}