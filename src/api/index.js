import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://222.252.4.92:27016/data/',
  ...headers(),
})

function headers() {
  const currentUser = localStorage.getItem('token')
  const authHeader = currentUser
    ? { Authorization: 'Bearer ' + currentUser }
    : {}
  return {
    headers: {
      ...authHeader,
      'Content-Type': 'application/json',
    },
  }
}
export default axiosInstance

export async function getData(per_page, page, from_date, to_date, device_id) {
    const res = await axiosInstance.get(`?per_page=${per_page}&page=${page}&from_date=${from_date}&to_date=${to_date}&device_id=${device_id}`)
    return res.data
}