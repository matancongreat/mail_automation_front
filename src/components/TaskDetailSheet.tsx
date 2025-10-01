import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Calendar, Share2, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

interface TaskDetailSheetProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleTask: (taskId: string) => void;
  onUpdateTask: (task: Task) => void;
}

export const TaskDetailSheet = ({ task, isOpen, onClose, onToggleTask, onUpdateTask }: TaskDetailSheetProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [shareEmail, setShareEmail] = useState("");
  const [showShareInput, setShowShareInput] = useState(false);
  const { toast } = useToast();

  if (!task) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-orange-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    if (editedTask) {
      onUpdateTask(editedTask);
      setIsEditing(false);
      toast({
        title: "Task updated",
        description: "Your task has been successfully updated.",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(null);
  };

  const handleShare = () => {
    if (shareEmail) {
      toast({
        title: "Task shared",
        description: `Task shared with ${shareEmail}`,
      });
      setShareEmail("");
      setShowShareInput(false);
    }
  };

  const currentTask = editedTask || task;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="mt-1"
              />
              {isEditing ? (
                <Input
                  value={currentTask.title}
                  onChange={(e) => setEditedTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                  className="font-semibold text-lg border-0 p-0 h-auto"
                />
              ) : (
                <SheetTitle className={cn(
                  "text-left leading-tight",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </SheetTitle>
              )}
            </div>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Task Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Description</Label>
            {isEditing ? (
              <Textarea
                value={currentTask.description}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="min-h-24"
                placeholder="Task description..."
              />
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed p-3 bg-muted/50 rounded-md">
                {task.description}
              </p>
            )}
          </div>

          {/* Email Subject */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Original Email
            </Label>
            <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">
              {task.emailSubject}
            </p>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Due Date
            </Label>
            {isEditing ? (
              <Input
                type="date"
                value={currentTask.dueDate}
                onChange={(e) => setEditedTask(prev => prev ? { ...prev, dueDate: e.target.value } : null)}
              />
            ) : (
              <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">
                {task.dueDate}
              </p>
            )}
          </div>

          {/* AI Confidence */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">AI Confidence</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted/50 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${task.aiConfidence}%` }}
                />
              </div>
              <span className="text-sm font-medium">{task.aiConfidence}%</span>
            </div>
          </div>

          {/* Share Section */}
          {showShareInput && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Share with colleague</Label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                />
                <Button onClick={handleShare} size="sm">
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="flex flex-col gap-2">
          {isEditing ? (
            <div className="flex gap-2 w-full">
              <Button onClick={handleSave} className="flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 w-full">
                <Button onClick={handleEdit} variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  onClick={() => setShowShareInput(!showShareInput)} 
                  variant="outline" 
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              <Button variant="destructive" className="w-full" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};