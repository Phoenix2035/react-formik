import React from 'react';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {useField} from "formik";

function MyCheckbox(props) {
    const [field] = useField({
        name: props.name,
        type: 'checkbox',
        value: props.value
    })
    return <FormControlLabel control={<Checkbox {...props} {...field}/>} label={props.label}/>
}

export default MyCheckbox;