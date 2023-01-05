import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Value } from 'react-native-reanimated';
import { User } from '../../types';
import { offlineActionTypes } from 'react-native-offline';
import TYPES from '../types';
import { generateId, getOfflineMeta } from '../../services/utils';

const initialState = {
    userList: [] as User[],
    isLoading: false,
    error: false,

}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUserRequest: {
            reducer: (state, action) => {
                state.isLoading = false
            },
            prepare: ({ name, email }) => {
                return {
                    payload: {
                        name, email,
                        id: generateId(),
                    },
                    meta: getOfflineMeta({ navigationMethod: 'goBack' }),
                };
            }
        },
        createUserSucess: (state, action: PayloadAction<{ user: User, offlineId: number, queued: boolean }>) => {
            state.isLoading = false
            state.error = false
            const { user, offlineId, queued } = action.payload;
            if (offlineId && queued) {
                state.userList = state.userList.map((post) =>
                    post.id === offlineId ? user : post,
                );
            } else {
                state.userList.push(action.payload.user);
            }
        },
        createUserFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        getUsersRequest: {
            reducer: (state, action) => {
                state.isLoading = true;
            },
            prepare: () => {
                return {
                    meta: getOfflineMeta({ retry: false }),
                }
            }
        },
        getUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.userList = action.payload
            state.isLoading = false
        },
        updateUserRequest: {
            reducer: (state, action) => {
                state.isLoading = true;
            },
            prepare: ({ name, email, id }) => {
                return {
                    payload: {
                        name,
                        email,
                        id
                    },
                    meta: getOfflineMeta({ navigationMethod: 'goBack' }),
                };
            }
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
        updateUserFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        delUserRequest: (state) => {
            state.isLoading = true
        },
        delUserSuccess: (state, action) => {
            let filtered = state.userList.filter(ele => { return ele.id !== action.payload });
            Object.assign(state.userList, filtered);
            state.isLoading = false
        },
        delUserFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(offlineActionTypes.FETCH_OFFLINE_MODE, (state, action) => {
            const { prevAction } = action.payload;
            console.log('Offline mode', action)
            const reducer = {
                'users/createUserRequest': () => {
                    state.error = false;
                    state.isLoading = false;
                    state.userList.push(prevAction.payload);
                },
                'users/updateUserRequest': () => {
                    state.error = false;
                    state.isLoading = false;
                    state.userList = state.userList.map((post) =>
                        post?.id === prevAction.payload?.id ? prevAction.payload : post,
                    );
                },
            };
            reducer[prevAction.type]();
        })
    }
});

export const { createUserRequest, createUserSucess, createUserFailure, delUserRequest, delUserFailure, updateUserFailure, updateUserRequest, getUsersSuccess, getUsersRequest, delUserSuccess, updateUserSuccess } = userSlice.actions

export default userSlice.reducer