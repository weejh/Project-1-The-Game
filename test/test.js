/* global describe it */

import checkWinner from '../develop/lib/module'
import chai from 'chai'
const expect = chai.expect

describe('checkWinner', () => {
  it('should return the winner for a won game', () => {
    const column = '40'
    const player = 'one'
    const statusBoard = {10: 'one', 20: 'one', 30: 'one', 40: 'one'}
    expect(checkWinner(column, player, statusBoard)).to.equal(['30', '20', '10'], '40', true)
  })
})
