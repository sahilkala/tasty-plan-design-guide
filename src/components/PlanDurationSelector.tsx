
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PlanDurationSelectorProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

export const PlanDurationSelector = ({ selectedDuration, onDurationChange }: PlanDurationSelectorProps) => {
  const { user } = useAuth();
  
  const durations = [
    { weeks: 1, label: '1 Week', description: 'Perfect for trying out', available: true },
    { weeks: 2, label: '2 Weeks', description: 'Build healthy habits', available: user?.isSubscribed || false },
    { weeks: 3, label: '3 Weeks', description: 'Establish routines', available: user?.isSubscribed || false },
    { weeks: 4, label: '4 Weeks', description: 'Complete transformation', available: user?.isSubscribed || false },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Choose Plan Duration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {durations.map((duration) => (
            <Card
              key={duration.weeks}
              className={`cursor-pointer transition-all duration-200 ${
                selectedDuration === duration.weeks
                  ? 'border-2 border-orange-500 bg-orange-50'
                  : duration.available
                  ? 'border hover:border-orange-300 hover:shadow-md'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
              onClick={() => duration.available && onDurationChange(duration.weeks)}
            >
              <CardContent className="p-4 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-semibold">{duration.label}</h3>
                    {!duration.available && (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{duration.description}</p>
                  {!duration.available && (
                    <Badge variant="secondary" className="text-xs">
                      Premium Only
                    </Badge>
                  )}
                  {selectedDuration === duration.weeks && (
                    <Badge className="bg-orange-500 text-white">
                      Selected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
