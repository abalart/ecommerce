import { Product, Cart, User, Message } from '../DAO/factory.js'

import ProductRepository from './products.repository.js'
import UserRepository from './users.repository.js'
import MessageRepository from './messages.repository.js'
import CartRepository from './carts.repository.js'

export const ProductService = new ProductRepository(Product)
export const UserService = new UserRepository(User)
export const MessageService = new MessageRepository(Message)
export const CartService = new CartRepository(Cart)