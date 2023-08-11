class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        else {
            return Promise.reject(`Ошибка ${res.status}`)
        }

    }

    async getInitialCards() {
        const response = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: 'include'
        })

        return this._checkResponse(response)
    }

    async getUserInfo() {
        const response = await fetch(`${this._baseUrl}/users/me `, {
            headers: this._headers,
            credentials: 'include'
        })
        return this._checkResponse(response)
    }

    async editUserInfo(name, about) {
        const response = await fetch(`${this._baseUrl}/users/me `, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        return this._checkResponse(response)
    }
    async editPhoto(name, link) {
        const response = await fetch(`${this._baseUrl}/cards `, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        return this._checkResponse(response)
    }

    async editUserAva(avatar) {
        const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar

            })
        })
        return this._checkResponse(response)

    }

    async deleteCard(id) {
        const response = await fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers
        })
        return this._checkResponse(response)

    }

    async setLike (id){
        const response = await fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: "PUT",
            credentials: 'include',
            headers: this._headers
        })
        return this._checkResponse(response)

    }

    async deleteLike (id){
        const response = await fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: "DELETE",
            credentials: 'include',
            headers: this._headers
        })
        return this._checkResponse(response)

    }
    async changeLikeCardStatus(id,iSLiked) {
        if (!iSLiked) {
            return await this.setLike(id)
        } 
        return await this.deleteLike(id)
    }  



}

const api = new Api({
    baseUrl: 'http://localhost:4000',
    headers: {
        // authorization: '16cddbd8-a5a0-4ea8-ba7a-4e06d4944e1a',
        'Content-Type': 'application/json'
    }
})
export default api
