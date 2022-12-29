"use strict";
/**
* Copyright 2015-present Ampersand Technologies, Inc.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRegisteredType = exports.withMaxStringLength = exports.withDefaultValue = exports.createEnum = exports.checkTypesBackwardsCompatible = exports.validateType = exports.isNullable = exports.interfaceOf = exports.isTypeMetaProperty = exports.isSchemaArrayNode = exports.isSchemaMapNode = exports.isType = exports.SHORTSTR_LENGTH = exports.IDSTR_LENGTH = void 0;
var JsonUtils = require("amper-utils/dist/jsonUtils");
exports.IDSTR_LENGTH = 65;
exports.SHORTSTR_LENGTH = 191;
function isType(leaf) {
    if (!leaf) {
        return false;
    }
    return leaf.hasOwnProperty('_validateType');
}
exports.isType = isType;
function isSchemaMapNode(leaf) {
    if (!leaf) {
        return false;
    }
    return leaf.hasOwnProperty('_ids');
}
exports.isSchemaMapNode = isSchemaMapNode;
function isSchemaArrayNode(leaf) {
    if (!leaf) {
        return false;
    }
    return leaf.hasOwnProperty('_idxs');
}
exports.isSchemaArrayNode = isSchemaArrayNode;
function isTypeMetaProperty(_node, key) {
    return (key && key[0]) === '_';
}
exports.isTypeMetaProperty = isTypeMetaProperty;
// note: not recursive atm, but will match all fields of a flat mask
function interfaceOf(schema) {
    return !!schema;
}
exports.interfaceOf = interfaceOf;
var gTypes = [];
function defaultToSql(val) {
    return val;
}
function defaultFromSql(val) {
    return val;
}
function validateString(value, valType) {
    // tslint:disable-next-line:no-invalid-this
    return valType === 'string' && (!this._maxStrLength || value.length <= this._maxStrLength);
}
function validateStringLowerCase(value, valType) {
    // tslint:disable-next-line:no-invalid-this
    return valType === 'string' && (!this._maxStrLength || value.length <= this._maxStrLength) && value.toLowerCase() === value;
}
function truncateString(str) {
    // tslint:disable-next-line:no-invalid-this
    return this._maxStrLength ? str.slice(0, this._maxStrLength) : str;
}
function blobToSql(val) {
    return val;
}
function blobFromSql(val) {
    // tslint:disable-next-line:no-invalid-this
    if (!this._nullable && (val === null || val === undefined)) {
        // tslint:disable-next-line:no-invalid-this
        return this._getDefaultValue();
    }
    return val;
}
function objToSql(val) {
    return JsonUtils.safeStringify(val);
}
function objFromSql(val) {
    return JsonUtils.safeParse(val);
}
function addSubType(typeName, params) {
    var subType = {
        _origType: null,
        _validateType: params.validateFunc,
        _getDefaultValue: function () {
            return params.defaultValue;
        },
        _getDefaultValueNonNullable: function () {
            return params.defaultValueNonNullable;
        },
        _hasCustomDefaultValue: false,
        _nullable: params.fieldOverride._nullable || false,
        _autoIncrement: params.fieldOverride._autoIncrement || false,
        _maxStrLength: params.maxStrLength || 0,
        _sqlTypeName: params.sqlTypeName,
        _caseInsensitive: params.caseInsensitive,
        _isEnum: false,
        _toSql: params.toSqlFunc || defaultToSql,
        _fromSql: params.fromSqlFunc || defaultFromSql,
        toString: function () {
            return typeName;
        },
        toJSON: function () {
            return typeName;
        },
    };
    gTypes.push(subType);
    module.exports[typeName] = subType;
    if (Array.isArray(params.defaultValue) || typeof params.defaultValue === 'object') {
        module.exports[typeName]._getDefaultValue = function () {
            return JSON.parse(JSON.stringify(params.defaultValue)); // @allowJsonFuncs
        };
    }
    if (Array.isArray(params.defaultValueNonNullable) || typeof params.defaultValueNonNullable === 'object') {
        module.exports[typeName]._getDefaultValueNonNullable = function () {
            return JSON.parse(JSON.stringify(params.defaultValueNonNullable)); // @allowJsonFuncs
        };
    }
}
function addType(typeName, caseInsensitive, defaultValue, validateFunc, maxStrLength, toSqlFunc, fromSqlFunc) {
    if (maxStrLength === void 0) { maxStrLength = 0; }
    addSubType(typeName, {
        sqlTypeName: typeName,
        caseInsensitive: caseInsensitive,
        defaultValue: defaultValue,
        defaultValueNonNullable: defaultValue,
        validateFunc: validateFunc,
        maxStrLength: maxStrLength,
        toSqlFunc: toSqlFunc,
        fromSqlFunc: fromSqlFunc,
        fieldOverride: {},
    });
    addSubType(typeName + '_NULLABLE', {
        sqlTypeName: typeName,
        caseInsensitive: caseInsensitive,
        defaultValue: null,
        defaultValueNonNullable: defaultValue,
        validateFunc: validateFunc,
        maxStrLength: maxStrLength,
        toSqlFunc: toSqlFunc,
        fromSqlFunc: fromSqlFunc,
        fieldOverride: { _nullable: true },
    });
    if (typeName === 'INT') {
        addSubType(typeName + '_AUTO_INCREMENT', {
            sqlTypeName: typeName,
            caseInsensitive: caseInsensitive,
            defaultValue: null,
            defaultValueNonNullable: defaultValue,
            validateFunc: validateFunc,
            maxStrLength: maxStrLength,
            toSqlFunc: toSqlFunc,
            fromSqlFunc: fromSqlFunc,
            fieldOverride: { _autoIncrement: true },
        });
    }
}
function isObject(value, valType) {
    return valType === 'object' && !!value && !Array.isArray(value);
}
addType('OBJECT', false, {}, isObject);
addType('ARRAY', false, [], function isArray(value, _valType) {
    return !!value && Array.isArray(value);
});
addType('BOOL', false, false, function isBool(_value, valType) {
    return valType === 'boolean';
}, 0, function boolToSql(val) {
    return val ? 1 : 0;
}, function boolFromSql(val) {
    return !!val;
});
addType('NUMBER', false, 0, function isNumber(value, valType) {
    // must disallow NaN and Infinity because they turn to null during JSON conversion
    return valType === 'number' && isFinite(value);
});
addType('INT', false, 0, function isInteger(value, valType) {
    return valType === 'number' && isFinite(value) && value === (value | 0);
});
addType('TIME', false, 0, function isTime(value, valType) {
    return valType === 'number' && isFinite(value) && value === Math.floor(value);
});
addType('TIME_TZ', false, 'epoch', function isTimeWithTimeZone(_value, valType) {
    return valType === 'string';
});
addType('IDSTR', false, '', validateString, exports.IDSTR_LENGTH);
exports.IDSTR.truncate = truncateString;
addType('ACCOUNTIDSTR', false, '', validateString, exports.IDSTR_LENGTH);
exports.ACCOUNTIDSTR.truncate = truncateString;
addType('PERSONAIDSTR', false, '', validateString, exports.IDSTR_LENGTH);
exports.PERSONAIDSTR.truncate = truncateString;
addType('SHORTSTR', false, '', validateString, exports.SHORTSTR_LENGTH);
exports.SHORTSTR.truncate = truncateString;
addType('SHORTSTR_LOWERCASE', false, '', validateStringLowerCase, exports.SHORTSTR_LENGTH);
exports.SHORTSTR_LOWERCASE.truncate = truncateString;
exports.SHORTSTR_LOWERCASE._sqlTypeName = exports.SHORTSTR._sqlTypeName;
addType('LONGSTR', false, '', validateString, 0, blobToSql, blobFromSql);
addType('BINSTR', false, '', validateString, 0, blobToSql, blobFromSql);
addType('JSONBLOB', false, '', function (_value, _valType) {
    return true;
}, 0, objToSql, objFromSql);
exports.JSONBLOB._sqlTypeName = exports.LONGSTR._sqlTypeName;
exports.JSONBLOB_NULLABLE._sqlTypeName = exports.LONGSTR_NULLABLE._sqlTypeName;
addType('STRING', false, '', validateString);
addType('STRING_ARRAY', false, [], function isStringArray(value, _valType) {
    if (!Array.isArray(value)) {
        return false;
    }
    for (var i = 0; i < value.length; ++i) {
        if (typeof value[i] !== 'string') {
            return false;
        }
    }
    return true;
});
addType('FUNCTION', false, null, function isFunction(_value, valType) {
    return valType === 'function';
}, 0, function functionToSql() {
    throw new Error('FUNCTION can not be persisted');
}, function functionFromSql() {
    throw new Error('FUNCTION can not be persisted');
});
function isNullable(type) {
    return (isSchemaMapNode(type) || isSchemaArrayNode(type)) ? false : !!type._nullable;
}
exports.isNullable = isNullable;
function validateType(value, type, undefinedAllowedNullable, futureFeed) {
    if (value === undefined) {
        if (undefinedAllowedNullable) {
            value = null;
        }
        else {
            return false;
        }
    }
    if (value === null) {
        return isNullable(type);
    }
    var valType = typeof value;
    if (isType(type)) {
        return type._validateType(value, valType, futureFeed);
    }
    if (isSchemaMapNode(type)) {
        if (!isObject(value, valType)) {
            return false;
        }
        for (var id in value) {
            if (!validateType(value[id], type._ids, true, futureFeed)) {
                return false;
            }
        }
    }
    else if (isSchemaArrayNode(type)) {
        if (!Array.isArray(value)) {
            return false;
        }
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var aValue = value_1[_i];
            if (!validateType(aValue, type._idxs, true, futureFeed)) {
                return false;
            }
        }
    }
    else {
        if (!isObject(value, valType)) {
            return false;
        }
        for (var key in type) {
            if (isTypeMetaProperty(type, key)) {
                continue;
            }
            if (!validateType(value[key], type[key], true, futureFeed)) {
                return false;
            }
        }
        for (var key in value) {
            if (!type.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}
exports.validateType = validateType;
function isNullableTypeStr(str) {
    return str.slice(-9) === '_NULLABLE';
}
function getBaseType(str) {
    return str.split('_NULLABLE')[0].split('_AUTO_INCREMENT')[0].split('_LOWERCASE')[0];
}
function checkTypesBackwardsCompatible(newType, lastType) {
    if (!newType) {
        return false;
    }
    if (typeof lastType !== typeof newType) {
        return false;
    }
    if (typeof lastType === 'string') {
        var newTypeNullable = isNullableTypeStr(newType);
        var baseNewType = getBaseType(newType);
        var lastTypeNullable = isNullableTypeStr(lastType);
        var baseLastType = getBaseType(lastType);
        if (lastTypeNullable && !newTypeNullable) {
            return false;
        }
        // check if the new type is the same as the last, or a nullable version of the last
        if (baseNewType === baseLastType) {
            return true;
        }
        // special case for numeric upgrades
        if (baseLastType === 'INT' && (baseNewType === 'NUMBER' || baseNewType === 'TIME')) {
            return true;
        }
        if (baseLastType === 'TIME' && baseNewType === 'NUMBER') {
            return true;
        }
        // special case for string upgrades
        var isShortOrLongStr = baseNewType === 'LONGSTR' || baseNewType === 'SHORTSTR';
        if (baseLastType === 'IDSTR' && (baseNewType === 'ACCOUNTIDSTR' || baseNewType === 'PERSONAIDSTR' || isShortOrLongStr)) {
            return true;
        }
        if (baseLastType === 'PERSONAIDSTR' && (baseNewType === 'IDSTR' || baseNewType === 'ACCOUNTIDSTR' || isShortOrLongStr)) {
            return true;
        }
        if (baseLastType === 'ACCOUNTIDSTR' && (baseNewType === 'IDSTR' || baseNewType === 'PERSONAIDSTR' || isShortOrLongStr)) {
            return true;
        }
        if (baseLastType === 'SHORTSTR' && baseNewType === 'LONGSTR') {
            return true;
        }
        return false;
    }
    if (Array.isArray(lastType) && Array.isArray(newType)) {
        if (lastType[0] !== newType[0]) {
            return false;
        }
        for (var i = 0; i < lastType.length; ++i) {
            if (newType.indexOf(lastType[i]) < 0) {
                return false;
            }
        }
        return true;
    }
    // check old fields
    for (var key in lastType) {
        if (!checkTypesBackwardsCompatible(newType[key], lastType[key])) {
            return false;
        }
    }
    // new fields are ok if they are nullable
    for (var key in newType) {
        if (lastType[key]) {
            continue;
        }
        if (typeof newType[key] !== 'string') {
            return false;
        }
        if (!isNullableTypeStr(newType[key])) {
            return false;
        }
    }
    return true;
}
exports.checkTypesBackwardsCompatible = checkTypesBackwardsCompatible;
function createEnum(enumName, values, nullable) {
    if (nullable === void 0) { nullable = false; }
    nullable = !!nullable;
    if (!Array.isArray(values)) {
        // convert object to array of values
        var obj = values;
        values = [];
        for (var key in obj) {
            values.push(obj[key]);
        }
    }
    var res = {
        _origType: null,
        _validateType: function (value, valType, futureFeed) {
            if (!exports.IDSTR._validateType(value, valType)) {
                return false;
            }
            if (values.indexOf(value) < 0 && !futureFeed) {
                return false;
            }
            return true;
        },
        _getDefaultValue: function () {
            return values[0];
        },
        _getDefaultValueNonNullable: function () {
            return values[0];
        },
        _hasCustomDefaultValue: true,
        _nullable: nullable,
        _autoIncrement: false,
        _sqlTypeName: 'ENUM',
        _caseInsensitive: false,
        _isEnum: true,
        _toSql: defaultToSql,
        _fromSql: defaultFromSql,
        toString: function () {
            return enumName;
        },
        toJSON: function () {
            var v = values.slice(0);
            if (res._nullable) {
                v.push('NULL');
            }
            return v;
        },
    };
    gTypes.push(res);
    return res;
}
exports.createEnum = createEnum;
function withDefaultValue(type, defaultValue) {
    if (!validateType(defaultValue, type)) {
        throw new Error('default value does not validate');
    }
    if (type._sqlTypeName === 'LONGSTR' || type._sqlTypeName === 'BINSTR') {
        throw new Error(type._sqlTypeName + ' does not support custom default values');
    }
    if (type._nullable) {
        throw new Error('NULLABLE types cannot have a custom default value, the default will be null');
    }
    return {
        _origType: type._origType || type,
        _validateType: type._validateType,
        _getDefaultValue: function () {
            return defaultValue;
        },
        _getDefaultValueNonNullable: function () {
            return defaultValue;
        },
        _hasCustomDefaultValue: true,
        _nullable: false,
        _autoIncrement: false,
        _maxStrLength: type._maxStrLength,
        _sqlTypeName: type._sqlTypeName,
        _caseInsensitive: type._caseInsensitive,
        _isEnum: type._isEnum,
        _toSql: type._toSql,
        _fromSql: type._fromSql,
        toString: type.toString,
        toJSON: type.toJSON,
    };
}
exports.withDefaultValue = withDefaultValue;
function withMaxStringLength(type, maxLength) {
    if (type._validateType !== validateString) {
        throw new Error('withMaxStringLength must be called with a string type');
    }
    if (!maxLength || maxLength <= 0 || (type._maxStrLength && maxLength >= type._maxStrLength)) {
        throw new Error('withMaxStringLength called with an invalid maxLength');
    }
    return {
        _origType: type._origType || type,
        _validateType: validateString,
        _getDefaultValue: type._getDefaultValue,
        _getDefaultValueNonNullable: type._getDefaultValueNonNullable,
        _hasCustomDefaultValue: type._hasCustomDefaultValue,
        _nullable: type._nullable,
        _autoIncrement: type._autoIncrement,
        _maxStrLength: maxLength,
        _sqlTypeName: type._sqlTypeName,
        _caseInsensitive: type._caseInsensitive,
        _isEnum: type._isEnum,
        _toSql: type._toSql,
        _fromSql: type._fromSql,
        toString: type.toString,
        toJSON: type.toJSON,
        truncate: truncateString,
    };
}
exports.withMaxStringLength = withMaxStringLength;
function isRegisteredType(type) {
    if (!isType(type)) {
        return false;
    }
    if (type && type._origType) {
        type = type._origType;
    }
    return gTypes.indexOf(type) >= 0;
}
exports.isRegisteredType = isRegisteredType;
