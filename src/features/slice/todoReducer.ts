import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types';

const initialState = {
    todoLists: [] as User[]
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        saveTodo: (state, action) => {
            let test: User = action.payload
            state.todoLists.push(test)
        },
        setTodos: (state, action) => {
            state.todoLists = [...action.payload]
        },
        updateTodo: (state, action) => {
            let test = action.payload
            let objIndex = state.todoLists.findIndex((obj => obj.id == test.id));
            state.todoLists[objIndex].name = test.name
            state.todoLists[objIndex].email = test.email

            // return { state, todoList: [...state.todoLists] }
        },
        delTodo: (state, action) => {
            let filtered = state.todoLists.filter(ele => { return ele.id !== action.payload });
            return { state, todoLists: [...filtered] }
        }
    }
});

export const { saveTodo, delTodo, updateTodo, setTodos } = todoSlice.actions

// export const selectTodoList = state => state.todo.todoList

export default todoSlice.reducer