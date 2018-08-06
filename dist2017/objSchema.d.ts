/**
 * Copyright 2015-present Ampersand Technologies, Inc.
 */
import * as Types from './types';
import { StashOf } from 'amper-utils/dist2017/types';
export declare const VALIDATE_EXISTS = 0;
export declare const VALIDATE_TYPES = 1;
export declare const VALIDATE_ALL = 2;
export declare const VALIDATE_ALL_AND_FILL_DEFAULTS = 3;
export declare function MAP<T>(shape: T): {
    _ids: T;
};
export declare function ARRAY_OF<T>(shape: T): {
    _idxs: T;
};
export declare function descendSchema(schema: any, key: any): any;
export declare function validateSchema(schemaNode: Types.Schema, path?: string): void;
export declare function getDefaultValuesForSchema(schema: Types.Schema | null, nonNullable?: boolean): any;
export declare function getSchemaForPath(rootSchema: Types.Schema, keys: string[]): Types.Schema | null;
export declare function validateFields(rootSchema: Types.Schema, keys: string[], fields: any, typeChecking: number, ignoredProps?: StashOf<number> | null, tablesModified?: StashOf<number> | null, disallowNewFields?: boolean): any;
