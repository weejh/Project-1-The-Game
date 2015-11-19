/* global describe it */

import checkWinner from '../develop/lib/module'
import chai from 'chai'
const expect = chai.expect

describe('checkWinner', () => {
  it('should return the winner for a won game', () => {
    const won = [
      {textContent: 'X'}, {textContent: 'X'}, {textContent: 'X'},
      {textContent: 'X'}, {textContent: 'X'}, {textContent: 'X'},
      {textContent: 'X'}, {textContent: 'X'}, {textContent: 'X'}
    ]
    expect(checkWinner(givenLoc, statusBoard, currentPlayer)).to.equal('X')
  })
  it('should return undefined if the game is still going', () => {
    const ongoing = [
      {textContent: ''}, {textContent: ''}, {textContent: ''},
      {textContent: ''}, {textContent: ''}, {textContent: ''},
      {textContent: ''}, {textContent: ''}, {textContent: ''}
    ]
    expect(findWinner(ongoing)).to.be.undefined
  })
})
