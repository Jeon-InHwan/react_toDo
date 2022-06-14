import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./atoms";

const Btn = styled.button`
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 12px;
  min-height: 40px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-top: 10px;
  margin-bottom: 10px;
  span {
    flex: none;
    margin-left: 40px;
  }
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

function ToDo(data: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((current) => {
      const targetIndex = current.findIndex((toDo) => toDo.id === data.id);
      // console.log(targetIndex);
      // const targetToDo = current[targetIndex];
      const newToDo = { text: data.text, id: data.id, category: name as any };

      return [
        ...current.slice(0, targetIndex),
        newToDo,
        ...current.slice(targetIndex + 1),
      ];
    });
  };

  const deleteOne = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((current) => {
      const targetIndex = current.findIndex((toDo) => toDo.id === data.id);
      // console.log(targetIndex);
      // const targetToDo = current[targetIndex];

      return [
        ...current.slice(0, targetIndex),
        ...current.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <Container>
      <span>{data.text}</span>
      <ButtonContainer>
        {data.category !== Categories.TO_DO && (
          <Btn name={Categories.TO_DO} onClick={onClick}>
            🚶‍♂️
          </Btn>
        )}
        {data.category !== Categories.DOING && (
          <Btn name={Categories.DOING} onClick={onClick}>
            🏃‍♂️
          </Btn>
        )}
        {data.category !== Categories.DONE && (
          <Btn name={Categories.DONE} onClick={onClick}>
            ✅
          </Btn>
        )}
        <Btn onClick={deleteOne}>❌</Btn>
      </ButtonContainer>
    </Container>
  );
}

export default ToDo;
