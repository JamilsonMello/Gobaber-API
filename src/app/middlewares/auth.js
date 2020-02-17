import jwt, { verify } from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization; // pegando token do campo headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');// dividindo em array para pegar somente o token

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // promisify converte uma function de calback em function que retorna outra function sem precisar passar o callback

    req.userId = decoded.id;

    return next();

  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}
