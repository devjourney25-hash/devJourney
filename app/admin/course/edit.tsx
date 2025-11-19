import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
} from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" label="Id" disabled />
        <TextInput source="title" validate={[required()]} label="Title" />
        <ImageInput 
          source="imageSrc" 
          label="Course Image" 
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] }}
          validate={[required()]}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};