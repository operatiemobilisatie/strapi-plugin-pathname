import * as React from "react";
import { get } from 'lodash';
import { useIntl } from "react-intl";
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, Flex, Typography, lightTheme } from '@strapi/design-system';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

const popSlugFromPath = (path) => {
  if(path) {
    let pathArray = path.split('/');
    pathArray.pop();
  
    return pathArray.join('/');
  }
  return path
}

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props; // these are just some of the props passed by the content-manager

  const { formatMessage } = useIntl();

  // Get slug value
  const { modifiedData } = useCMEditViewDataManager();
  const slug = get(modifiedData, 'slug', null);

  // Set initial field state
  const [path, setPath] = React.useState(popSlugFromPath(value));

  const handleChange = (e) => {
    setPath(e.currentTarget.value);
  };

  React.useEffect(() => {
    // Replace remove trailing slash    
    let valueToSave
    if(path) valueToSave = path.replace(/\/$/, "") + '/' + slug;
    else valueToSave = slug;

    // Add leading slash
    if(valueToSave && valueToSave.indexOf('/') !== 0) valueToSave = '/' + valueToSave

    // Set new final value
    onChange({
      target: { name, type: attribute.type, value: valueToSave },
    });
  }, [path, slug]);


  return (
    <Field
      name={name}
      id={name}
      hint="Enter the full path to the page excluding the slug."
      // GenericInput calls formatMessage and returns a string for the error
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <FieldLabel>{formatMessage(intlLabel)}</FieldLabel>
        <Flex direction="column" alignItems="stretch" style={{position: 'relative'}}>
          <FieldInput placeholder="/some/parent/path" value={path} type="text" onChange={handleChange}/>
          <Typography style={fixedInputTextStyle}>/{slug}</Typography>
        </Flex>
        <FieldHint />
        <FieldError />
      </Flex>
    </Field>
  );
});

const fixedInputTextStyle = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  height: '100%',
  padding: '0.65625rem 16px',
  backgroundColor: lightTheme.colors.neutral100,
  borderWidth: `1px`,
  borderStyle: 'solid',
  borderRadius: '0 4px 4px 0',
  borderColor: lightTheme.colors.neutral300
}

export default Input;