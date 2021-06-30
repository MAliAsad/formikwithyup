import "./App.css";
import { Styles } from "./Styles";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlfor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props, "checkbox");
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlfor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

function App() {
  return (
    <Styles>
      <Formik
        initialValues={{
          name: "",
          email: "",
          acceptedTerms: false,
          specialPower: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Must be atleast 3 characters")
            .max(15, "Must be less than 15 characters")
            .required("required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("required"),
          acceptedTerms: Yup.string()
            .required("required")
            .oneOf([true], "You must accept terms and conditions"),
          specialPower: Yup.string()
            .oneOf(["flight", "invisbility", "other"], "Invalid special power")
            .required("required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 3000);
        }}
      >
        {(props) => (
          <Form>
            <h1>Signup</h1>
            <CustomTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="ali"
            />
            <CustomTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="ali@gmail.com"
            />
            <CustomSelect label="Special Power" name="specialPower">
              <option value="">Select a special power</option>
              <option value="flight">Flight</option>
              <option value="invisbility">Invisibility</option>
              <option value="other">Other</option>
            </CustomSelect>
            <CustomCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </CustomCheckbox>
            <input type="submit" value="Submit" />
          </Form>
        )}
      </Formik>
    </Styles>
  );
}

export default App;
