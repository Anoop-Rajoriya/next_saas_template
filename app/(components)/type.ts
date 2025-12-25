export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type FilterType = "all" | "active" | "completed";

export type FieldConfig<T> = {
  name: keyof T;
  label?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};
