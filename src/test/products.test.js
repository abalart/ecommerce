import mongoose from "mongoose";
import chai from "chai";
import config from "../src/config/config.js";
import Product from "../src/DAO/mongo/products.mongo.js";


mongoose.connect(config.TEST_MONGO_URI);
const expect = chai.expect;

describe("Testing Products DAO", () => {
    before(function() {
        this.productsDao = new Product()
    })

    beforeEach(function() {
        mongoose.connection.collections.products.drop()
        this.timeout(5000)
    })

    it("Obtencion de productos en fomato de array", async function() {
        const result = await this.productsDao.get()
        expect(result).to.be.an("array")
    })

    it("Obtencion de los productos con paginación, utilizando las opciones que se mandan por parámetros", async function() {
        const result = await this.productsDao.getPaginate({categories: "Lacteos"}, {limit: 5, page: 2, sort: {}, lean: true})
        expect(result.docs).to.be.an("array")
        expect(result.limit).to.be.eql(5)
        expect(result.page).to.be.eql(2)
    })

    it("Creacion de un nuevo producto", async function() {
        const product = {
            title: "Queso1",
            description: "un queso",
            price: 300,
            stock: 10,
            categories: "Lacteos",
            thumbnails: [],
        }

        const result = await this.productsDao.create(product)
        expect(result._id).to.be.ok
    })

    it("Obtencion de un solo producto mediante el ID", async function() {
        const data = {
            title: "Queso1",
            description: "un queso",
            price: 300,
            stock: 10,
            categories: "Lacteos",
            thumbnails: [],        }

        const product = await this.productsDao.create(data)
        const result = await this.productsDao.getById(product._id)

        expect(result).to.be.ok.and.an("object")    
        expect(result._id).to.be.ok    
    })

    it("Modificacion de un producto", async function() {
        const data = {
            title: "Cerveza",
            description: "Cerveza Patagonia",
            price: 300,
            stock: 10,
            categories: "Bebidas",
            thumbnails: [],        }

        const newData = {
            title: "Cereza",
            stock: 15,
        }

        const product = await this.productsDao.create(data)
        const result = await this.productsDao.update(product._id, newData)
        const updatedProduct = await this.productsDao.getById(product._id)

        expect(result.modifiedCount).to.be.eql(1)
        expect(updatedProduct.title).to.be.eql(newData.title)
        expect(updatedProduct.stock).to.be.eql(newData.stock)
    })

    it("Eliminacion de un producto", async function() {
        const data = {
            title: "Queso1",
            description: "un queso",
            price: 300,
            stock: 10,
            categories: "Lacteos",
            thumbnails: [],        }

        const product = await this.productsDao.create(data)
        const result = await this.productsDao.delete(product._id)
        const deleted = await this.productsDao.getById(product._id)

        expect(result.deletedCount).to.be.eql(1)
        expect(deleted).to.be.eql(null)
    })
})