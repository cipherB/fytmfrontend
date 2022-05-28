import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField, CustomSelect, TextArea } from '../FormInput';
import { useAddCardMutation, useCreateActivityMutation } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddCard = ({ closeModal, setCloseModal }) => {
  const [ addCard, { isLoading } ] = useAddCardMutation();
  const [ createActivity ] = useCreateActivityMutation();

  const user = JSON.parse(useSelector((state) => state.userData.user))

  const { id } = useParams();

  const validate = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
  });

  const status_option = [
    { value:'open', label: 'Open'},
    { value:'in progress', label: 'In Progress'},
    { value:'need assistance', label: 'Need Assistance'},
    { value:'on hold', label: 'On Hold'},
    { value:'client review', label: 'Client Review'},
    { value:'verify and close', label: 'Verify and Close'},
    { value:'done', label: 'done'},
  ]

  const priority_option = [
    { value: 'urgent', label: 'Urgent'},
    { value: 'high', label: 'High'},
    { value: 'normal', label: 'Normal'},
    { value: 'low', label: 'Low'},
    { value: 'no priority', label: 'No Priority'},
  ]

  const handleSubmit = async (formData) => {
    const { name, description, start_date, deadline, status, priority } = formData;
    const board = parseInt(id)
    const card_form = {
      name, 
      description, 
      start_date: start_date === "" ? null : start_date, 
      deadline: deadline === "" ? null : deadline, 
      status, 
      priority, 
      board
    }
    const activityForm = {
      user: parseInt(user.id),
      type: 'board',
      description: 'added a card'
    }
    await addCard(card_form);
    await createActivity(activityForm);
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
            description: "",
            start_date: null,
            deadline: null,
            status: "open",
            priority: "no priority"
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
              <TextArea
                label="Description"
                name="description"
                type="text"
              />
              <TextField
                label="Start Date"
                name="start_date"
                inputType="date"
              />
              <TextField
                label="Deadline"
                name="deadline"
                inputType="date"
              />
              <CustomSelect 
                onChange={value=>formik.setFieldValue('status', value.value)}
                error={formik.errors.status}
                value={formik.values.status}
                label="Status"
                options={status_option}
              />
              <CustomSelect 
                onChange={value=>formik.setFieldValue('priority', value.value)}
                error={formik.errors.priority}
                value={formik.values.priority}
                label="Priority"
                options={priority_option}
              />
              <div className='auth-btn-contain' >
                <button
                  type="submit"
                  className="auth-btn"
                  style={{opacity: !(formik.dirty && formik.isValid) && "50%"}}
                  disable={!(formik.dirty && formik.isValid)}
                >
                  {isLoading ? <p>...loading</p> : <p>Add Card</p>}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddCard