describe 'Cart Facade Test', ->
  CartFacade = undefined
  beforeEach module('app')
  beforeEach inject((_CartFacade_) ->
    CartFacade = _CartFacade_
    return
  )
  it 'can get an instance of my factory', inject((CartFacade) ->
    expect(CartFacade).toBeDefined()
  )
