import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 0px 10px;
  max-width: 550px;
  margin: 0 auto;
  margin-top: 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;

const Select = styled.select`
  margin-top: 20px;
  width: 100%;
  height: 45px;
  background: white;
  color: gray;
  font-size: 1.1em;
  font-weight: 600;
  border-radius: 5px;
  padding-left: 42%;
  border: 5px solid #778899;
  &:active {
    background-color: white;
    border: 5px solid #2f4f4f;
  }
  option {
    color: black;
    background: white;
    font-weight: small;
    font-size: 1.1em;
  }
`;

const EditorContainer = styled.div`
  padding: 0px 10px;
  position: fixed;
  max-width: 550px;
  bottom: 10px;
  margin: 0 auto;
  left: 0;
  right: 0;
  margin-bottom: 20px;
`;

const ToDoContainer = styled.div`
  padding: 0px 20px;
  max-width: 550px;
  margin: 0 auto;
  margin-top: 30px;
  overflow-y: scroll;
  max-height: 220px;
  margin-bottom: 200px;
`;

// new way of doing form using useForm
function ToDoList() {
  // const value = useRecoilValue(toDoState);
  // const modifierFn = useSetRecoilState(toDoState);
  // => Two line of code above here, can convert into below code.
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <>
      <Container>
        <Header>
          <Title> To Dos </Title>
        </Header>
        <Select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </Select>
      </Container>
      <ToDoContainer id="toDoContainer">
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoContainer>
      <EditorContainer>
        <CreateToDo />
      </EditorContainer>
    </>
  );
}

// Traditional way of doing form

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setToDo(event.currentTarget.value);
    setToDoError("");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 3) {
      return setToDoError("「To-Do」should be longer");
    }
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

// Extensive Example of UseForm()

/* 
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  pwChk: string;
  extraError?: string;
}

function ToDoList() {
  const { register, handleSubmit, formState, setError } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  console.log(formState.errors);
  const onValid = (data: IForm) => {
    if (data.password !== data.pwChk) {
      setError(
        "pwChk",
        { message: "Password are not the same!" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server Offline" });
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only @naver.com allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{formState?.errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "First Name is required",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="Frist Name"
        />
        <span>{formState?.errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: "Last Name is required" })}
          placeholder="Last Name"
        />
        <span>{formState?.errors?.lastName?.message}</span>
        <input
          {...register("userName", {
            required: "User Name is required",
            minLength: {
              value: 10,
              message: "Your User Name is too short!",
            },
          })}
          placeholder="User Name"
        />
        <span>{formState?.errors?.userName?.message}</span>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short!",
            },
          })}
          placeholder="Password"
        />
        <span>{formState?.errors?.password?.message}</span>
        <input
          {...register("pwChk", {
            required: true,
            minLength: {
              value: 5,
              message: "Your password is too short!",
            },
          })}
          placeholder="Check Password"
        />
        <span>{formState?.errors?.pwChk?.message}</span>
        <button>Add</button>
        <span>{formState?.errors?.extraError?.message}</span>
      </form>
    </div>
  ); 
}
*/

export default ToDoList;
