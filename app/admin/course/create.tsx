import { Create, SimpleForm, TextInput, required, ImageInput, ImageField } from "react-admin";

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
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
    </Create>
  );
};