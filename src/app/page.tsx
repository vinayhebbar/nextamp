import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import * as mutations from '@/graphql/mutations';
// 1. Add the queries as an import
import * as queries from '@/graphql/queries';

import config from '@/amplifyconfiguration.json';

const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies
});

async function createTodo(formData: FormData) {
  'use server';
  const data = await cookiesClient.graphql({
    query: mutations.createTodo,
    variables: {
      input: {
        name: formData.get('name')?.toString() ?? ''
      }
    }
  });


  console.log('Created Todo: ', JSON.stringify(data));

  revalidatePath('/');
}

export default async function Home() {
  // 2. Fetch additional todos
  const data = await cookiesClient.graphql({
    query: queries.listTodos
  });

  // if(data && data.listTodos && data.listTodos.item) {
    // const todos = data.listTodos.items;
  // }

  console.log('get data todo list', JSON.stringify(data));

  const todos: any[] =  [];



  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '100px'
      }}
    >
      <form action={createTodo}>
        <input name="name" placeholder="Add a todo" />
        <button type="submit">Add</button>
      </form>

      {/* 3. Handle edge cases & zero state & error states*/}
      {todos.length === 0 && (
        <div>
          <p>No todos, please add one.</p>
        </div>
      )}

      {/* 4. Display todos*/}
      {/* <ul>
        {todos.length > 0 && todos.map((todo) => {
          return <li style={{ listStyle: 'none' }}>{todo.name}</li>;
        })}
      </ul> */}
    </div>
  );
}