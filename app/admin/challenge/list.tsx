import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SelectField,
  TextField,
} from "react-admin";

export const ChallengeList = () => {
  return (
    <List perPage={1000} pagination={false}>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="question" />
        <SelectField
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
          ]}
        />
        <ReferenceField source="lessonId" reference="lessons">
          <TextField source="title" />
        </ReferenceField>
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};