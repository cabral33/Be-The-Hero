const request = require('supertest')
const app = require('../../src/app')
const conection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await conection.migrate.rollback()
        await conection.migrate.latest()
    })

    afterAll(async () => {
        await conection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "NuCola",
            email: "contato@cont.com.br",
            whatsapp: "4700000000",
            city: "Manaus",
            uf: "AM"
        })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})