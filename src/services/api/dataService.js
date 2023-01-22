import axios from "axios";

export function loadData(vendorName) {
    try {
        return axios({
            method: "GET",
            url: `https://admin.qrmenus.uz/api/vendors/${vendorName}`
        })
    } catch(e){
        console.log('Error: ',e);
    }
}