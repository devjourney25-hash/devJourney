import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" label="Id" disabled />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" label="Image" />
      </SimpleForm>
    </Edit>
  );
};