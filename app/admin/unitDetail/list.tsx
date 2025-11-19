import { Datagrid, List, NumberField, TextField, ReferenceField } from "react-admin";

export const UnitDetailList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <ReferenceField source="lessonModuleId" reference="lessonModules" label="Lesson Module">
          <TextField source="title" />
        </ReferenceField>
        <TextField source="title" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};