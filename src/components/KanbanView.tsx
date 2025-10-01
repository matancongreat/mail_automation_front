import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Calendar, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface KanbanViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onTaskClick: (task: Task) => void;
}

export const KanbanView = ({ tasks, onToggleTask, onTaskClick }: KanbanViewProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-orange-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const columns = [
    {
      id: "todo",
      title: "To Do",
      tasks: tasks.filter(task => !task.completed),
      bgColor: "bg-slate-50 dark:bg-slate-900/50"
    },
    {
      id: "completed",
      title: "Completed",
      tasks: tasks.filter(task => task.completed),
      bgColor: "bg-green-50 dark:bg-green-900/20"
    }
  ];

  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="min-w-80 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {column.tasks.length}
            </Badge>
          </div>
          
          <div className={cn("rounded-lg p-4 min-h-96", column.bgColor)}>
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card 
                  key={task.id} 
                  className="shadow-soft border-0 bg-card/80 backdrop-blur-ios transition-smooth hover:shadow-medium cursor-pointer group"
                  onClick={() => onTaskClick(task)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox
                            checked={task.completed}
                    onCheckedChange={() => onToggleTask(task.id)}
                    onClick={(e) => e.stopPropagation()}
                            className="mt-1 transition-bounce"
                          />
                          <h4 className={cn(
                            "font-semibold leading-tight text-sm flex-1",
                            task.completed && "line-through text-muted-foreground"
                          )}>
                            {task.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                            {task.priority}
                          </Badge>
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-32">{task.emailSubject}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          AI: {task.aiConfidence}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};