import request from 'supertest'
import server from '../../server'


describe('POST /api/products',()=>{
    it("should create a new product", async()=>{
        const response= await request(server).post('/api/products').send({
            name:"product test",
            price:20
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
    it("should return an error if it not pass the validation",async()=>{
        const response =await request(server).post("/api/products").send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty("data")
    })
})