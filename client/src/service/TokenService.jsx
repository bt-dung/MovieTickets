import { jwtDecode } from 'jwt-decode';

const TokenService = {
    getToken: () => {
        return localStorage.getItem('token');
    },
    setToken: (token) => {
        localStorage.setItem('token', token);
    },
    removeToken: () => {
        localStorage.removeItem('token');
    },
    decodeToken: () => {
        const token = TokenService.getToken();
        if (!token) {
            throw new Error('Token không tồn tại');
        }
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.error('Lỗi khi giải mã token:', error);
            return null;
        }
    },
    isTokenValid: () => {
        const token = TokenService.getToken();
        if (!token) {
            return false;
        }

        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.exp * 1000 > Date.now();
        } catch (error) {
            console.error('Lỗi khi kiểm tra token:', error);
            return false;
        }
    }
};

export default TokenService;