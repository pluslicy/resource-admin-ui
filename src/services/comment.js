import request from '@/utils/request'

export async function findAllComment(){
    return request('/api/mp_man_comments/commentlist/')
    
}