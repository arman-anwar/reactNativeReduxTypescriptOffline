import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types';

const initialState = {
    userList: [] as User[],
    // isLoading: false
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action) => {
            let user: User = action.payload
            state.userList.push(user)
        },
        getUsersSuccess: (state, action) => {
            state.userList = action.payload
        },
        updateUser: (state, action) => {
            let test = action.payload
            let users = [...state.userList]
            let objIndex = users.findIndex((obj => obj.id == test.id));
            users[objIndex].name = test.name
            users[objIndex].email = test.email
            Object.assign(state.userList, users);
        },
        delUser: (state, action) => {
            let filtered = state.userList.filter(ele => { return ele.id !== action.payload });
            Object.assign(state.userList, filtered);
        }
    }
});

export const { createUser, delUser, updateUser, getUsersSuccess } = userSlice.actions

export default userSlice.reducer