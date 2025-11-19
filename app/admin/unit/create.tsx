import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />
        <ReferenceInput source="courseId" reference="courses">
          <SelectInput optionText="title" validate={[required()]} />
        </ReferenceInput>
        {/* Order is now auto-generated! No need to input it */}
      </SimpleForm>
    </Create>
  );
};