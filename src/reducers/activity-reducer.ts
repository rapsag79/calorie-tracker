import type { Activity } from "../types";

export type ActivityActions =
  { type: "save-activity"; paylod: { newActivity: Activity } } |
  { type: "set-activeID"; paylod: { id: Activity["id"] } } |
  { type: "delete-activity"; paylod: { id: Activity["id"] } } |
  {type: "restart-activity"}

export type ActivityState = {
  activities: Activity[],
  activeID: Activity["id"]
};

const localStorageActivities = (): Activity [] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
}

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeID: ""
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    //este codigo maneja el estado
    let updateActivity : Activity[] = [];

    if (state.activeID) {
      updateActivity = state.activities.map(activity => activity.id === state.activeID ? action.paylod.newActivity : activity)
    } else {
      updateActivity = [...state.activities, action.paylod.newActivity]
    }

    return {
      ...state,
      activities: updateActivity,
      activeID: ""
    };
  }

if(action.type === "set-activeID") {
  return {  
    ...state,
    activeID: action.paylod.id
  }
  }
  
  if(action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.paylod.id)
    }
  }

  if(action.type === "restart-activity") {
    return {
      activities: [],
      activeID: ""
    }
  }

  return state;
};
