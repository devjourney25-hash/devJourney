import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
} from "react-admin";

export const LessonModuleEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" disabled />
        <ReferenceInput source="courseId" reference="courses">
          <SelectInput optionText="title" validate={[required()]} label="Course" />
        </ReferenceInput>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="description" validate={[required()]} label="Description" multiline rows={4} />
        <TextInput source="concepts" label="Concepts (JSON array)" multiline rows={3} />
        <TextInput source="tip" label="Learning Tip" multiline rows={3} />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};