import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("User name is required"),
  title: yup.string().required("Title is required"),
});

export { schema };
