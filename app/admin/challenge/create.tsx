// ========================================
// FILE: ChallengeCreate.tsx
// ========================================
import {
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question" />
        <SelectInput
          source="type"
          validate={[required()]}
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
          ]}
        />
        <ReferenceInput source="lessonId" reference="lessons">
          <SelectInput optionText="title" validate={[required()]} />
        </ReferenceInput>
        {/* Order is auto-generated */}
      </SimpleForm>
    </Create>
  );
};