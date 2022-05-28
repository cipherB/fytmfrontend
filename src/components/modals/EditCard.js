import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField, CustomSelect, TextArea } from '../FormInput';
import { useCardQuery, useUpdateCardMutation, useCreateActivityMutation } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditCard = ({ editModal, setEditModal }) => {
  const [ updateCard, { isLoading } ] = useUpdateCardMutation();
  const { data, isSuccess } = useCardQuery(editModal);
  const [ createActivity ] = useCreateActivityMutation();

  const user = JSON.parse(useSelector((state) => state.userData.user))
  const { id:boardId } = useParams();

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
    const board = parseInt(boardId)
    const id = editModal
    const card_form = {
      id, 
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
      description: 'edited a card'
    }
    await updateCard(card_form);
    await createActivity(activityForm);
    setEditModal(null);
  }

  if(editModal === null) {
      return null
  }
  return (
    <div className='modal-contain'>
      <div className='modal-shadow' onClick={()=>setEditModal(null)} ></div>
      <div className='modal-paper'>
        {
          isSuccess && 
          <Formik
            initialValues={{
                name: data.name,
                description: data.description,
                start_date: data.start_date,
                deadline: data.deadline,
                status: data.status,
                priority: data.priority
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
                  {isLoading ? <p>...loading</p> : <p>Edit Card</p>}
                </button>
              </div>
              </Form>
            )}
          </Formik>
        }
      </div>
    </div>
  )
}

export default EditCard