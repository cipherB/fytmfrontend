import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from '../FormInput';
import { useAddChecklistMutation, useCreateActivityMutation } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddChecklist = ({ checkAdd, setCheckAdd }) => {
  const { id } = useParams();
  const [ addChecklist, { isLoading } ] = useAddChecklistMutation();
  const [ createActivity ] = useCreateActivityMutation();

  const user = JSON.parse(useSelector((state) => state.userData.user))

  const validate = Yup.object({
    title: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
  });

  const handleSubmit = async (formData) => {
    const { title } = formData;
    const card = parseInt(id);
    const checkForm = { title, card }
    const activityForm = {
      user: parseInt(user.id),
      type: 'card',
      description: 'added a checklist task'
    }
    await addChecklist(checkForm);
    await createActivity(activityForm);
    setCheckAdd(false);
  }

  if(!checkAdd) {
    return null
}

  return (
    <div className='modal-contain'>
      <div className='modal-shadow' onClick={()=>setCheckAdd(false)} ></div>
      <div className='checklist-modal-paper'>
      <Formik
          initialValues={{
            title: ""
          }}
          validationSchema={validate}
          validateOnBlur
          onSubmit={values => handleSubmit(values)}
        >
           {(formik) => (
             <Form className='modal-form-body' >
               <TextField
                label="Title"
                name="title"
                inputType="text"
                placeholder="Enter Task"
              />
              <div className='auth-btn-contain' >
                <button
                  type="submit"
                  className="auth-btn"
                  style={{opacity: !(formik.dirty && formik.isValid) && "50%"}}
                  disable={!(formik.dirty && formik.isValid)}
                >
                  {isLoading ? <p>...loading</p> : <p>Add Checklist</p>}
                </button>
              </div>
             </Form>
           )}
        </Formik>
      </div>
    </div>
  )
}

export default AddChecklist