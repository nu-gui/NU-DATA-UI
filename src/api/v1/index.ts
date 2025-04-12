import express from 'express';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import listsRoutes from './routes/lists.routes';
import enrichmentRoutes from './routes/enrichment.routes';
import dataGroupsRoutes from './routes/data-groups.routes';
import connectionsRoutes from './routes/connections.routes';
import exportRoutes from './routes/export.routes';
import accessControlRoutes from './routes/access-control.routes';
import searchRoutes from './routes/search.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/lists', listsRoutes);
router.use('/enrichment-plans', enrichmentRoutes);
router.use('/data-groups', dataGroupsRoutes);
router.use('/connections', connectionsRoutes);
router.use('/export', exportRoutes);
router.use('/blacklist', accessControlRoutes.blacklistRouter);
router.use('/whitelist', accessControlRoutes.whitelistRouter);
router.use('/search', searchRoutes);

export default router;
