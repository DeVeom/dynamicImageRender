import { logger } from '../config';
import { NS_PER_SEC, MS_PER_NS } from '../utils/contants';

export const logReqInfo = (req, res, next) => {
  const reqEndPoint = req.route.path.split('/')[1];
  const reqMethod = Object.keys(req.route.methods)[0];
  logger.verbose(`Router.${reqEndPoint}.${reqMethod}`);

  const resStartTime = process.hrtime();
  req.reqMethod = reqMethod;
  req.startTime = resStartTime;
  next();
};

export const logResInfo = (req, res, next) => {
  const { reqMethod, startTime, headers, clientIp, originalUrl } = req;
  const diff = process.hrtime(startTime);
  logger.http(
    `RES ${reqMethod.toUpperCase()} ${headers.host} ${originalUrl} lang: ${
      headers['accept-language']
    } clientip: ${clientIp} useragent: ${headers['user-agent']} elapsed: ${
      Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS * 100) / 100
    }ms`
  );
};
