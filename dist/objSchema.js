"use strict";
/**
 * Copyright 2015-present Ampersand Technologies, Inc.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Types = require("./types");
var JsonUtils = require("amper-utils/dist2017/jsonUtils");
var ObjUtils = require("amper-utils/dist2017/objUtils");
exports.VALIDATE_EXISTS = 0;
exports.VALIDATE_TYPES = 1;
exports.VALIDATE_ALL = 2;
exports.VALIDATE_ALL_AND_FILL_DEFAULTS = 3;
function MAP(shape) {
    return { _ids: shape };
}
exports.MAP = MAP;
function ARRAY_OF(shape) {
    return { _idxs: shape };
}
exports.ARRAY_OF = ARRAY_OF;
function descendSchema(schema, key) {
    if (!schema) {
        return undefined;
    }
    return schema._ids || schema._idxs || schema[key];
}
exports.descendSchema = descendSchema;
function validateSchema(schemaNode, path) {
    if (!ObjUtils.isObject(schemaNode) || Object.keys(schemaNode).length === 0) {
        throw new Error('schema error: for property "' + path + '" invalid node: ' + schemaNode);
    }
    else if (Types.isRegisteredType(schemaNode)) {
        // looks like a valid type.
        return;
    }
    for (var k in schemaNode) {
        // special field, skip
        if (k === '_nullable' || k === '_eachMember' || k === '_accountKeys' || k === '_personaKeys') {
            continue;
        }
        var s = schemaNode[k];
        var p = (path ? path + '/' : '') + k;
        validateSchema(s, p);
    }
}
exports.validateSchema = validateSchema;
function getDefaultValuesForSchema(schema, nonNullable) {
    if (nonNullable === void 0) { nonNullable = false; }
    if (!schema) {
        return undefined;
    }
    if (Types.isType(schema)) {
        if (schema._nullable && nonNullable) {
            return schema._getDefaultValueNonNullable();
        }
        return schema._getDefaultValue();
    }
    if (!Types.isSchemaMapNode(schema) && !Types.isSchemaArrayNode(schema) && schema._nullable && !nonNullable) {
        return null;
    }
    var val = Types.isSchemaArrayNode(schema) ? [] : {};
    if (!Types.isSchemaMapNode(schema) && !Types.isSchemaArrayNode(schema)) {
        for (var key in schema) {
            if (!Types.isTypeMetaProperty(schema, key)) {
                val[key] = getDefaultValuesForSchema(schema[key]);
            }
        }
    }
    return val;
}
exports.getDefaultValuesForSchema = getDefaultValuesForSchema;
function getSchemaForPath(rootSchema, keys) {
    var schema = rootSchema;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (Types.isSchemaMapNode(schema)) {
            schema = schema._ids;
        }
        else if (Types.isSchemaArrayNode(schema)) {
            schema = schema._idxs;
        }
        else if (schema[key] && typeof schema[key] === 'object') {
            schema = schema[key];
        }
        else {
            return null;
        }
    }
    return schema;
}
exports.getSchemaForPath = getSchemaForPath;
function validateFields(rootSchema, keys, fields, typeChecking, ignoredProps, tablesModified, disallowNewFields) {
    if (typeof typeChecking !== 'number') {
        return 'bad value for typeChecking param passed to validateFields';
    }
    var schema = getSchemaForPath(rootSchema, keys);
    if (!schema) {
        // this is no longer an error, allows feed to apply updates that are not in our schema yet (FutureFeed)
        return null; //'path does not exist in schema: ' + keys.join('/');
    }
    if (!fields) {
        if (typeChecking && !Types.isNullable(schema)) {
            return 'null value found for non-nullable path ' + keys.join('/');
        }
        return null;
    }
    var foundFields = [];
    for (var propName in fields) {
        if (propName[0] === '_') {
            // ignore _action and other "hidden" props
            continue;
        }
        if (ignoredProps && ignoredProps[propName] === 1) {
            continue;
        }
        var fieldValue = fields[propName];
        var fieldIsObject = fieldValue && ObjUtils.isObject(fieldValue);
        var fieldIsArray = fieldValue && Array.isArray(fieldValue);
        var subSchema = descendSchema(schema, propName);
        if ((fieldIsObject || fieldIsArray) && !Types.isType(subSchema)) {
            if (subSchema && subSchema._ids && !fieldIsObject) {
                return 'wrong type found at ' + keys.concat([propName]).join('/') + ' : ' + fieldValue + ' should be an object';
            }
            if (subSchema && subSchema._idxs && !fieldIsArray) {
                return 'wrong type found at ' + keys.concat([propName]).join('/') + ' : ' + fieldValue + ' should be an array';
            }
            var subKeys = keys.concat([propName]);
            var err = validateFields(rootSchema, subKeys, fieldValue, typeChecking, ignoredProps, tablesModified, disallowNewFields);
            if (err) {
                return err;
            }
            foundFields.push(propName);
        }
        else if (!subSchema) {
            // by default, this is no longer an error, allows feed to apply updates that are not in our schema yet (FutureFeed)
            if (disallowNewFields) {
                return 'path does not exist in schema: ' + keys.concat([propName]).join('/') + ' schema: ' + JsonUtils.safeStringify(schema)
                    + ' fields: ' + JsonUtils.safeStringify(fields);
            }
        }
        else if (typeChecking) {
            var desiredType = subSchema;
            if (!Types.validateType(fieldValue, desiredType, false, !disallowNewFields)) {
                return 'wrong type found at ' + keys.concat([propName]).join('/') + ' : ' + fieldValue + ' should be ' + desiredType;
            }
            foundFields.push(propName);
        }
    }
    if (typeChecking === exports.VALIDATE_ALL || typeChecking === exports.VALIDATE_ALL_AND_FILL_DEFAULTS) {
        for (var propName in schema) {
            if (propName[0] !== '_' && foundFields.indexOf(propName) < 0) {
                if (typeChecking === exports.VALIDATE_ALL_AND_FILL_DEFAULTS) {
                    // upgrading to new schema, fill in default values for new fields (PastFeed)
                    fields[propName] = getDefaultValuesForSchema(schema[propName]);
                    // mark table as modified so dbModify will write it back out to disk
                    if (tablesModified) {
                        tablesModified[keys[0]] = 1;
                    }
                }
                else {
                    return 'missing value for path: ' + keys.concat([propName]).join('/');
                }
            }
        }
    }
    return null;
}
exports.validateFields = validateFields;
