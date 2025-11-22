import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const LessonList = () => {
  return (
    <List perPage={1000} pagination={false}>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <ReferenceField source="unitId" reference="units">
          <TextField source="title" />
        </ReferenceField>
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};