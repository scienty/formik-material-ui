import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import { action } from '@storybook/addon-actions';
import { withStyles } from '@material-ui/core';
import * as Yup from 'yup';

import Wrapper from './Wrapper';
import FormValues from './FormValues';
import { SimpleFileUpload } from '../src/main';

// 10 Megs
const MAX_FILE_SIZE = 10485760;

const schema = Yup.object().shape({
  file: Yup.mixed()
    .required('Required')
    .test(
      'file',
      'File must be less than 10MB',
      value => value == null || value.size < MAX_FILE_SIZE
    ),
});

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

export default withStyles(styles)(() => (
  <Wrapper title="File Upload">
    <Formik
      validationSchema={schema}
      initialValues={{ file: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          action('submit')(values);
        }, 2000);
      }}
      render={({ handleSubmit, values }) => (
        <Form>
          <Field component={SimpleFileUpload} name="file" />
          <br />
          <Button variant="raised" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <br />
          <FormValues values={values} />
        </Form>
      )}
    />
  </Wrapper>
));
