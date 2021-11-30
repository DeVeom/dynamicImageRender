import { logger } from '../config';

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
  const NS_PER_SEC = 1e9;
  const MS_PER_NS = 1e-6;
  const diff = process.hrtime(startTime);
  logger.http(
    `RES ${reqMethod.toUpperCase()} ${headers.host} ${originalUrl} lang: ${
      headers['accept-language']
    } clientip: ${clientIp} useragent: ${headers['user-agent']} elapsed: ${
      Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS * 100) / 100
    }ms`
  );
};
