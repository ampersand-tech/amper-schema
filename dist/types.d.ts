/**
* Copyright 2015-present Ampersand Technologies, Inc.
*/
export declare const IDSTR_LENGTH = 65;
export declare const SHORTSTR_LENGTH = 191;
export type Basic = number | string | boolean;
export type ValidateFunc = (value: any, valType: any, futureFeed?: boolean) => boolean;
export interface Type {
    _origType: Type | null;
    _validateType: ValidateFunc;
    _getDefaultValue: () => any;
    _getDefaultValueNonNullable: () => any;
    _hasCustomDefaultValue: boolean;
    _nullable: boolean;
    _autoIncrement: boolean;
    _maxStrLength?: number;
    _sqlTypeName: string;
    _caseInsensitive: boolean;
    _isEnum: boolean;
    _toSql: (val: any) => Basic;
    _fromSql: (val: Basic) => any;
    toString: () => string;
    toJSON: () => string;
}
export interface TypeTruncatedString extends Type {
    truncate: (str: string) => string;
}
export declare function isType(leaf: Schema | null | undefined): leaf is Type;
export declare function isSchemaMapNode(leaf: Schema | null | undefined): leaf is SchemaMapNode;
export declare function isSchemaArrayNode(leaf: Schema | null | undefined): leaf is SchemaArrayNode;
export declare function isTypeMetaProperty(_node: Schema, key: string): _node is Schema;
export interface SchemaInternalNode {
    _nullable?: boolean;
    [subType: string]: (Schema | undefined | boolean);
}
export interface SchemaMapNode {
    _ids: SchemaInternalNode;
    _eachMember?: 1;
    _accountKeys?: 1;
    _personaKeys?: 1;
}
export interface SchemaArrayNode {
    _idxs: SchemaInternalNode;
}
export type Schema = SchemaMapNode | SchemaInternalNode | Type | SchemaArrayNode;
export declare function interfaceOf<T>(schema: {
    [k in keyof T]: any;
}): boolean;
declare function defaultToSql<T>(val: T): T;
declare function defaultFromSql<T>(val: T): T;
export declare const OBJECT: Type;
export declare const OBJECT_NULLABLE: Type;
export declare const ARRAY: Type;
export declare const ARRAY_NULLABLE: Type;
export declare const BOOL: Type;
export declare const BOOL_NULLABLE: Type;
export declare const NUMBER: Type;
export declare const NUMBER_NULLABLE: Type;
export declare const INT: Type;
export declare const INT_AUTO_INCREMENT: Type;
export declare const INT_NULLABLE: Type;
export declare const TIME: Type;
export declare const TIME_NULLABLE: Type;
export declare const TIME_TZ: Type;
export declare const TIME_TZ_NULLABLE: Type;
export declare const IDSTR: TypeTruncatedString;
export declare const IDSTR_NULLABLE: Type;
export declare const ACCOUNTIDSTR: TypeTruncatedString;
export declare const ACCOUNTIDSTR_NULLABLE: Type;
export declare const PERSONAIDSTR: TypeTruncatedString;
export declare const PERSONAIDSTR_NULLABLE: Type;
export declare const SHORTSTR: TypeTruncatedString;
export declare const SHORTSTR_NULLABLE: Type;
export declare const SHORTSTR_LOWERCASE: TypeTruncatedString;
export declare const SHORTSTR_LOWERCASE_NULLABLE: Type;
export declare const LONGSTR: Type;
export declare const LONGSTR_NULLABLE: Type;
export declare const BINSTR: Type;
export declare const BINSTR_NULLABLE: Type;
export declare const JSONBLOB: Type;
export declare const JSONBLOB_NULLABLE: Type;
export declare const STRING: Type;
export declare const STRING_NULLABLE: Type;
export declare const STRING_ARRAY: Type;
export declare const STRING_ARRAY_NULLABLE: Type;
export declare const FUNCTION: Type;
export declare const FUNCTION_NULLABLE: Type;
export declare function isNullable(type: Schema): boolean;
export declare function validateType(value: any, type: Schema, undefinedAllowedNullable?: boolean, futureFeed?: any): boolean;
export declare function checkTypesBackwardsCompatible(newType: any, lastType: any): boolean;
export declare function createEnum(enumName: string, values: any, nullable?: boolean): {
    _origType: null;
    _validateType: (value: any, valType: any, futureFeed?: any) => boolean;
    _getDefaultValue: () => any;
    _getDefaultValueNonNullable: () => any;
    _hasCustomDefaultValue: boolean;
    _nullable: boolean;
    _autoIncrement: boolean;
    _sqlTypeName: string;
    _caseInsensitive: boolean;
    _isEnum: boolean;
    _toSql: typeof defaultToSql;
    _fromSql: typeof defaultFromSql;
    toString: () => string;
    toJSON: () => any;
};
export declare function withDefaultValue(type: Type, defaultValue: any): {
    _origType: Type;
    _validateType: ValidateFunc;
    _getDefaultValue: () => any;
    _getDefaultValueNonNullable: () => any;
    _hasCustomDefaultValue: boolean;
    _nullable: boolean;
    _autoIncrement: boolean;
    _maxStrLength: number | undefined;
    _sqlTypeName: string;
    _caseInsensitive: boolean;
    _isEnum: boolean;
    _toSql: (val: any) => Basic;
    _fromSql: (val: Basic) => any;
    toString: () => string;
    toJSON: () => string;
};
export declare function withMaxStringLength(type: Type, maxLength: number): TypeTruncatedString;
export declare function isRegisteredType(type: Schema): boolean;
export {};
