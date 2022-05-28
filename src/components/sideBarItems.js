import { useParams } from 'react-router-dom';

const Id = () => {
  const {id} = useParams();
  return id
}

const Email = () => {
  const {email} = useParams();
  return email
} 

export const workspaceItems = [
  {
    title: "Boards",
    route: `/dashboard/${Email}/workspace`
  },
  {
    title: "Chart",
    route: `/dashboard/${Email}/workspace/chart`
  },
]

export const boardItems = [
  {
    title: "Cards",
    route: `/dashboard/${Email}/board/${Id}`
  },
  {
    title: "Chart",
    route: `/dashboard/${Email}/board/${Id}/chart`
  },
  {
    title: "Members",
    route: `/dashboard/${Email}/board/${Id}/members`
  },
  {
    title: "Activities",
    route: `/dashboard/${Email}/board/${Id}/activities`
  },
]

export const cardItems = [
  {
    title: "Card",
    route: `/dashboard/${Email}/card/${Id}`
  },
  {
    title: "Attachments",
    route: `/dashboard/${Email}/card/${Id}/attachments`
  },
  {
    title: "Chart",
    route: `/dashboard/${Email}/card/${Id}/chart`
  },
  {
    title: "Assigned",
    route: `/dashboard/${Email}/card/${Id}/assigned`
  },
  {
    title: "Comments",
    route: `/dashboard/${Email}/card/${Id}/comments`
  },
  {
    title: "Calendar",
    route: `/dashboard/${Email}/card/${Id}/calendar`
  },
  {
    title: "Activities",
    route: `/dashboard/${Email}/card/${Id}/activities`
  }
]