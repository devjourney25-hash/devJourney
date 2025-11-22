import { Datagrid, List, NumberField, TextField } from "react-admin";

export const CourseList = () => {
  return (
    <List perPage={25} pagination={false}>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  );
};