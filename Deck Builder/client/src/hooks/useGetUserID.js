//creates a hook to get the user id from the local storage
export const useGetUserID = () => {
    return window.localStorage.getItem("userID");
} 