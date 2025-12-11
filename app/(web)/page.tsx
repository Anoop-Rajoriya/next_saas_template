import { Container, Logo } from "@/components";
import Link from "next/link";

function page() {
  return (
    <Container showBg={true} className="space-y-16">
      <nav className="flex items-center justify-between">
        <Logo>Todo</Logo>
        <Link
          href="/sign-in"
          className="hover:text-bright-blue transition-color"
        >
          Sign In
        </Link>
      </nav>
      <div className="space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center px-6 md:px-8 leading-12">
          <span className="text-transparent bg-clip-text bg-check-gradient">
            Next.js Todo
          </span>{" "}
          Full-Stack Experience
        </h1>
        <h2 className="text-center text-lg font-semibold text-text-muted px-4">
          A full-stack task manager engineered with Next.js. Featuring secure
          Authentication, Role-Based Access, and Pro Subscriptions.
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/user"
            className="w-full text-center sm:w-auto px-8 py-4 bg-check-gradient text-white font-bold hover:opacity-90 transition-opacity rounded-md"
          >
            Get Free Demo
          </Link>
          <Link
            href=""
            className="w-full text-center sm:w-auto px-8 py-4 bg-card-bg font-bold border-2 border-border-main rounded-md"
          >
            View Source Code
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default page;

// "use client";

// import React, { useState } from "react";
// import {
//   Container,
//   Logo,
//   Todo,
//   TodoForm,
//   TodoItem,
//   ToggleTheme,
// } from "@/components";

// const dummy: Todo[] = [
//   { id: "102", title: "hello world 2", completed: true },
//   { id: "101", title: "hello world", completed: false },
// ];

// type Tab = "all" | "active" | "completed";

// function Home() {
//   const [todos, setTodos] = useState<Todo[]>(dummy);
//   const [activeTab, setActiveTab] = useState<Tab>("all");

//   const handleSubmit = function (todo: Todo) {
//     const id = todos[0] ? Number(todos[0].id) + 1 : 100;
//     setTodos((pre) => [{ ...todo, id: String(id) }, ...pre]);
//   };

//   const handleDelete = function (id: string) {
//     const remainingTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(remainingTodos);
//   };
//   const handleComplete = function (id: string, completed: boolean) {
//     const updatedTodos = todos.map((todo) =>
//       todo.id === id ? { ...todo, completed } : todo
//     );
//     setTodos(updatedTodos);
//   };
//   const handleClear = function () {
//     const activeTodos = todos.filter((todo) => !todo.completed);
//     setTodos(activeTodos);
//   };
//   const handleTab = function (event: React.MouseEvent) {
//     const name = event.currentTarget.getAttribute("name") as Tab;
//     if (name !== activeTab) setActiveTab(name);
//   };
//   const getTodos = function (): Todo[] {
//     if (activeTab === "active") {
//       return todos.filter((todo) => !todo.completed);
//     }

//     if (activeTab === "completed") {
//       return todos.filter((todo) => todo.completed);
//     }
//     return todos;
//   };
//   const getTodosCounts = function () {
//     const remainTodos = todos.filter((todo) => !todo.completed).length;

//     return remainTodos
//       ? remainTodos === 1
//         ? `${remainTodos} item left`
//         : `${remainTodos} items left`
//       : "no items left";
//   };
//   return (
//     <Container>
//       <div className="space-y-10 w-full max-w-xl mx-auto">
//         <header className="flex justify-between items-center">
//           <Logo>Todo</Logo>
//           <ToggleTheme />
//         </header>
//         <div className="space-y-5">
//           <TodoForm onSubmit={handleSubmit} />
//           <div className="space-y-4">
//             <div className="bg-card-bg">
//               <ul>
//                 {getTodos().map((todo) => (
//                   <TodoItem
//                     key={todo.id}
//                     className="border-b-2 border-border-main"
//                     todo={todo}
//                     onComplete={handleComplete}
//                     onDelete={handleDelete}
//                   />
//                 )) || <p>no items found</p>}
//               </ul>
//               <div className="px-6 py-3 flex items-center justify-between text-sm font-semibold text-text-muted">
//                 <div>{getTodosCounts()}</div>
//                 <div className="gap-3 hidden md:flex">
//                   {["all", "active", "completed"].map((tab) => (
//                     <button
//                       key={tab}
//                       name={tab}
//                       onClick={handleTab}
//                       className={`capitalize active:text-text-main transition-colors ${
//                         activeTab === tab
//                           ? "text-bright-blue"
//                           : "hover:text-bright-blue"
//                       }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>
//                 <button
//                   onClick={handleClear}
//                   className="capitalize hover:text-bright-blue active:text-text-main transition-colors"
//                 >
//                   clear completed
//                 </button>
//               </div>
//             </div>
//             <div className="flex md:hidden items-center justify-center gap-4 bg-card-bg px-6 py-3 text-text-muted">
//               {["all", "active", "completed"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={handleTab}
//                   name={tab}
//                   className={`capitalize active:text-text-main transition-colors ${
//                     activeTab === tab
//                       ? "text-bright-blue"
//                       : "hover:text-bright-blue"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default Home;
