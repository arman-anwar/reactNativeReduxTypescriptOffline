import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types';

const initialState = {
    userList: [] as User[]
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            let user: User = action.payload
            // state.userList.push(test)

            return { state, userList: [...state.userList, user] }
        },
        setUsers: (state, action) => {
            let users = [...action.payload]
            return { state, userList: [...users] }
        },
        updateUser: (state, action) => {
            let test = action.payload
            let users = [...state.userList]
            let objIndex = users.findIndex((obj => obj.id == test.id));
            users[objIndex].name = test.name
            users[objIndex].email = test.email
            Object.assign(state.userList,users);

            // return { state, userList: [...users] }
        },
        delUser: (state, action) => {
            let filtered = state.userList.filter(ele => { return ele.id !== action.payload });
            return { state, userList: [...filtered] }
        }
    }
});

export const { saveUser, delUser, updateUser, setUsers } = userSlice.actions

export default userSlice.reducer