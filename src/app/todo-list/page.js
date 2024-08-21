export default async function Todos() {
  /**
   * This is a server component
   */
  const res = await fetch(process.env.URL + "/todos", { method: "GET" });
  const todos = await res.json();

  console.log("todos", todos);

  return <div className="min-h-screen">Todos</div>;
}
