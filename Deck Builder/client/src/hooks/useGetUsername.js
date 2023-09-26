//creates a hook to get the username from the local storage
export const useGetUsername = () => {
    return window.localStorage.getItem("username");
} 