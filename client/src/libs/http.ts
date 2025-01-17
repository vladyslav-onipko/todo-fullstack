/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { HttpErrorMessage } from '../utils/constants';
import { type ITodoList, type ICreateTodoListData, type IGetTodoListsData } from '../models/todo';

export const createTodoList = async ({ name, userId, token }: ICreateTodoListData): Promise<ITodoList | undefined> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/todo/todolists`,
      { name, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message || HttpErrorMessage.Default);
    }

    if (e.request) {
      throw new Error(HttpErrorMessage.Default);
    }
  }
};

export const getTodoLists = async ({ userId, token, signal }: IGetTodoListsData): Promise<ITodoList[] | undefined> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/todo/todolists/${userId}`, {
      signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.todoLists;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message || HttpErrorMessage.Default);
    }

    if (e.request) {
      throw new Error(HttpErrorMessage.Default);
    }
  }
};
