import mongoose from "mongoose";
import Products from "../src/dao/DTO/products.dto"
import { assert } from "chai"
import config from './config/config.js'

//Conexion con la BD
mongoose.connect(config.mongoUrl, {dbName: config.dbName})

const assert = Assert.strict

describe('Testing producto',()=>{
    before(function(){
        this.Products = new Product()
    })
    beforeEach(function(){
        this.timeout(3000)
    })
})