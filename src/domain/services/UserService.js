import { authApi } from '../../infrastructure/api/authApi';

export class UserService {
    static async getAllUser( password) {
        const response = await authApi.login(email, password);
        const { access_token, user } = response.data;
        return {
            token: access_token,
            user: new User(user)
        };
    }
}
