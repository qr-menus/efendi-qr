import axios from "axios";

export function loadData(payload) {
    let slug = payload.slug
    slug == '' ? slug = 'main': slug
    try {
        return axios({
            method: "GET",
            url: `https://admin.qrmenus.uz/api/vendors/${payload.subdomain}`,
            params: {
                branch: slug
            }
        })
    } catch(e){
        console.log('Error: ',e);
    }
}