import { Router, Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../database';
import { authMiddleware, AuthRequest, requireStaff } from '../middleware/auth';

const router = Router();

const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional().default(''),
});

const createMenuItemSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional().default(''),
  price: z.number().nonnegative(),
  categoryId: z.number().int().positive(),
  imageUrl: z.string().max(500).optional().default(''),
  isAvailable: z.boolean().optional().default(true),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// GET /api/categories/
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('[Menu] Error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/categories/ (authenticated)
router.post('/categories', authMiddleware, requireStaff, async (req: AuthRequest, res: Response) => {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body', code: 'validation_error', issues: parsed.error.issues });
  }
  try {
    const category = await prisma.category.create({
      data: parsed.data,
    });
    res.status(201).json(category);
  } catch (error) {
    console.error('[Menu] Error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// GET /api/menu-items/
router.get('/menu-items', async (req: Request, res: Response) => {
  try {
    const categoryIdParam = req.query.categoryId;
    const where: { categoryId?: number } = {};
    if (categoryIdParam !== undefined) {
      const parsedId = z.coerce.number().int().positive().safeParse(categoryIdParam);
      if (!parsedId.success) {
        return res.status(400).json({ error: 'Invalid categoryId', code: 'validation_error', issues: parsedId.error.issues });
      }
      where.categoryId = parsedId.data;
    }

    const menuItems = await prisma.menuItem.findMany({
      where,
      include: { category: true },
      orderBy: [{ categoryId: 'asc' }, { name: 'asc' }],
    });
    res.json(menuItems);
  } catch (error) {
    console.error('[Menu] Error:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// GET /api/menu-items/:id
router.get('/menu-items/:id', async (req: Request, res: Response) => {
  const parsedParams = idParamSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return res.status(400).json({ error: 'Invalid id', code: 'validation_error', issues: parsedParams.error.issues });
  }
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parsedParams.data.id },
      include: { category: true },
    });
    if (!menuItem) {
      return res.status(404).json({ error: 'MenuItem not found' });
    }
    res.json(menuItem);
  } catch (error) {
    console.error('[Menu] Error:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// POST /api/menu-items/ (authenticated)
router.post('/menu-items', authMiddleware, requireStaff, async (req: AuthRequest, res: Response) => {
  const parsed = createMenuItemSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid body', code: 'validation_error', issues: parsed.error.issues });
  }
  try {
    const category = await prisma.category.findUnique({ where: { id: parsed.data.categoryId } });
    if (!category) {
      return res.status(400).json({ error: 'Invalid categoryId', code: 'validation_error' });
    }
    const menuItem = await prisma.menuItem.create({
      data: parsed.data,
      include: { category: true },
    });
    res.status(201).json(menuItem);
  } catch (error) {
    console.error('[Menu] Error:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

export default router;