import chai from 'chai';
import countWords from './index';

chai.should();

describe('countWords', () => {
  it('should count number of same word', () => {
    const sample = 'Hello Hello Hello hello ok from sample';

    const expectation = {
      hello: 4,
      from: 1,
      sample: 1,
    };

    const result = countWords(sample);

    result.should.be.deep.equal(expectation);
  });

  it('should count number of same word with case insensitive', () => {
    const sample = 'Hello Hello Hello hello ok from sample';

    const expectation = {
      Hello: 3,
      hello: 1,
      from: 1,
      sample: 1,
    };

    const result = countWords(sample, { caseSensitive: true });

    result.should.be.deep.equal(expectation);
  });

  it('should count number of same word with at least 5 characters', () => {
    const sample = 'Hello Hello Hello hello ok from sample';

    const expectation = {
      hello: 4,
      sample: 1,
    };

    const result = countWords(sample, { minLength: 4 });

    result.should.be.deep.equal(expectation);
  });

  it('should count number of same word with padding space', () => {
    const sample = '    Hello Hello Hello        hello ok from sample        ';

    const expectation = {
      hello: 4,
      from: 1,
      sample: 1,
    };

    const result = countWords(sample);

    result.should.be.deep.equal(expectation);
  });

  it('should count number of same word with new line', () => {
    const sample = `Hello
    Hello Hello
    hello ok
    from sample`;

    const expectation = {
      hello: 4,
      from: 1,
      sample: 1,
    };

    const result = countWords(sample);

    result.should.be.deep.equal(expectation);
  });

  it('should count number of same word from empty string', () => {
    const sample = '     ';

    const expectation = {};
    const result = countWords(sample);

    result.should.be.deep.equal(expectation);
  });

  it('should count number with custom predicate', () => {
    const sample = 'Hello Hello Hello hello ok from sample';
    const isNotHello = x => x !== 'hello';

    const expectation = {
      from: 1,
      sample: 1,
    };

    const result = countWords(sample, { predicates: [isNotHello] });

    result.should.be.deep.equal(expectation);
  });
});
