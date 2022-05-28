import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from '../FormInput';
import { useAddBoardMutation, useCreateActivityMutation, useWorkspaceQuery } from '../../services/api';
import { useSelector } from 'react-redux';

const AddBoard = ({ closeModal, setCloseModal }) => {
  const user = JSON.parse(useSelector((state) => state.userData.user))
  const { data:workspaceData } = useWorkspaceQuery(user.id);
  const [ addBoard, { isLoading } ] = useAddBoardMutation();
  const [ createActivity ] = useCreateActivityMutation();

  const validate = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
  });

  const handleSubmit = async (formData) => {
    const { name, color_theme_1, color_theme_2, color_theme_3, workspace } = formData;
    const board_form = {
      name, color_theme_1, color_theme_2, color_theme_3, workspace
    }
    const activityForm = {
      user: parseInt(user.id),
      type: 'workspace',
      description: 'created a new board'
    }
    await addBoard(board_form)
    await createActivity(activityForm)
    setCloseModal(true);
  }

  if(closeModal) {
      return null
  }
  return (
    <div className='modal-contain'>
      <div className='modal-shadow' onClick={()=>setCloseModal(true)} ></div>
      <div className='modal-paper'>
        <Formik
          initialValues={{
            name: "",
            color_theme_1: "#FFFFFF",
            color_theme_2: "#BC68FF",
            color_theme_3: "#9A43D0",
            workspace: workspaceData.id,

          }}
          validationSchema={validate}
          validateOnBlur
          onSubmit={values => handleSubmit(values)}
        >
          {(formik) => (
            <Form className='modal-form-body' >
              <TextField
                label="Name"
                name="name"
                inputType="text"
                placeholder="Enter board name"
              />
              <TextField
                label="Color 1"
                name="color_theme_1"
                inputType="color"
              />
              <TextField
                label="Color 2"
                name="color_theme_2"
                inputType="color"
              />
              <TextField
                label="Color 3"
                name="color_theme_3"
                inputType="color"
              />
              <div className='auth-btn-contain' >
                <button
                  type="submit"
                  className="auth-btn"
                  style={{opacity: !(formik.dirty && formik.isValid) && "50%"}}
                  disable={!(formik.dirty && formik.isValid)}
                >
                  {isLoading ? <p>...loading</p> : <p>Add Board</p>}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddBoard