import { Create, SimpleForm, TextInput, required, ReferenceInput, SelectInput } from "react-admin";

export const LessonModuleCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="courseId" reference="courses">
          <SelectInput optionText="title" validate={[required()]} label="Course" />
        </ReferenceInput>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="description" validate={[required()]} label="Description" multiline rows={4} />
        <TextInput source="concepts" label="Concepts (JSON array)" multiline rows={3} />
        <TextInput source="tip" label="Learning Tip" multiline rows={3} />
        {/* Order is auto-generated */}
      </SimpleForm>
    </Create>
  );
};