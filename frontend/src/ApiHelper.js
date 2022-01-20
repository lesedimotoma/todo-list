import fetch from 'node-fetch';
// const fetch = require("node:node-fetch")

const API_URL = "http://localhost:3000/todos/"

const createTodo = async (task) => {
    const params = {
        task: task,
        completed: false
    }
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    })
    return await response.json()
}

const  deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}${id}`, {
        method: 'DELETE'
    })
    return response.text()
}

const updateTodo = async (id, payload) => {
    const response = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })

    return response.json()
}


const getAllTodos = async () => {
    const response = await fetch(API_URL)
    return response.json()
}

const apiHelper = {
    createTodo,
    deleteTodo,
    updateTodo,
    getAllTodos
}
export default apiHelper
//export default {createTodo, deleteTodo, updateTodo, getAllTodos}