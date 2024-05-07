import prisma from "@/lib/prisma";

describe('Interface Model', () => {
    test('should create a new interface', async () => {
        const newInterface = await prisma.interface.create({
        data: {
            query: 'Find user by ID',
            authorId: 'author123',
            code: 'SELECT * FROM users WHERE id = $1;',
        },
        });
        expect(newInterface).toHaveProperty('id');
        expect(newInterface.query).toBe('Find user by ID');
        expect(newInterface.code).toBe('SELECT * FROM users WHERE id = $1;');
    });
});
