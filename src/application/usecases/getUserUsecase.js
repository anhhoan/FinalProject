// application/useCases/getUserListUsecase.js
import { getUserListStart, getUserListSuccess, getUserListFailure } from '../stores/getUserSlice';
import { UserService } from '../../domain/services/UserService';

export const getUserListUsecase = (page, size) => async (dispatch) => {
  try {
    dispatch(getUserListStart());
    const userPage = await UserService.getAllUsers(page, size); // Truyền page và size xuống service
    dispatch(getUserListSuccess(userPage)); // Giả sử userPage chứa dữ liệu phân trang
  } catch (error) {
    dispatch(getUserListFailure(error.response?.data?.message || 'Lấy danh sách user thất bại'));
  }
};
