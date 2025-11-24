const RomanConverter = require('../api/RomanConverter');

// Simulamos el entorno de Vercel
describe('API Endpoints', () => {
    // Simulamos la función handler
    const handler = require('../api/romanos');

    test('GET /api/romanos?numero=X should return 10', async () => {
        const mockReq = {
            method: 'GET',
            query: { numero: 'X' }
        };
        
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn()
        };

        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            resultado: 10,
            entrada: 'X',
            conversion: 'romano_a_arabigo'
        });
    });

    test('POST /api/romanos with arabigo_a_romano', async () => {
        const mockReq = {
            method: 'POST',
            body: { numero: 10, tipo: 'arabigo_a_romano' }
        };
        
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn()
        };

        await handler(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            resultado: 'X',
            entrada: 10,
            conversion: 'arabigo_a_romano'
        });
    });
});