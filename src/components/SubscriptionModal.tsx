
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { subscribe } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      await subscribe();
      toast({
        title: 'Welcome to Premium!',
        description: 'You now have access to all premium features.',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Subscription Error',
        description: 'Failed to process subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Multi-week meal plans (1-4 weeks)',
    'Tweak and customize any meal',
    'Smart grocery list integration',
    'Advanced nutrition tracking',
    'Meal feedback and rating system',
    'Priority customer support',
    'Export meal plans to PDF',
    'Family meal planning tools'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-purple-500" />
              Upgrade to Premium
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Zap className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </CardTitle>
            <div className="space-y-2">
              <div className="text-3xl font-bold">$9.99</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isLoading ? 'Processing...' : 'Start Premium Trial'}
            </Button>
            
            <div className="text-xs text-center text-gray-500">
              7-day free trial • Cancel anytime • No commitment
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
