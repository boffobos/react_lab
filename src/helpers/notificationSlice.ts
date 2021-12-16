export const notificationReducer = (
  state = { message: "", status: "" },
  action: { type: string; payload: { message: string | ""; status: "success" | "error" | "warn" | "" } }
) => {
  switch (action.type) {
    case "notify/setMessage": {
      return { ...state, message: action.payload.message, status: action.payload.status };
    }
    case "notify/clearMessage": {
      return { ...state, message: "", status: "" };
    }
    default:
      return state;
  }
};
