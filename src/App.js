import React from 'react'
import {
    Card,
    CardContent,
    Container,
    TextField,
    MenuItem,
    Typography,
    FormGroup,
    Box, Button
} from "@material-ui/core";
import {Form, Field, Formik, ErrorMessage} from "formik";
import MyCheckbox from "./MyCheckbox";
import {array, boolean, mixed, number, object, string} from "yup";

const initialValues = {
    fullName: '',
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptedTermsAndConditions: false
}

function App() {
    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant='h4'>New Account</Typography>

                    <Formik
                        validationSchema={
                            object({
                                fullName: string().required("حتما وارد کنید").min(3, 'at least 3 char').max(100, 'must be 100 char'),
                                initialInvestment: number().required().min(100, 'at least 100 char'),
                                dependents: number().required().min(0, 'at least 0 char').max(5, 'must be 5 char'),
                                acceptedTermsAndConditions: boolean().oneOf([true], 'you must accept the terms and conditions'),
                                investmentRisk: array(string().oneOf(['High', 'Medium', 'Low'])).min(1), // if objects write object({}) instead string()
                                commentAboutInvestmentRisk: mixed().when('investmentRisk', {
                                    is: (investmentRisk) => investmentRisk.find(ir => ir === 'High'),
                                    then: string().required().min(20).max(100),
                                    otherWise: string().min(20).max(100)
                                })
                            })
                        }
                        initialValues={initialValues} onSubmit={(values, formikHelpers) => {
                        return new Promise(res => {
                            setTimeout(() => {
                                console.log(values)
                                console.log(formikHelpers)
                                console.log('-----------------------')
                                res()
                            }, 5000)
                        })

                    }}>
                        {({values, errors, isSubmitting, isValidating}) => (
                            <Form>
                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field name='fullName' as={TextField} label='Full Name'/>
                                        <ErrorMessage name='fullName'/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field name='initialInvestment' type="number" as={TextField}
                                               label='Initial Investment'/>
                                        <ErrorMessage name='initialInvestment'/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <MyCheckbox name="investmentRisk" value="High" label="High - Super Risky"/>
                                        <MyCheckbox name="investmentRisk" value="Medium" label="Medium - Risky"/>
                                        <MyCheckbox name="investmentRisk" value="Low" label="Low - Safe"/>
                                        <ErrorMessage name='investmentRisk'/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field name="commentAboutInvestmentRisk" as={TextField} multiline rows={3}
                                               rowsMax={10}/>
                                        <ErrorMessage name='commentAboutInvestmentRisk'/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <Field name="dependents" as={TextField} select>
                                            <MenuItem value={-1}>Select ...</MenuItem>
                                            <MenuItem value={0}>0</MenuItem>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Field>
                                        <ErrorMessage name='dependents'/>
                                    </FormGroup>
                                </Box>

                                <Box marginBottom={2}>
                                    <FormGroup>
                                        <MyCheckbox name="acceptedTermsAndConditions"
                                                    label="Accept terms and conditions"/>
                                        <ErrorMessage name='acceptedTermsAndConditions'/>
                                    </FormGroup>
                                </Box>

                                <Button type='submit' color={'primary'} variant={"contained"}
                                        disabled={isSubmitting || isValidating}>Submit</Button>

                                <pre>{JSON.stringify(errors, null, 4)}</pre>
                                <pre>{JSON.stringify(values, null, 4)}</pre>
                            </Form>
                        )}


                    </Formik>
                </CardContent>
            </Card>
        </Container>
    )
}

export default App
