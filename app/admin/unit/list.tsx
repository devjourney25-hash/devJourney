import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const UnitList = () => {
  return (
    <List perPage={1000} pagination={false}>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <ReferenceField source="courseId" reference="courses">
          <TextField source="title" />
        </ReferenceField>
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};