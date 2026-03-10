import React, { useState } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay
} from '@dnd-kit/core';
import { 
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Paperclip, User, MoreHorizontal, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

type Task = {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  deadline: string;
  assignee: string;
  attachments: number;
};

const initialTasks: Task[] = [
  { id: '1', title: 'Thiết kế giao diện Dashboard', status: 'todo', deadline: '2023-11-15', assignee: 'Nguyễn Văn A', attachments: 3 },
  { id: '2', title: 'Viết API cho User Auth', status: 'in_progress', deadline: '2023-11-10', assignee: 'Trần Thị B', attachments: 0 },
  { id: '3', title: 'Tối ưu hóa Database', status: 'done', deadline: '2023-11-05', assignee: 'Lê Văn C', attachments: 1 },
  { id: '4', title: 'Lên ý tưởng Marketing', status: 'todo', deadline: '2023-11-20', assignee: 'Phạm Thị D', attachments: 5 },
];

const columns = [
  { id: 'todo', title: 'Ý tưởng' },
  { id: 'in_progress', title: 'Đang thực hiện' },
  { id: 'done', title: 'Hoàn thành' },
];

const SortableTask: React.FC<{ task: Task }> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-slate-900 leading-tight group-hover:text-primary transition-colors">{task.title}</h4>
        <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-500 mt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{format(new Date(task.deadline), 'dd MMM', { locale: vi })}</span>
          </div>
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3.5 h-3.5 text-slate-400" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-[10px]" title={task.assignee}>
          {task.assignee.charAt(0)}
        </div>
      </div>
    </div>
  );
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    
    // Find containers
    const activeContainer = tasks.find(t => t.id === activeId)?.status;
    const overContainer = tasks.find(t => t.id === overId)?.status || overId;

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        let newIndex;
        if (isOverTask) {
          newIndex = overIndex >= 0 ? overIndex : tasks.length + 1;
        } else {
          newIndex = tasks.length + 1;
        }

        const newTasks = [...tasks];
        newTasks[activeIndex] = { ...newTasks[activeIndex], status: overContainer as any };
        return arrayMove(newTasks, activeIndex, newIndex);
      });
    } else {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((t) => t.id === activeId);
        const newIndex = tasks.findIndex((t) => t.id === overId);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';

    if (!isActiveTask) return;

    const activeContainer = tasks.find(t => t.id === activeId)?.status;
    const overContainer = tasks.find(t => t.id === overId)?.status || overId;

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      let newIndex;
      if (isOverTask) {
        newIndex = overIndex >= 0 ? overIndex : tasks.length + 1;
      } else {
        newIndex = tasks.length + 1;
      }

      const newTasks = [...tasks];
      newTasks[activeIndex] = { ...newTasks[activeIndex], status: overContainer as any };
      return arrayMove(newTasks, activeIndex, newIndex);
    });
  };

  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-[300px] glass rounded-3xl p-4 flex flex-col bg-slate-50/50">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                {col.title}
                <span className="bg-slate-200 text-slate-600 text-xs py-0.5 px-2 rounded-full">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </h3>
              <button className="text-slate-400 hover:text-primary transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <SortableContext 
                id={col.id}
                items={tasks.filter(t => t.status === col.id).map(t => t.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 min-h-[150px]">
                  {tasks.filter(t => t.status === col.id).map((task) => (
                    <SortableTask key={task.id} task={task} />
                  ))}
                </div>
              </SortableContext>
            </div>
          </div>
        ))}
      </div>
      
      <DragOverlay>
        {activeTask ? <SortableTask task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
