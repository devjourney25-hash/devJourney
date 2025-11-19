import { Datagrid, List, NumberField, TextField, ReferenceField } from "react-admin";

export const LessonModuleList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <ReferenceField source="courseId" reference="courses">
          <TextField source="title" />
        </ReferenceField>
        <TextField source="title" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};