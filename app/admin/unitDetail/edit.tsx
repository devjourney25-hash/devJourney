import {
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
} from "react-admin";

export const UnitDetailEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" disabled />
        <ReferenceInput source="lessonModuleId" reference="lessonModules">
          <SelectInput optionText="title" validate={[required()]} label="Lesson Module" />
        </ReferenceInput>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="content" validate={[required()]} label="Content" multiline rows={6} />
        <TextInput source="sampleCode" label="Sample Code" multiline rows={10} />
        <TextInput source="codeExplanation" label="Code Explanation" multiline rows={4} />
        <TextInput source="keyPoints" label="Key Points (JSON array)" multiline rows={3} />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};