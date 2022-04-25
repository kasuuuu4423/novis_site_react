import axios from "axios";

class Http{
    public static get = (url: string, param: {[key: string]: string} = {}, callback: (data: [] | {[key: string]: any})=>void = ()=>{}) =>{
        axios.get(url, {params: param})
            .then(res => {
                const data = res.data;
                //console.log(data);
                callback(res.data);
            });
    }
}

export default Http;