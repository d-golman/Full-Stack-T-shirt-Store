import { API } from "../../services/backend"


export const signUp = async user => {
    console.log(user)
    return await fetch(`${API}user/`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(async response => {
            if (response.status === 201) {
                return await (response.json())
            }
            else {
                const err = await response.json()
                return (Object.values(err))
            }
        })
        .catch(err => console.log(err))
}

export const signIn = user => {
    const formData = new FormData()
    for (const name in user) {
        formData.append(name, user[name])
    }
    return fetch(`${API}user/login/`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}

export const authtenticate = (data) => {
    localStorage.webToken = JSON.stringify(data)
}

export const isAuthenticated = () => {
    if (localStorage.webToken) {
        return fetch(`${API}user/usercheck/${JSON.parse(localStorage.webToken)}/`)
            .then(response => response.json())
            .then(response => {
                if (response.result) {
                    return true
                }
                else {
                    return false
                }
            })
            .catch(() => false)
    }
    else {
        return false
    }
}

export const signOut = (next) => {
    if (localStorage.webToken) {
        const token = JSON.parse(localStorage.webToken)
        if (isAuthenticated()) {
            return fetch(`${API}user/logout/${token}`)
                .then(localStorage.removeItem('webToken'))
                .then(next)
                .catch(err => console.log(err))
        }
    }
    

}