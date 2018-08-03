/**
* Copyright 2015-present Ampersand Technologies, Inc.
*/

import * as ObjSchema from '../lib/objSchema';
import * as Types from '../lib/types';

import { expect } from 'chai';

const ENUM_TYPE = Types.createEnum('ENUM_TYPE', ['ONE', 'TWO']);

describe('objSchema', function() {
  const schema: Types.SchemaInternalNode = {
    account: {
      _nullable: true,
      address: Types.SHORTSTR_NULLABLE,
      announcementLastRead: Types.TIME,
      currentBookID: Types.IDSTR_NULLABLE,
      email: Types.SHORTSTR,
      friends: Types.STRING_ARRAY,
      id: Types.ACCOUNTIDSTR,
      name: Types.SHORTSTR,
      phone: Types.SHORTSTR_NULLABLE,
      pseudonym: Types.SHORTSTR_NULLABLE,
      tosTime: Types.TIME,
      tosVersion: Types.INT,
      gates: ObjSchema.MAP({
        value: Types.SHORTSTR,
      }),
      nestedA: ObjSchema.MAP({
        nestedB: Types.STRING,
      }),
    },
    drafts: ObjSchema.MAP({
      authors: {
        _eachMember: 1,
        _ids: {
          acceptedInvite: Types.withDefaultValue(Types.BOOL, true),
          invitedBy: Types.ACCOUNTIDSTR,
        },
      } as Types.SchemaMapNode, // tsc cannot infer this.  Normally, you use the SketchTable.EACH_MEMBER function.
      descriptor: Types.LONGSTR,
      description: Types.LONGSTR,
      editCount: Types.INT,
      publicEditCount: Types.INT_NULLABLE,
      privateEditCount: Types.INT_NULLABLE,
      publicDraftID: Types.IDSTR_NULLABLE,
      firstOpen: Types.BOOL,
      eTest: ENUM_TYPE,
      glossary: ObjSchema.MAP({
        word: Types.SHORTSTR,
        definition: Types.LONGSTR,
      }),
      id: Types.IDSTR,
    }),
  };

  const contextSchema = {
    obj: Types.OBJECT,
    num: Types.NUMBER,
    str: Types.LONGSTR,
  };

  it('should validate types', function() {
    expect(ObjSchema.validateFields(schema, ['account'], { address: null, cookie: 'bar' }, ObjSchema.VALIDATE_TYPES)).to.equal(null);
    expect(ObjSchema.validateFields(schema, ['account'], { address: '123' }, ObjSchema.VALIDATE_TYPES)).to.equal(null);
    expect(ObjSchema.validateFields(schema, ['account'], { friends: ['alice', 'bob'] }, ObjSchema.VALIDATE_TYPES)).to.equal(null);
    expect(ObjSchema.validateFields(schema, ['drafts', 'draft1'], { editCount: 123 }, ObjSchema.VALIDATE_TYPES)).to.equal(null);

    // these should error
    expect(ObjSchema.validateFields(schema, ['drafts', 'draft1'], { editCount: 123.1 }, ObjSchema.VALIDATE_TYPES)).to.not.equal(null);
    expect(ObjSchema.validateFields(schema, ['drafts', 'draft1'], { editCount: '123' }, ObjSchema.VALIDATE_TYPES)).to.not.equal(null);

    // VALIDATE_ALL vs VALIDATE_TYPES
    const draftObj = ObjSchema.getDefaultValuesForSchema(ObjSchema.getSchemaForPath(schema, ['drafts', 'a']));
    expect(ObjSchema.validateFields(schema, ['drafts'], {}, ObjSchema.VALIDATE_ALL)).to.equal(null);
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: {} }, ObjSchema.VALIDATE_ALL)).to.not.equal(null);
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: draftObj }, ObjSchema.VALIDATE_ALL)).to.equal(null);

    draftObj.glossary.b = {};
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: draftObj }, ObjSchema.VALIDATE_ALL)).to.not.equal(null);
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: draftObj }, ObjSchema.VALIDATE_TYPES)).to.equal(null);

    draftObj.glossary.b.word = 'bird';
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: draftObj }, ObjSchema.VALIDATE_TYPES)).to.equal(null);
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: draftObj }, ObjSchema.VALIDATE_ALL)).to.not.equal(null);
  });

  it('FutureFeed', function() {
    // FutureFeed allows fields not in the schema
    expect(ObjSchema.validateFields(schema, ['account'], { superAwesomeNewField: 'yowza' }, ObjSchema.VALIDATE_TYPES)).to.equal(null);
    expect(ObjSchema.validateFields(schema, ['foobars'], { editCount: '123' }, ObjSchema.VALIDATE_TYPES)).to.equal(null);

    const draftObj = ObjSchema.getDefaultValuesForSchema(ObjSchema.getSchemaForPath(schema, ['drafts', 'a']));
    draftObj.eTest = 'THREE';
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: draftObj }, ObjSchema.VALIDATE_ALL)).to.equal(null);
  });

  it('disallowNewFields', function() {
    // for non-futurefeed supporting schemas, should error
    expect(
      ObjSchema.validateFields(schema, ['account'], { superAwesomeNewField: 'yowza' }, ObjSchema.VALIDATE_ALL, undefined, undefined, true),
    ).to.not.equal(null);

    const data = { account: { nestedA: {key: 'yowza'} } };
    expect(
      ObjSchema.validateFields(schema, [], data, ObjSchema.VALIDATE_ALL_AND_FILL_DEFAULTS, undefined, undefined, true),
    ).to.not.equal(null);

    const draftObj = ObjSchema.getDefaultValuesForSchema(ObjSchema.getSchemaForPath(schema, ['drafts', 'a']));
    draftObj.eTest = 'THREE';
    expect(ObjSchema.validateFields(schema, ['drafts'], { a: draftObj }, ObjSchema.VALIDATE_ALL, undefined, undefined, true)).to.not.equal(null);

    const context = {
      obj: {
        foo: 1,
        bar: 'bro',
      },
      num: 45,
    };
    expect(
      ObjSchema.validateFields(contextSchema, [], context, ObjSchema.VALIDATE_ALL, undefined, undefined, true),
    ).to.equal('missing value for path: str');

    expect(ObjSchema.validateFields(contextSchema, [], context, ObjSchema.VALIDATE_ALL_AND_FILL_DEFAULTS, undefined, undefined, true)).to.equal(null);
    expect(context).property('str').to.equal('');
  });

  it('PastFeed', function() {
    const tablesModified = {};
    const tableData = {
      address: null,
      announcementLastRead: 10,
    };
    const err = ObjSchema.validateFields(schema, ['account'], tableData, ObjSchema.VALIDATE_ALL_AND_FILL_DEFAULTS, undefined, tablesModified);
    expect(err).to.equal(null);
    expect(tablesModified).to.deep.equal({
      account: 1,
    });
    expect(tableData).to.deep.equal({
      address: null,
      announcementLastRead: 10,
      currentBookID: null,
      email: '',
      gates: {},
      nestedA: {},
      friends: [],
      id: '',
      name: '',
      phone: null,
      pseudonym: null,
      tosTime: 0,
      tosVersion: 0,
    });
  });

  it('should validate arrays', function() {
    const arraySchema = {
      arr: ObjSchema.ARRAY_OF({
        foo: Types.SHORTSTR,
        bar: Types.NUMBER,
      }),
    };

    debugger;
    expect(ObjSchema.validateFields(arraySchema, [], { arr: [] }, ObjSchema.VALIDATE_ALL, null, null, true)).to.equal(null);
    expect(ObjSchema.validateFields(arraySchema, [], { arr: {} }, ObjSchema.VALIDATE_ALL, null, null, true)).to.be.a('string');
    expect(ObjSchema.validateFields(arraySchema, [], { arr: null }, ObjSchema.VALIDATE_ALL, null, null, true)).to.be.a('string');

    expect(ObjSchema.validateFields(arraySchema, [], { arr: [
      { foo: 'hi', bar: 3 },
      { foo: 'bye', bar: 10 },
    ] }, ObjSchema.VALIDATE_ALL, null, null, true)).to.equal(null);
    expect(ObjSchema.validateFields(arraySchema, [], { arr: [
      { foo: 'hi', bar: 3 },
      { foo: 'bye', bar: 10, baz: true },
    ] }, ObjSchema.VALIDATE_ALL, null, null, true)).to.be.a('string');
  });
});
