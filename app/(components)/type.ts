export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type FilterType = "all" | "active" | "completed";

export type SignupFields = {
  firstName: string;
  lastName?: string;
  emailAddress: string;
  password: string;
};
export type SigninFields = {
  emailAddress: string;
  password: string;
};
