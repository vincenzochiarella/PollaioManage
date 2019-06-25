export const userService = {
    login,
    logout
}

function login(username, password){
    const reqOpt = {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify({ username, password})
    }
    console.log(username, password)
    return fetch(`http://localhost:8080/auth`,reqOpt)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username+ ':'+password)
                localStorage.setItem('user',JSON.stringify(user))
            }
            return user
        })
}
function logout() {
    localStorage.removeItem('user')
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}