import { getTaskCountsApi, getTaskTimeMetricsApi } from '@/api/dashboardData.api';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ClockIcon as ClockCountdown,
  Hourglass,
  ListChecks,
  Loader2,
  TimerReset,
  XCircle,
} from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    tasksCompleted: 0,
    tasksPending: 0,
    avgCompletionTime: 0,
    pendingTasks: 0,
    totalTimeLapsed: 0,
    totalTimeToFinish: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const taskCounts = await getTaskCountsApi();
        const timeMetrics = await getTaskTimeMetricsApi();

        setStats({
          totalTasks: taskCounts.totalTasks,
          tasksCompleted:
            taskCounts.totalTasks > 0
              ? (taskCounts.finishedTasks / taskCounts.totalTasks) * 100
              : 0,
          tasksPending:
            taskCounts.totalTasks > 0 ? (taskCounts.pendingTasks / taskCounts.totalTasks) * 100 : 0,
          avgCompletionTime:
            taskCounts.finishedTasks > 0
              ? timeMetrics.totalTimeTaken / taskCounts.finishedTasks
              : 0,
          pendingTasks: taskCounts.pendingTasks,
          totalTimeLapsed: timeMetrics.totalTimeLapsed,
          totalTimeToFinish: timeMetrics.totalRemainingTime,
        });
      } catch (err: unknown) {
        setError((err as Error).message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your task progress and performance metrics
          </p>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Summary</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: Just now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Tasks</CardDescription>
                <CardTitle className="text-4xl font-bold flex items-center gap-2">
                  {stats.totalTasks}
                  <ListChecks className="h-6 w-6 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">All tasks in your workspace</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tasks Completed</CardDescription>
                <CardTitle className="text-4xl font-bold text-green-500">
                  {stats.tasksCompleted.toFixed(1)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={stats.tasksCompleted} className="h-2 bg-muted" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    {Math.round((stats.totalTasks * stats.tasksCompleted) / 100)} of{' '}
                    {stats.totalTasks} tasks
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Tasks Pending</CardDescription>
                <CardTitle className="text-4xl font-bold text-amber-500">
                  {stats.tasksPending.toFixed(1)}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={stats.tasksPending} className="h-2 bg-muted" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Remaining</span>
                  <span className="flex items-center gap-1">
                    <Hourglass className="h-3 w-3 text-amber-500" />
                    {stats.pendingTasks} of {stats.totalTasks} tasks
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg Time Per Task</CardDescription>
                <CardTitle className="text-4xl font-bold text-purple-500">
                  {stats.avgCompletionTime.toFixed(2)}
                  <span className="text-lg ml-1">hrs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TimerReset className="h-4 w-4" />
                  <span>Average completion time</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Pending Task Summary</h2>
            <div className="text-sm font-medium text-primary">
              View all tasks
              <ArrowUpRight className="h-4 w-4 inline ml-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="pb-2">
                <CardDescription>Pending Tasks</CardDescription>
                <CardTitle className="text-4xl font-bold text-orange-500 flex items-center gap-2">
                  {stats.pendingTasks}
                  <Hourglass className="h-6 w-6 text-orange-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Tasks awaiting completion</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="pb-2">
                <CardDescription>Total Time Lapsed</CardDescription>
                <CardTitle className="text-4xl font-bold text-indigo-500">
                  {stats.totalTimeLapsed.toFixed(2)}
                  <span className="text-lg ml-1">hrs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Time spent on pending tasks</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="pb-2">
                <CardDescription>Total Time to Finish</CardDescription>
                <CardTitle className="text-4xl font-bold text-pink-500">
                  {stats.totalTimeToFinish.toFixed(2)}
                  <span className="text-lg ml-1">hrs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ClockCountdown className="h-4 w-4" />
                  <span>Estimated based on end time</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
