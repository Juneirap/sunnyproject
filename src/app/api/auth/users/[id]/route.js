// pages/api/users/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // รับ id จาก URL

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id, // ค้นหาผู้ใช้ตาม id
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
