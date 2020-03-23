import axios from 'axios'

export const getProductItemsGromGist = async () => {
    const GIST_URL = 'https://gist.githubusercontent.com/samsara1019/eadeeaf9796b847a5a48023b9274b79f/raw/40e886b061a98a4886044b42dede3fe3dcbad0d9/reactCart.json';
    try {
        const response = await axios.get(GIST_URL);
        if (response.status === 200 && response.statusText === 'OK') {
            const responseGoodList = response.data.data;
            if (!responseGoodList.length) return;
            return response.data.data;
        } else {
            throw new Error('Response Error');
        }
    } catch (error) {
        console.error(error.response);
    }
}

