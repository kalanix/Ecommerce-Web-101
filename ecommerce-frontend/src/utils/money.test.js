import {it, expect, describe} from 'vitest' // it means create a test / expect check if the result is corect / describe is use to group tests(unit test) to suite test
import formatMoney from './money'

describe('formatMoney',()=>{
    it('formatMoney 1999 cents as $19.99',()=>{
    expect(formatMoney(1999)).toBe('$19.99');
})

it('display 2 decimals',()=>{
    expect(formatMoney(1090)).toBe('$10.90')
    expect(formatMoney(100)).toBe('$1.00')
})
})

