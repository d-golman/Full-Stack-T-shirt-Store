import { API } from "../../../services/backend";

export const getUserData = async () =>{
    if (localStorage.webToken){
    let result = null
    await fetch(`${API}user/getuserdata/${JSON.parse(localStorage.webToken)}/`)
    .then(response => response.json())
    .then(res => (result = res))
    return result
    }
}

export const putUserData = (id, userData) =>{
    const formData = new FormData()
    for (const name in userData){
        formData.append(name,userData[name])
    }
    formData.append('session_token',JSON.parse(localStorage.webToken))
    return fetch(`${API}user/${id}/`,{
        method:'PUT',
        body:formData
    })
    .then(async response => {
        if (response.status === 200) {
            return await (response.json())
        }
        else {
            const err = await response.json()
            return (Object.values(err))
        }
    })
    .catch(err => console.log(err))
}

