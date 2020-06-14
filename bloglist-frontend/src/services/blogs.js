import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => 
    response.data
  )
  }

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
}

const update = (id, newObj) => {
  const config = {
    headers: { Authorization: token},
  }

  const req =  axios.put(`${baseUrl}/${id}`, newObj, config);
  return req.then(res => res.data);
}

const remove =  async (id) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response;

}

export default { getAll, setToken, create, update, remove}