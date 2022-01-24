import { NextPage } from "next";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";
import { getTodosAPI } from "../lib/api/todo";
import { GetServerSideProps } from 'next'

interface IProps {
  todos: TodoType[];
}

const app: NextPage<IProps> = ({ todos }) => {
  return <TodoList todos={todos} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await getTodosAPI();
    console.log(data);
    return { props: { todos: data } };
  } catch(e) {
    console.log(e)
    return { props: { todos: [] } };
  }
};

export default app;