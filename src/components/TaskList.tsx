import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Mail, Calendar, Clock, CheckCircle2, Circle, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanbanView } from "./KanbanView";
import { TaskDetailSheet } from "./TaskDetailSheet";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  emailSubject: string;
  completed: boolean;
  aiConfidence: number;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review quarterly budget proposal",
    description: "Analyze Q4 budget allocations and provide feedback to finance team",
    priority: "high",
    dueDate: "2024-01-15",
    emailSubject: "Q4 Budget Review Required - Finance Team",
    completed: false,
    aiConfidence: 95,
  },
  {
    id: "2",
    title: "Schedule team meeting",
    description: "Coordinate availability for next week's project kickoff meeting",
    priority: "medium",
    dueDate: "2024-01-12",
    emailSubject: "Project Kickoff - Need to Schedule",
    completed: false,
    aiConfidence: 88,
  },
  {
    id: "3",
    title: "Update project documentation",
    description: "Revise technical specs based on client feedback",
    priority: "medium",
    dueDate: "2024-01-18",
    emailSubject: "Client Feedback on Technical Specifications",
    completed: true,
    aiConfidence: 92,
  },
];

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);

  const toggleTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleCloseTaskDetail = () => {
    setIsTaskDetailOpen(false);
    setSelectedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-orange-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Tasks</h2>
          <Badge variant="secondary">
            {tasks.length} total
          </Badge>
        </div>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "kanban" | "list")}>
          <ToggleGroupItem value="kanban" aria-label="Kanban view">
            <LayoutGrid className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Render based on view mode */}
      {viewMode === "kanban" ? (
        <KanbanView 
          tasks={tasks} 
          onToggleTask={toggleTask}
          onTaskClick={handleTaskClick}
        />
      ) : (
        <div className="space-y-6">
          {/* Active Tasks */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Circle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Active Tasks</h2>
              <Badge variant="secondary" className="ml-auto">
                {activeTasks.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {activeTasks.map((task) => (
                <Card 
                  key={task.id} 
                  className="shadow-soft border-0 bg-card/80 backdrop-blur-ios transition-smooth hover:shadow-medium cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 transition-bounce"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={cn(
                            "font-semibold leading-tight",
                            task.completed && "line-through text-muted-foreground"
                          )}>
                            {task.title}
                          </h3>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-48">{task.emailSubject}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{task.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="font-medium">AI: {task.aiConfidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-bold">Completed</h2>
                <Badge variant="secondary" className="ml-auto">
                  {completedTasks.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {completedTasks.map((task) => (
              <Card 
                key={task.id} 
                className="shadow-soft border-0 bg-muted/50 backdrop-blur-ios opacity-75 cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold leading-tight line-through text-muted-foreground">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-48">{task.emailSubject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span>Completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Task Detail Sheet */}
      <TaskDetailSheet
        task={selectedTask}
        isOpen={isTaskDetailOpen}
        onClose={handleCloseTaskDetail}
        onToggleTask={toggleTask}
        onUpdateTask={updateTask}
      />
    </div>
  );
};