"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fetch_mock_jest_1 = tslib_1.__importDefault(require("fetch-mock-jest"));
global.fetch = fetch_mock_jest_1.default;
global.Headers = class {
    constructor(initValue) {
        this._value = {};
        for (const key in initValue) {
            this._value[key.toLowerCase()] = initValue[key];
        }
    }
    has(name) {
        return name.toLowerCase() in this._value;
    }
    get(name) {
        if (!this.has(name))
            throw new TypeError();
        return this._value[name.toLowerCase()];
    }
};
//# sourceMappingURL=test-setup.js.map