import { jwtDecode } from 'jwt-decode';
const TokenService = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token không tồn tại');
        }

        const decodedToken = jwtDecode(token);
        console.log("user:", decodedToken)
        return decodedToken;
    } catch (error) {
        console.error('Lỗi:', error);
        return null;
    }
};
export default TokenService;