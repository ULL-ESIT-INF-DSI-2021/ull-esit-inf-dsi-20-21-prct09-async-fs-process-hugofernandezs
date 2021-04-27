import 'mocha';
import {expect} from 'chai';
import {add} from '../src/index';

describe('Test vacío:', () => {
  it('Funcionamiento del test vacío', () => {
    expect(add(2, 3)).to.be.equal(5);
  });
},
);
