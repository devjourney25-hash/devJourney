import { Datagrid, List, NumberField, TextField, FunctionField } from "react-admin";

export const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <FunctionField
          label="Image"
          render={(record: any) => 
            record.imageSrc ? (
              <img 
                src={record.imageSrc} 
                alt={record.title}
                style={{ 
                  width: 100, 
                  height: 100, 
                  objectFit: 'cover',
                  borderRadius: 4
                }}
              />
            ) : (
              <span style={{ color: '#999', fontStyle: 'italic' }}>No image</span>
            )
          }
        />
      </Datagrid>
    </List>
  );
};