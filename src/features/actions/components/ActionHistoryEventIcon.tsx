import type { SiraHistoryEventType } from '@/features/actions/interfaces/sira-action-api.interfaces';
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  MessageSquare,
  Plus,
  UserPlus,
  XCircle,
} from 'lucide-react';

interface ActionHistoryEventIconProps {
  eventType: SiraHistoryEventType;
}

export function ActionHistoryEventIcon({
  eventType,
}: ActionHistoryEventIconProps) {
  switch (eventType) {
    case 'CREATED':
      return <Plus className='h-4 w-4' />;
    case 'DUE_DATE_CHANGED':
      return <CalendarClock className='h-4 w-4' />;
    case 'RESPONSIBLE_CHANGED':
      return <UserPlus className='h-4 w-4' />;
    case 'OBSERVATION_ADDED':
      return <MessageSquare className='h-4 w-4' />;
    case 'CLOSURE_REQUESTED':
      return <Clock className='h-4 w-4' />;
    case 'CLOSURE_APPROVED':
    case 'ACCEPTED':
    case 'SIGNED':
      return <CheckCircle2 className='h-4 w-4' />;
    case 'CLOSURE_REJECTED':
      return <XCircle className='h-4 w-4' />;
    default:
      return <AlertTriangle className='h-4 w-4' />;
  }
}
