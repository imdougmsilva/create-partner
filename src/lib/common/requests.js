import { config } from 'dotenv';

import format from 'string-template';
import { stringify } from 'querystring';
import rp from 'request-promise-native';

import { get } from 'lodash';
import os from 'os';
import util from './util';
import logger from './logger';

import { httpAgent, httpsAgent } from './agent';


config();

const DEFAULT_TIMEOUT = 8000;

class RequestEntity {
  constructor({
    resource, action, requestOptions, query, urlParams, method, endpoint, host,
  }) {
    this.requestOptions = requestOptions;
    this.host = host;
    this.queryString = this.constructor.formatQueryString(query);
    this.method = method;
    this.path = this.constructor.formatPath(
      endpoint,
      urlParams,
    );
    this.resource = resource;
    this.action = action;
  }

  url() {
    return this.host + this.path + this.queryString;
  }

  static formatQueryString(query) {
    if (!query && !(query instanceof Object)) {
      return '';
    }

    return `?${stringify(query)}`;
  }

  static formatPath(path, urlParams) {
    if (!urlParams) {
      return path;
    }

    return format(path, urlParams);
  }
}


function getErrorCode(err) {
  return (err && err.error && err.error.code) || 'UNEXPECTED-RESPONSE';
}

class Request {
  constructor(requestEntity) {
    this.requestEntity = requestEntity;
    this.options = this.buildOptions();
  }

  async run() {
    try {
      return rp(this.options);
    } catch (err) {
      const message = get(err, 'details.err.message');
      const extraArgs = {
        url: this.options.uri,
        method: this.options.method,
        qs: this.options.qs,
        timeout: this.options.timeout,
        statusCode: err.statusCode,
        apiErrorMessage: message,
        host: os.hostname(),
        environment: process.env.NODE_ENV,
      };

      const errorMessage = `Error when trying a request for the API ${this.options.host}`;
      logger.error(errorMessage, extraArgs);

      return Promise.reject(Request.handleRequestError(err, err && err.response));
    }
  }

  buildOptions() {
    const options = {
      method: this.requestEntity.method.toUpperCase(),
      uri: this.requestEntity.url(),
      timeout: this.requestEntity.timeout,
      host: this.requestEntity.host,
      agent: this.requestEntity.host.startsWith('https://') ? httpsAgent : httpAgent,
    };


    if (!options.timeout) {
      options.timeout = DEFAULT_TIMEOUT;
    }

    if (this.requestEntity.requestOptions) {
      Object.assign(options, this.requestEntity.requestOptions);
    }

    return options;
  }

  static handleRequestError(err, response) {
    if (err && err.details) {
      return err;
    }
    return util.buildResponseError(
      getErrorCode(err),
      { err, response },
      response && response.statusCode,
    );
  }
}


export { RequestEntity, Request };
