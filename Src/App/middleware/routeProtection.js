import responseHandler from '../utils/respHandler';
import encryption from '../helpers/auth';

const { verifyToken } = encryption;
const { respError } = responseHandler;
class routeProtection {
  static async postCreate(req, res, next) {
    try {
      const verifyRoute = req.headers.authorization.split(' ')[1];
      if (!verifyRoute) {
        return respError(res, 401, 'no token provided');
      }
      const user = verifyToken(verifyRoute);

      req.user = user;
      return next();
    } catch (err) {
      return respError(res, 403, 'token not valid');
    }
  }
}
export default routeProtection;