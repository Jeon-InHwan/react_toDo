import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  background: whitesmoke;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 0;
  width: 70%;
  border-radius: 5px;
  height: 35px;
  transition: 0.15s;
  padding-left: 15px;
  border: 5px solid #778899;
  height: 45px;
  font-size: 1.2em;
  &:active {
    background-color: white;
    border: 5px solid #2f4f4f;
  }
  ::placeholder {
    font-weight: 600;
  }
`;

const Button = styled.button`
  width: 30%;
  border: 5px solid #778899;
  border-radius: 5px;
  height: 45px;
  font-weight: 700;
  color: ${(props) => props.theme.bgColor};
  &:hover {
    cursor: pointer;
    background-color: #dcdcdc;
  }
  transition: background-color 0.3s ease-in-out;
`;

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const handleValid = (data: IForm) => {
    // console.log("Add To-Do", data.toDo);
    setToDos((prev) => [
      { text: data.toDo, id: Date.now(), category: category },
      ...prev,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Wrapper>
        <Input
          {...register("toDo", {
            required: "Please Write a To-Do",
          })}
          placeholder="Write your tasks"
          maxLength={30}
        ></Input>
        <Button> ➕ </Button>
      </Wrapper>
    </form>
  );
}

export default CreateToDo;
