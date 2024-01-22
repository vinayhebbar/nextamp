import * as React from "react";
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '@/amplifyconfiguration.json';
import * as queries from '@/graphql/queries';

Amplify.configure(config);

const client = generateClient();

export default async function Home() {
// Simple query


const res: any = await client.graphql({ query: queries.listTodos }) || [];
const allTodos: any = res.data.listTodos;
console.log(allTodos);
// console.log(JSON.stringify(allTodos));
 // result: { "data": { "listTodos": { "items": [/* ..... */] } } }

  return (
    <div>
      xdfgdxfg
      {allTodos?.items?.length > 0 && allTodos?.items?.map((item: any) => (
        <div key={item.id}>{item.name}</div>
      ))}

    </div>
  );

//export default index;

}
// Fetch a single record by its identifier
//const oneTodo = await client.graphql({
  //uery: queries.getTodo,
 // variables: { id: 'some id' }
//});