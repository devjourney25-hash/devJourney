import {
  Datagrid,
  List,
  TextField,
  BooleanField,
  DateField,
  SelectField,
} from "react-admin";

export const DailyTipList = () => {
  const priorityChoices = [
    { id: 'LOW', name: 'Low' },
    { id: 'MEDIUM', name: 'Medium' },
    { id: 'HIGH', name: 'High' },
  ];

  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="category" />
        <SelectField source="priority" choices={priorityChoices} />
        <BooleanField source="isActive" label="Active" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  );
};
