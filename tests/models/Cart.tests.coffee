describe 'Cart Test', ->
  Cart = undefined
  beforeEach module('app')
  beforeEach inject((_Cart_) ->
    Cart = _Cart_
    return
  )

  it 'creates cart itens', inject((Cart) ->
    cartResponse = {
      cart_items: [
        {
          name: "Bolsa item x"
          quantity: 1
          value: 10000
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        },
        {
          name: "outra bolsa"
          quantity: 1
          value: 10000
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        },
      ]
    }

    cart = new Cart(cartResponse)

    expect(Cart).toBeDefined()
    expect(cart.isNew()).toBeTruthy()
    expect(cart.getCartItens()[0].getName()).toEqual("Bolsa item x")
    expect(cart.getCartItens()[1].getCart()).toEqual(cart)
  )

  it 'delete cart item', inject((Cart) ->
    cartResponse = {
      cart_items: [
        {
          name: "Bolsa item x"
          quantity: 1
          value: 10000
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        },
        {
          name: "outra bolsa"
          quantity: 1
          value: 10000
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        },
      ]
    }

    cart = new Cart(cartResponse)
    # deleta o primeiro
    cart.deleteCartItem(cart.getCartItens()[0])

    expect(cart.getCartItens().length).toEqual(1);
    expect(cart.getCartItens()[0].getName()).toEqual("outra bolsa");
  )
