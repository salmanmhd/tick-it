import axios from 'axios';
const URL = import.meta.env.VITE_API_URL;

export async function addTodo(todo) {
  console.log('inside addTodo');
  console.log('Request Payload:', todo);
  try {
    const response = await axios.post(URL, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response adding todo: ', response);
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getTodo() {
  const reponse = await axios.get(URL);
  const data = await reponse.data;
  return data;
}

export async function deleteTodo(id) {
  const deleteResponse = await axios.delete(`${URL}${id}`);
  console.log(deleteResponse);
  return deleteResponse;
}

export async function completeTodo(id) {
  const editResponse = await axios.patch(`${URL}${id}`);
  console.log(editResponse);
  return editResponse;
}
