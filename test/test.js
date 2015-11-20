/* global describe it */

import checkWinner from '../develop/lib/module'
import chai from 'chai'
const expect = chai.expect

describe('checkWinner', () => {
  it('should return the winner for a won game', () => {
    const column = '30'
    const player = 'one'
    const statusBoard = {
      '00': 'one',
      '10': 'one',
      '20': 'one',
      '30': 'one'
    }
    expect(checkWinner(column, player, statusBoard)).to.equal([['20', '10', '00'], '30', true])
  })
})
