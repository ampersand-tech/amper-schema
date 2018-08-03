/**
 * Copyright 2015-present Ampersand Technologies, Inc.
 */

import { ARRAY_OF } from '../lib/objSchema';
import * as Types from '../lib/types';

import { expect } from 'chai';

const alphabet = '0123456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ';
export type Alphabet = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'j'|'k'|'m'|'n'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'|'x'|
  'y'|'z'|'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'J'|'K'|'M'|'N'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z';
export function numberToLetter(val): Alphabet {
  return alphabet[val % alphabet.length] as Alphabet;
}

function randStr(len) {
  let str = '';
  for (let i = 0; i < len; ++i) {
    str += numberToLetter(Math.floor(Math.random() * 1000));
  }
  return str;
}


describe('Types', function() {
  describe('validateType', function() {
    it('should validate strings', function() {
      expect(Types.validateType(null, Types.STRING)).to.equal(false);
      expect(Types.validateType(undefined, Types.STRING)).to.equal(false);
      expect(Types.validateType(0, Types.STRING)).to.equal(false);
      expect(Types.validateType({}, Types.STRING)).to.equal(false);
      expect(Types.validateType(42, Types.STRING)).to.equal(false);
      expect(Types.validateType(42.3, Types.STRING)).to.equal(false);
      expect(Types.validateType(false, Types.STRING)).to.equal(false);
      expect(Types.validateType(true, Types.STRING)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.STRING)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.STRING)).to.equal(false);
      expect(Types.validateType('', Types.STRING)).to.equal(true);
      expect(Types.validateType('abc', Types.STRING)).to.equal(true);
    });

    it('should validate nullable strings', function() {
      expect(Types.validateType(null, Types.STRING_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType(0, Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType({}, Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType(42, Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType(42.3, Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType(false, Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType(true, Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.STRING_NULLABLE)).to.equal(false);
      expect(Types.validateType('', Types.STRING_NULLABLE)).to.equal(true);
      expect(Types.validateType('abc', Types.STRING_NULLABLE)).to.equal(true);
    });

    it('should validate bools', function() {
      expect(Types.validateType(null, Types.BOOL)).to.equal(false);
      expect(Types.validateType(undefined, Types.BOOL)).to.equal(false);
      expect(Types.validateType(0, Types.BOOL)).to.equal(false);
      expect(Types.validateType({}, Types.BOOL)).to.equal(false);
      expect(Types.validateType(42, Types.BOOL)).to.equal(false);
      expect(Types.validateType(42.3, Types.BOOL)).to.equal(false);
      expect(Types.validateType(false, Types.BOOL)).to.equal(true);
      expect(Types.validateType(true, Types.BOOL)).to.equal(true);
      expect(Types.validateType(['hello', 'nope'], Types.BOOL)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.BOOL)).to.equal(false);
      expect(Types.validateType('', Types.BOOL)).to.equal(false);
      expect(Types.validateType('abc', Types.BOOL)).to.equal(false);
    });

    it('should validate nullable bools', function() {
      expect(Types.validateType(null, Types.BOOL_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType(0, Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType({}, Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType(42, Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType(42.3, Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType(false, Types.BOOL_NULLABLE)).to.equal(true);
      expect(Types.validateType(true, Types.BOOL_NULLABLE)).to.equal(true);
      expect(Types.validateType(['hello', 'nope'], Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType('', Types.BOOL_NULLABLE)).to.equal(false);
      expect(Types.validateType('abc', Types.BOOL_NULLABLE)).to.equal(false);
    });

    it('should validate ints', function() {
      expect(Types.validateType(null, Types.INT)).to.equal(false);
      expect(Types.validateType(undefined, Types.INT)).to.equal(false);
      expect(Types.validateType(0, Types.INT)).to.equal(true);
      expect(Types.validateType({}, Types.INT)).to.equal(false);
      expect(Types.validateType(42, Types.INT)).to.equal(true);
      expect(Types.validateType(42.3, Types.INT)).to.equal(false);
      expect(Types.validateType(1443140330237, Types.INT)).to.equal(false);
      expect(Types.validateType(false, Types.INT)).to.equal(false);
      expect(Types.validateType(true, Types.INT)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.INT)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.INT)).to.equal(false);
      expect(Types.validateType('', Types.INT)).to.equal(false);
      expect(Types.validateType('abc', Types.INT)).to.equal(false);
      expect(Types.validateType(NaN, Types.INT)).to.equal(false);
      expect(Types.validateType(Infinity, Types.INT)).to.equal(false);
    });

    it('should validate nullable ints', function() {
      expect(Types.validateType(null, Types.INT_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(0, Types.INT_NULLABLE)).to.equal(true);
      expect(Types.validateType({}, Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(42, Types.INT_NULLABLE)).to.equal(true);
      expect(Types.validateType(42.3, Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(1443140330237, Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(false, Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(true, Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType('', Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType('abc', Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(NaN, Types.INT_NULLABLE)).to.equal(false);
      expect(Types.validateType(Infinity, Types.INT_NULLABLE)).to.equal(false);
    });

    it('should validate auto_increment ints', function() {
      expect(Types.validateType(null, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(undefined, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(0, Types.INT_AUTO_INCREMENT)).to.equal(true);
      expect(Types.validateType({}, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(42, Types.INT_AUTO_INCREMENT)).to.equal(true);
      expect(Types.validateType(42.3, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(1443140330237, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(false, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(true, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType('', Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType('abc', Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(NaN, Types.INT_AUTO_INCREMENT)).to.equal(false);
      expect(Types.validateType(Infinity, Types.INT_AUTO_INCREMENT)).to.equal(false);
    });

    it('should validate numbers', function() {
      expect(Types.validateType(null, Types.NUMBER)).to.equal(false);
      expect(Types.validateType(undefined, Types.NUMBER)).to.equal(false);
      expect(Types.validateType(0, Types.NUMBER)).to.equal(true);
      expect(Types.validateType({}, Types.NUMBER)).to.equal(false);
      expect(Types.validateType(42, Types.NUMBER)).to.equal(true);
      expect(Types.validateType(42.3, Types.NUMBER)).to.equal(true);
      expect(Types.validateType(1443140330237, Types.NUMBER)).to.equal(true);
      expect(Types.validateType(false, Types.NUMBER)).to.equal(false);
      expect(Types.validateType(true, Types.NUMBER)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.NUMBER)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.NUMBER)).to.equal(false);
      expect(Types.validateType('', Types.NUMBER)).to.equal(false);
      expect(Types.validateType('abc', Types.NUMBER)).to.equal(false);
      expect(Types.validateType(NaN, Types.NUMBER)).to.equal(false);
      expect(Types.validateType(Infinity, Types.NUMBER)).to.equal(false);
    });

    it('should validate nullable numbers', function() {
      expect(Types.validateType(null, Types.NUMBER_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType(0, Types.NUMBER_NULLABLE)).to.equal(true);
      expect(Types.validateType({}, Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType(42, Types.NUMBER_NULLABLE)).to.equal(true);
      expect(Types.validateType(42.3, Types.NUMBER_NULLABLE)).to.equal(true);
      expect(Types.validateType(1443140330237, Types.NUMBER_NULLABLE)).to.equal(true);
      expect(Types.validateType(false, Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType(true, Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType('', Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType('abc', Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType(NaN, Types.NUMBER_NULLABLE)).to.equal(false);
      expect(Types.validateType(Infinity, Types.NUMBER_NULLABLE)).to.equal(false);
    });

    it('should validate times', function() {
      expect(Types.validateType(null, Types.TIME)).to.equal(false);
      expect(Types.validateType(undefined, Types.TIME)).to.equal(false);
      expect(Types.validateType(0, Types.TIME)).to.equal(true);
      expect(Types.validateType({}, Types.TIME)).to.equal(false);
      expect(Types.validateType(42, Types.TIME)).to.equal(true);
      expect(Types.validateType(42.3, Types.TIME)).to.equal(false);
      expect(Types.validateType(1443140330237, Types.TIME)).to.equal(true);
      expect(Types.validateType(false, Types.TIME)).to.equal(false);
      expect(Types.validateType(true, Types.TIME)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.TIME)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.TIME)).to.equal(false);
      expect(Types.validateType('', Types.TIME)).to.equal(false);
      expect(Types.validateType('abc', Types.TIME)).to.equal(false);
      expect(Types.validateType(NaN, Types.TIME)).to.equal(false);
      expect(Types.validateType(Infinity, Types.TIME)).to.equal(false);
    });

    it('should validate nullable times', function() {
      expect(Types.validateType(null, Types.TIME_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType(0, Types.TIME_NULLABLE)).to.equal(true);
      expect(Types.validateType({}, Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType(42, Types.TIME_NULLABLE)).to.equal(true);
      expect(Types.validateType(42.3, Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType(1443140330237, Types.TIME_NULLABLE)).to.equal(true);
      expect(Types.validateType(false, Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType(true, Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType('', Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType('abc', Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType(NaN, Types.TIME_NULLABLE)).to.equal(false);
      expect(Types.validateType(Infinity, Types.TIME_NULLABLE)).to.equal(false);
    });

    it('should validate objects', function() {
      expect(Types.validateType(null, Types.OBJECT)).to.equal(false);
      expect(Types.validateType(undefined, Types.OBJECT)).to.equal(false);
      expect(Types.validateType(0, Types.OBJECT)).to.equal(false);
      expect(Types.validateType({}, Types.OBJECT)).to.equal(true);
      expect(Types.validateType(42, Types.OBJECT)).to.equal(false);
      expect(Types.validateType(42.3, Types.OBJECT)).to.equal(false);
      expect(Types.validateType(false, Types.OBJECT)).to.equal(false);
      expect(Types.validateType(true, Types.OBJECT)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.OBJECT)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.OBJECT)).to.equal(false);
      expect(Types.validateType('', Types.OBJECT)).to.equal(false);
      expect(Types.validateType('abc', Types.OBJECT)).to.equal(false);
    });

    it('should validate nullable objects', function() {
      expect(Types.validateType(null, Types.OBJECT_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType(0, Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType({}, Types.OBJECT_NULLABLE)).to.equal(true);
      expect(Types.validateType(42, Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType(42.3, Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType(false, Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType(true, Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType(['hello', 'nope'], Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType([1, 'hi', 3], Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType('', Types.OBJECT_NULLABLE)).to.equal(false);
      expect(Types.validateType('abc', Types.OBJECT_NULLABLE)).to.equal(false);
    });

    it('should validate string arrays', function() {
      expect(Types.validateType(null, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType(undefined, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType(0, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType({}, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType(42, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType(42.3, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType(false, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType(true, Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType([], Types.STRING_ARRAY)).to.equal(true);
      expect(Types.validateType(['hello', 'nope'], Types.STRING_ARRAY)).to.equal(true);
      expect(Types.validateType([1, 'hi', 3], Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType('', Types.STRING_ARRAY)).to.equal(false);
      expect(Types.validateType('abc', Types.STRING_ARRAY)).to.equal(false);
    });

    it('should validate nullable string arrays', function() {
      expect(Types.validateType(null, Types.STRING_ARRAY_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType(0, Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType({}, Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType(42, Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType(42.3, Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType(false, Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType(true, Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType([], Types.STRING_ARRAY_NULLABLE)).to.equal(true);
      expect(Types.validateType(['hello', 'nope'], Types.STRING_ARRAY_NULLABLE)).to.equal(true);
      expect(Types.validateType([1, 'hi', 3], Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType('', Types.STRING_ARRAY_NULLABLE)).to.equal(false);
      expect(Types.validateType('abc', Types.STRING_ARRAY_NULLABLE)).to.equal(false);
    });

    it('should validate array enums', function() {
      let enumType = Types.createEnum('TestEnum', [ 'foo', 'bar' ]);
      expect('' + enumType).to.equal('TestEnum');
      expect(Types.validateType(null, enumType)).to.equal(false);
      expect(Types.validateType(undefined, enumType)).to.equal(false);
      expect(Types.validateType(1, enumType)).to.equal(false);
      expect(Types.validateType('foos', enumType)).to.equal(false);
      expect(Types.validateType('foo', enumType)).to.equal(true);
      expect(Types.validateType('bar', enumType)).to.equal(true);
    });

    it('should validate object enums', function() {
      let enumType = Types.createEnum('TestEnum', { grumble: 'foo', fumble: 'bar' });
      expect('' + enumType).to.equal('TestEnum');
      expect(Types.validateType(null, enumType)).to.equal(false);
      expect(Types.validateType(undefined, enumType)).to.equal(false);
      expect(Types.validateType(1, enumType)).to.equal(false);
      expect(Types.validateType('foos', enumType)).to.equal(false);
      expect(Types.validateType('foo', enumType)).to.equal(true);
      expect(Types.validateType('bar', enumType)).to.equal(true);
    });

    it('should validate nullable array enums', function() {
      let enumType = Types.createEnum('TestEnum', [ 'foo', 'bar' ], true);
      expect('' + enumType).to.equal('TestEnum');
      expect(Types.validateType(null, enumType)).to.equal(true);
      expect(Types.validateType(undefined, enumType)).to.equal(false);
      expect(Types.validateType(undefined, enumType, true)).to.equal(true);
      expect(Types.validateType(1, enumType)).to.equal(false);
      expect(Types.validateType('foos', enumType)).to.equal(false);
      expect(Types.validateType('foo', enumType)).to.equal(true);
      expect(Types.validateType('bar', enumType)).to.equal(true);
    });

    it('should validate subobjects', function() {
      let type: Types.Schema = {
        foo: Types.STRING,
        bar: {
          baz: Types.INT,
          booz: Types.BOOL_NULLABLE,
        },
      };

      expect(Types.validateType(null, type)).to.equal(false);
      expect(Types.validateType(undefined, type)).to.equal(false);
      expect(Types.validateType({}, type)).to.equal(false);
      expect(Types.validateType({foo: 'foo', bar: 2}, type)).to.equal(false);
      expect(Types.validateType({foo: 'foo', bar: {}}, type)).to.equal(false);
      expect(Types.validateType({foo: 'foo', bar: {baz: 3, booz: false}}, type)).to.equal(true);
      expect(Types.validateType({foo: 'foo', bar: {baz: 3, booz: 3}}, type)).to.equal(false);
      expect(Types.validateType({foo: 'foo', bar: {baz: 3}}, type)).to.equal(true);
      expect(Types.validateType({foo: 'foo', bar: {baz: 3, bazz: 3}}, type)).to.equal(false);

      let typeNullable: Types.Schema = {
        foo: {
          _nullable: true,
          bar: Types.STRING,
        },
      };

      expect(Types.validateType(null, typeNullable)).to.equal(false);
      expect(Types.validateType(undefined, typeNullable)).to.equal(false);
      expect(Types.validateType({}, typeNullable)).to.equal(true);
      expect(Types.validateType({someval: 1}, typeNullable)).to.equal(false);
      expect(Types.validateType({foo: {bar: 'bar'}}, typeNullable)).to.equal(true);
    });

    it('should validate subobjects with maps', function() {
      let type = {
        map: {
          _ids: {
            foo: Types.STRING,
            bar: Types.INT_NULLABLE,
          },
        },
      };

      expect(Types.validateType(null, type)).to.equal(false);
      expect(Types.validateType(undefined, type)).to.equal(false);
      expect(Types.validateType({}, type)).to.equal(false);
      expect(Types.validateType({map: {val1: {foo: 'foo', bar: 1}, val2: {foo: 'foo'}}}, type)).to.equal(true);
      expect(Types.validateType({map: {val1: {foo: 'foo', bar: {}}, val2: {foo: 'foo'}}}, type)).to.equal(false);
      expect(Types.validateType({map: {val1: {}, val2: {foo: 'foo'}}}, type)).to.equal(false);
      expect(Types.validateType({map: {val1: {foo: 'foo', extra: true}, val2: {foo: 'foo'}}}, type)).to.equal(false);
    });

    it('should validate string types', function() {
      let smallStr = randStr(5);
      let idStr = randStr(32);
      let mediumStr = randStr(191);
      let largeStr = randStr(200);
      let xlargeStr = randStr(1000000);

      let customSmallStrType = Types.withMaxStringLength(Types.IDSTR, 5);

      expect(Types.validateType(smallStr, Types.IDSTR)).to.equal(true);
      expect(Types.validateType(idStr, Types.IDSTR)).to.equal(true);
      expect(Types.validateType(mediumStr, Types.IDSTR)).to.equal(false);
      expect(Types.validateType(largeStr, Types.IDSTR)).to.equal(false);
      expect(Types.validateType(xlargeStr, Types.IDSTR)).to.equal(false);

      expect(Types.validateType(smallStr, Types.SHORTSTR)).to.equal(true);
      expect(Types.validateType(idStr, Types.SHORTSTR)).to.equal(true);
      expect(Types.validateType(mediumStr, Types.SHORTSTR)).to.equal(true);
      expect(Types.validateType(largeStr, Types.SHORTSTR)).to.equal(false);
      expect(Types.validateType(xlargeStr, Types.SHORTSTR)).to.equal(false);

      expect(Types.validateType(smallStr, Types.LONGSTR)).to.equal(true);
      expect(Types.validateType(idStr, Types.LONGSTR)).to.equal(true);
      expect(Types.validateType(mediumStr, Types.LONGSTR)).to.equal(true);
      expect(Types.validateType(largeStr, Types.LONGSTR)).to.equal(true);
      expect(Types.validateType(xlargeStr, Types.LONGSTR)).to.equal(true);

      expect(Types.validateType(smallStr, Types.STRING)).to.equal(true);
      expect(Types.validateType(idStr, Types.STRING)).to.equal(true);
      expect(Types.validateType(mediumStr, Types.STRING)).to.equal(true);
      expect(Types.validateType(largeStr, Types.STRING)).to.equal(true);
      expect(Types.validateType(xlargeStr, Types.STRING)).to.equal(true);

      expect(Types.validateType(smallStr, customSmallStrType)).to.equal(true);
      expect(Types.validateType(idStr, customSmallStrType)).to.equal(false);
      expect(Types.validateType(mediumStr, customSmallStrType)).to.equal(false);
      expect(Types.validateType(largeStr, customSmallStrType)).to.equal(false);
      expect(Types.validateType(xlargeStr, customSmallStrType)).to.equal(false);

      expect(Types.validateType('lowercase', Types.SHORTSTR_LOWERCASE)).to.equal(true);
      expect(Types.validateType('UpperCase', Types.SHORTSTR_LOWERCASE)).to.equal(false);

      expect(Types.validateType(null, Types.IDSTR)).to.equal(false);
      expect(Types.validateType(null, Types.SHORTSTR)).to.equal(false);
      expect(Types.validateType(null, Types.LONGSTR)).to.equal(false);
      expect(Types.validateType(null, Types.STRING)).to.equal(false);

      expect(Types.validateType(null, Types.IDSTR_NULLABLE)).to.equal(true);
      expect(Types.validateType(null, Types.SHORTSTR_NULLABLE)).to.equal(true);
      expect(Types.validateType(null, Types.LONGSTR_NULLABLE)).to.equal(true);
      expect(Types.validateType(null, Types.STRING_NULLABLE)).to.equal(true);
    });

    it('should validate arrays', function() {
      const schema = ARRAY_OF({
        foo: Types.SHORTSTR,
        bar: Types.NUMBER,
      });

      expect(Types.validateType([], schema)).to.equal(true);
      expect(Types.validateType({}, schema)).to.equal(false);
      expect(Types.validateType('hello', schema)).to.equal(false);
      expect(Types.validateType([
        { foo: 'hi', bar: 3 },
        { foo: 'bye', bar: 10 },
      ], schema)).to.equal(true);
      expect(Types.validateType([
        { foo: 'hi', bar: 3 },
        { foo: 'bye', bar: 10, baz: true },
      ], schema)).to.equal(false);
    });

    it('should validate JSON blobs', function() {
      expect(Types.validateType(null, Types.JSONBLOB)).to.equal(false);
      expect(Types.validateType(null, Types.JSONBLOB_NULLABLE)).to.equal(true);
      expect(Types.validateType(undefined, Types.JSONBLOB)).to.equal(false);
      expect(Types.validateType(undefined, Types.JSONBLOB_NULLABLE)).to.equal(false);
      expect(Types.validateType(undefined, Types.JSONBLOB, true)).to.equal(false);
      expect(Types.validateType(undefined, Types.JSONBLOB_NULLABLE, true)).to.equal(true);
      expect(Types.validateType(0, Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType({}, Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType({a: 0, b: 'no'}, Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType(47, Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType(19.1, Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType(false, Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType(true, Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType(['zim', 'zam'], Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType([23, 'skiddoo'], Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType('', Types.JSONBLOB)).to.equal(true);
      expect(Types.validateType('abc', Types.JSONBLOB)).to.equal(true);
    });
  });

  describe('checkTypesBackwardsCompatible', function() {
    it('should check for backwards compatible types', function() {
      expect(Types.checkTypesBackwardsCompatible(undefined, 'STRING')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('INT', 'STRING')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('STRING', 'STRING')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('STRING_NULLABLE', 'STRING')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('STRING', 'STRING_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('STRING_NULLABLE', 'STRING_NULLABLE')).to.equal(true);

      expect(Types.checkTypesBackwardsCompatible({ foo: 'STRING', bar: 'INT' }, 'OBJECT')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('OBJECT', { foo: 'STRING', bar: 'INT' })).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible({ foo: 'STRING', bar: {} }, { foo: 'STRING' })).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible({ foo: 'STRING', bar: 'INT' }, { foo: 'STRING' })).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible({ foo: 'STRING', bar: 'INT_NULLABLE' }, { foo: 'STRING' })).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible({ foo: 'STRING', bar: 'INT' }, { foo: 'STRING', bar: 'INT' })).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible({ foo: 'STRING', bar: 'TIME' }, { foo: 'STRING', bar: 'INT' })).to.equal(true);
    });

    it('should allow numeric upgrades', function() {
      // INT -> TIME -> NUMBER
      expect(Types.checkTypesBackwardsCompatible('INT', 'INT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('NUMBER', 'INT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME', 'INT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT_NULLABLE', 'INT_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('NUMBER_NULLABLE', 'INT_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME_NULLABLE', 'INT_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT_NULLABLE', 'INT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('NUMBER_NULLABLE', 'INT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME_NULLABLE', 'INT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT', 'INT_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER', 'INT_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('TIME', 'INT_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('INT_AUTO_INCREMENT', 'INT_AUTO_INCREMENT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT_AUTO_INCREMENT', 'INT')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT_AUTO_INCREMENT', 'INT_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('INT', 'INT_AUTO_INCREMENT')).to.equal(true);

      expect(Types.checkTypesBackwardsCompatible('INT', 'NUMBER')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER', 'NUMBER')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME', 'NUMBER')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('INT_NULLABLE', 'NUMBER_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER_NULLABLE', 'NUMBER_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME_NULLABLE', 'NUMBER_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('INT_NULLABLE', 'NUMBER')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER_NULLABLE', 'NUMBER')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME_NULLABLE', 'NUMBER')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('INT', 'NUMBER_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER', 'NUMBER_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('TIME', 'NUMBER_NULLABLE')).to.equal(false);

      expect(Types.checkTypesBackwardsCompatible('INT', 'TIME')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER', 'TIME')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME', 'TIME')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT_NULLABLE', 'TIME')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER_NULLABLE', 'TIME_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME_NULLABLE', 'TIME_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT_NULLABLE', 'TIME_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER_NULLABLE', 'TIME')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('TIME_NULLABLE', 'TIME')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('INT', 'TIME_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('NUMBER', 'TIME_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('TIME', 'TIME_NULLABLE')).to.equal(false);
    });

    it('should allow string upgrades', function() {
      // IDSTR -> SHORTSTR -> LONGSTR
      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'IDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'IDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'IDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'IDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'IDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'IDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'IDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'IDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'IDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'IDSTR_NULLABLE')).to.equal(false);

      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'ACCOUNTIDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'ACCOUNTIDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'ACCOUNTIDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'ACCOUNTIDSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'ACCOUNTIDSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'ACCOUNTIDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'ACCOUNTIDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'ACCOUNTIDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'ACCOUNTIDSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'ACCOUNTIDSTR_NULLABLE')).to.equal(false);

      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'LONGSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'LONGSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'LONGSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'LONGSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'LONGSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'LONGSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'LONGSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'LONGSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'LONGSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'LONGSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'LONGSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'LONGSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'LONGSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'LONGSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'LONGSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'LONGSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'LONGSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'LONGSTR_NULLABLE')).to.equal(false);

      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'SHORTSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'SHORTSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'SHORTSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'SHORTSTR_LOWERCASE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'SHORTSTR_LOWERCASE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'SHORTSTR_LOWERCASE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'SHORTSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'SHORTSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'SHORTSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'SHORTSTR')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'SHORTSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'SHORTSTR_NULLABLE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'SHORTSTR_LOWERCASE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'SHORTSTR_LOWERCASE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('IDSTR_NULLABLE', 'SHORTSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR_NULLABLE', 'SHORTSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'SHORTSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'SHORTSTR')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('IDSTR', 'SHORTSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('ACCOUNTIDSTR', 'SHORTSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR_NULLABLE', 'SHORTSTR_LOWERCASE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_NULLABLE', 'SHORTSTR_LOWERCASE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('LONGSTR', 'SHORTSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'SHORTSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR', 'SHORTSTR_LOWERCASE')).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'SHORTSTR_NULLABLE')).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible('SHORTSTR_LOWERCASE', 'SHORTSTR_LOWERCASE')).to.equal(true);
    });

    it('should allow enum upgrades', function() {
      expect(Types.createEnum('awesomeEnum', ['once', 'twice']).toJSON()).to.deep.equal(['once', 'twice']);
      expect(Types.createEnum('awesomeEnum', ['once', 'twice'], true).toJSON()).to.deep.equal(['once', 'twice', 'NULL']);

      expect(Types.checkTypesBackwardsCompatible(['once', 'twice'], ['once', 'twice'])).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible(['once', 'twice', 'three times'], ['once', 'twice'])).to.equal(true);
      expect(Types.checkTypesBackwardsCompatible(['twice', 'once', 'three times'], ['once', 'twice'])).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible(['once', 'twice'], ['once', 'twice', 'thrice'])).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible(['once'], ['once', 'twice'])).to.equal(false);
      expect(Types.checkTypesBackwardsCompatible(['once'], ['twice'])).to.equal(false);
    });
  });

  describe('truncate', function() {
    it('should truncate to valid IDSTR', function() {
      let str = randStr(1000);
      expect(Types.validateType(str, Types.IDSTR)).to.equal(false);
      expect(Types.validateType(Types.IDSTR.truncate(str), Types.IDSTR)).to.equal(true);
    });

    it('should truncate to valid SHORTSTR', function() {
      let str = randStr(1000);
      expect(Types.validateType(str, Types.SHORTSTR)).to.equal(false);
      expect(Types.validateType(Types.SHORTSTR.truncate(str), Types.SHORTSTR)).to.equal(true);
    });
  });

  describe('to/from sql', function() {
    it('should convert bools to/from sql', function() {
      expect(Types.BOOL._toSql(true)).to.equal(1);
      expect(Types.BOOL._toSql(false)).to.equal(0);
      expect(Types.BOOL._fromSql(1)).to.equal(true);
      expect(Types.BOOL._fromSql(30)).to.equal(true);
      expect(Types.BOOL._fromSql(0)).to.equal(false);
      expect(Types.BOOL_NULLABLE._fromSql(null as any)).to.equal(false);
    });
    it('should convert objects to/from sql using JSON', function() {
      let refObj = { a: 47, b: false, c: [23, 'skiddoo'], d: { x: 'hi', y: null , z: 19.1 }};
      let refStr = '{"a":47,"b":false,"c":[23,"skiddoo"],"d":{"x":"hi","y":null,"z":19.1}}';
      expect(Types.JSONBLOB._fromSql(refStr)).to.eql(refObj);
      expect(Types.JSONBLOB._toSql(refObj)).to.equal(refStr);
    });
  });
});
