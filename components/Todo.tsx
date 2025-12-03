import Image from "next/image";
import React, { useState } from "react";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoFormProps = {
  val?: Todo;
  onSubmit: (val: Todo) => void;
};

type CheckboxProps = {
  checked: boolean;
  onChange: (completed: boolean) => void;
};

type TodoItemProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onComplete: (id: string, completed: boolean) => void;
  className?: string;
};

function TodoForm({ val, onSubmit }: TodoFormProps) {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    completed: false,
  });

  const handleSubmit = function (e: React.FormEvent) {
    e.preventDefault();
    if (!todo.title || !todo.title.trim()) return;
    onSubmit(todo);
    setTodo({
      id: "",
      title: "",
      completed: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-6 px-6 bg-card-bg"
    >
      <Checkbox
        checked={todo.completed}
        onChange={(completed) => {
          setTodo((pre) => ({ ...pre, completed }));
        }}
      />
      <input
        value={todo.title}
        placeholder="Create a new todo..."
        onChange={(e) => {
          setTodo((pre) => ({ ...pre, title: e.target.value }));
        }}
        type="text"
        className="border-none outline-none flex-1 py-4 font-semibold"
      />
    </form>
  );
}

function TodoItem({ todo, onComplete, onDelete, className }: TodoItemProps) {
  return (
    <li
      data-id={todo.id}
      className={`flex items-center justify-center gap-6 px-6 group ${className}`}
    >
      <Checkbox
        checked={todo.completed}
        onChange={(completed) => {
          onComplete(todo.id, completed);
        }}
      />
      <p
        className={`flex-1 py-4 font-semibold ${
          todo.completed ? "line-through text-text-muted" : ""
        }`}
      >
        {todo.title}
      </p>
      <button
        onClick={() => onDelete(todo.id)}
        className="block md:hidden group-hover:block"
      >
        <Image
          className="cursor-pointer"
          src={"/icons/icon-cross.svg"}
          alt="delete icon"
          width={18}
          height={18}
        />
      </button>
    </li>
  );
}

function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <label className="inline-flex size-5 md:size-6 rounded-full has-checked:bg-check-gradient border border-border-main relative items-center justify-center">
      <input
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
        className="absolute opacity-0 peer"
      />
      <Image
        className="peer-checked:inline-block hidden size-auto"
        src={"/icons/icon-check.svg"}
        alt="check icon"
        width={16}
        height={16}
      />
    </label>
  );
}

export { TodoForm, TodoItem };
