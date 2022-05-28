import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import WorkspaceRoute from './workspaceRoute';
import BoardRoute from './boardRoute';
import CardRoute from './cardRoute';

const routes = () => {
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/sign-up" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard/:email/workspace/*" element={
        <ProtectedRoute><WorkspaceRoute /></ProtectedRoute>
      } />
      <Route exact path="/dashboard/:email/board/:id/*" element={
        <ProtectedRoute><BoardRoute /></ProtectedRoute>
      } />
      <Route exact path="/dashboard/:email/card/:boardId/:id/*" element={
        <ProtectedRoute><CardRoute /></ProtectedRoute>
      } />
    </Routes>
    
    </>
  )
}

export default routes