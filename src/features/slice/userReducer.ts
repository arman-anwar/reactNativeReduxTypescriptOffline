import { createSlice } from '@reduxjs/toolkit'
// import { Value } from 'react-native-reanimated';
import { User } from '../../types';

const initialState = {
    userList: [] as User[],
    isLoading: false
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.isLoading = false
        },
        createUserSucess: (state, action) => {
            state.userList.push(action.payload)
            state.isLoading = true
        },
        getUsersFetch: (state) => {
            state.isLoading = true
        },
        getUsersSuccess: (state, action) => {
            state.userList = action.payload
            state.isLoading = false
        },
        updateUser: (state, action) => {
            state.isLoading = true
        },
        updateUserSuccess: (state, action) => {
            let test = action.payload
            let users = [...state.userList]
            let objIndex = users.findIndex((obj => obj.id == test.id));
            users[objIndex].name = test.name
            users[objIndex].email = test.email
            Object.assign(state.userList, users);
            state.isLoading = false
        },
        delUser: (state) => {
            state.isLoading = true
        },
        delUserSuccess: (state, action) => {
            let filtered = state.userList.filter(ele => { return ele.id !== action.payload });
            Object.assign(state.userList, filtered);
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchUsersSaga.pending, (state , action) => {
        //     console.log('fetchUsersSaga.pending >> ', state , action)

        // } )
    }
});

export const { createUser, createUserSucess, delUser, updateUser, getUsersSuccess, getUsersFetch, delUserSuccess, updateUserSuccess } = userSlice.actions

export default userSlice.reducer