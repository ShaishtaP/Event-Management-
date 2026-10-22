import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  UserCheck, 
  Loader2 
} from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateHelpers';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredCount: number;
  status: 'pending' | 'approved' | 'rejected';
  isPublic: boolean;
  organizerId: string;
  organizerName: string;
  createdAt: string;
}

interface EventCardProps {
  event: Event;
  showActions?: boolean;
  showAdminActions?: boolean;
  showRegistration?: boolean;
  isRegistered?: boolean;
  isRegistrationLoading?: boolean;
  isUnregistrationLoading?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRegister?: (id: string) => void;
  onUnregister?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  showActions = false,
  showAdminActions = false,
  showRegistration = false,
  isRegistered = false,
  isRegistrationLoading = false,
  isUnregistrationLoading = false,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onRegister,
  onUnregister,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending Review</Badge>;
      default:
        return null;
    }
  };

  const isEventFull = event.registeredCount >= event.capacity;
  const availableSpots = Math.max(0, event.capacity - event.registeredCount);
  const percentFilled = Math.min(100, Math.round((event.registeredCount / (event.capacity || 1)) * 100));
  const isLoading = isRegistrationLoading || isUnregistrationLoading;

  // Check if event is in the past
  const eventDateTime = new Date(`${event.date} ${event.time}`);
  const isPastEvent = !isNaN(eventDateTime.getTime()) && eventDateTime < new Date();

  return (
    <Card className="apple-card flex flex-col justify-between overflow-hidden group">
      <div>
        <CardHeader className="pb-3 space-y-2">
          <div className="flex justify-between items-start gap-3">
            <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 tracking-tight group-hover:text-primary transition-colors">
              {event.title}
            </CardTitle>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {getStatusBadge(event.status)}
              {event.isPublic && (
                <Badge variant="secondary" className="text-[10px] py-0">
                  Public
                </Badge>
              )}
              {isPastEvent && (
                <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground">
                  Past Event
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-2 text-xs text-muted-foreground bg-black/[0.02] dark:bg-white/[0.02] p-3 rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary shrink-0" />
                <span className="truncate">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-primary shrink-0" />
                <span className="truncate">{formatTime(event.time)}</span>
              </div>
            </div>
            <div className="flex items-center pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary shrink-0" />
              <span className="truncate font-medium text-foreground">{event.location}</span>
            </div>
          </div>

          {/* Attendance Capacity Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center">
                <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {event.registeredCount} / {event.capacity} registered
              </span>
              {!isPastEvent && (
                <span>
                  {availableSpots > 0 && !isEventFull ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {availableSpots} spots left
                    </span>
                  ) : isEventFull ? (
                    <span className="text-danger font-medium">Full</span>
                  ) : null}
                </span>
              )}
            </div>
            <div className="h-1.5 w-full bg-black/[0.06] dark:bg-white/[0.08] rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  isEventFull ? 'bg-danger' : percentFilled > 80 ? 'bg-amber-500' : 'bg-primary'
                }`}
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground flex items-center justify-between pt-1">
            <span>By <span className="font-medium text-foreground">{event.organizerName}</span></span>
          </div>

          {/* Registration Status Banner */}
          {isRegistered && (
            <div className="flex items-center text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
              <UserCheck className="h-4 w-4 mr-1.5 shrink-0" />
              <span>You are registered for this event</span>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="pt-3 pb-4 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="flex flex-wrap gap-2 w-full">
          {/* Organizer Actions */}
          {showActions && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(event)}
                className="flex-1 rounded-xl"
                disabled={isLoading}
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.(event.id)}
                className="flex-1 rounded-xl hover:bg-danger/10 hover:text-danger hover:border-danger/30"
                disabled={isLoading}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>
            </>
          )}

          {/* Admin Actions */}
          {showAdminActions && event.status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onApprove?.(event.id)}
                className="flex-1 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-600 hover:border-emerald-500/30 font-medium"
                disabled={isLoading}
              >
                <Check className="h-3.5 w-3.5 mr-1.5" />
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReject?.(event.id)}
                className="flex-1 rounded-xl hover:bg-danger/10 hover:text-danger hover:border-danger/30 font-medium"
                disabled={isLoading}
              >
                <X className="h-3.5 w-3.5 mr-1.5" />
                Reject
              </Button>
            </>
          )}

          {/* Student Registration Actions */}
          {showRegistration && event.status === 'approved' && !isPastEvent && (
            <>
              {isRegistered ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUnregister?.(event.id)}
                  className="w-full rounded-xl hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/30"
                  disabled={isUnregistrationLoading}
                >
                  {isUnregistrationLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-3.5 w-3.5 mr-1.5" />
                      Cancel Registration
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => onRegister?.(event.id)}
                  disabled={isEventFull || isRegistrationLoading}
                  className="w-full rounded-xl shadow-sm"
                >
                  {isRegistrationLoading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Users className="h-3.5 w-3.5 mr-1.5" />
                      {isEventFull ? 'Event Full' : 'Register Now'}
                    </>
                  )}
                </Button>
              )}
            </>
          )}

          {/* Past Event Message */}
          {showRegistration && isPastEvent && (
            <div className="w-full text-center py-1.5 text-xs text-muted-foreground font-medium">
              Event Concluded
            </div>
          )}

          {/* Registered state indicator */}
          {!showRegistration && !showActions && !showAdminActions && isRegistered && (
            <div className="w-full text-center py-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center justify-center">
              <Check className="h-3.5 w-3.5 mr-1" /> Registered
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
