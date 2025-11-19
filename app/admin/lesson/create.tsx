import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <ReferenceInput source="unitId" reference="units">
          <SelectInput optionText="title" validate={[required()]} />
        </ReferenceInput>
        {/* Order is auto-generated */}
      </SimpleForm>
    </Create>
  );
};