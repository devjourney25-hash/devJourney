
// app/admin/dailyTip/edit.tsx
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  required,
} from "react-admin";

export const DailyTipEdit = () => {
  const priorityChoices = [
    { id: 'LOW', name: 'Low' },
    { id: 'MEDIUM', name: 'Medium' },
    { id: 'HIGH', name: 'High' },
  ];
const categoryChoices = [
  { id: "best-practice", name: "Best Practice" },
  { id: "learning", name: "Learning" },
  { id: "problem-solving", name: "Problem Solving" },
  { id: "tools", name: "Tools" },
  { id: "algorithms", name: "Algorithms" },
  { id: "debugging", name: "Debugging" },
];


  return (
    <Edit>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput 
          source="description" 
          multiline 
          rows={4} 
          validate={[required()]} 
        />
        <SelectInput 
          source="category" 
          choices={categoryChoices}
        />
        <SelectInput 
          source="priority" 
          choices={priorityChoices}
        />
        <BooleanInput source="isActive" />
      </SimpleForm>
    </Edit>
  );
};