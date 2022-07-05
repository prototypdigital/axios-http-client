import axios from 'axios';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var HttpClient = /** @class */ (function () {
    function HttpClient(_a, config) {
        var _b = _a.useHttps, useHttps = _b === void 0 ? false : _b, baseUrl = _a.baseUrl, endpoint = _a.endpoint;
        this.useHttps = useHttps;
        this.client = axios.create(__assign({ baseURL: this.normalizeUrl("".concat(baseUrl, "/").concat(endpoint)) }, config));
    }
    HttpClient.prototype.normalizeUrl = function (url) {
        var splittedUrl = url.split(this.useHttps ? 'https://' : 'http://');
        var normalizedUrl = splittedUrl[1].replace(/([\/])\1+/g, '/');
        return this.useHttps
            ? "https://".concat(normalizedUrl)
            : "http://".concat(normalizedUrl);
    };
    HttpClient.prototype.get = function (url, config) {
        return this.client.get(url, config);
    };
    HttpClient.prototype.post = function (url, data, config) {
        return this.client.post(url, data, config);
    };
    HttpClient.prototype.put = function (url, data, config) {
        return this.client.put(url, data, config);
    };
    HttpClient.prototype.patch = function (url, data, config) {
        return this.client.patch(url, data, config);
    };
    HttpClient.prototype.delete = function (url, config) {
        return this.client.delete(url, config);
    };
    return HttpClient;
}());

export { HttpClient };
