
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Lock, Zap } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { SubscriptionModal } from './SubscriptionModal';

interface UserStateHandlerProps {
  children: React.ReactNode;
  requiredState?: 'visitor' | 'signed-up' | 'subscribed';
  feature?: string;
}

export const UserStateHandler = ({ 
  children, 
  requiredState = 'visitor',
  feature 
}: UserStateHandlerProps) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Determine current user state
  const getUserState = () => {
    if (!user) return 'visitor';
    if (!user.isSubscribed) return 'signed-up';
    return 'subscribed';
  };

  const currentState = getUserState();

  // Check if user meets requirement
  const stateHierarchy = ['visitor', 'signed-up', 'subscribed'];
  const currentLevel = stateHierarchy.indexOf(currentState);
  const requiredLevel = stateHierarchy.indexOf(requiredState);

  if (currentLevel >= requiredLevel) {
    return <>{children}</>;
  }

  // Show upgrade prompt based on what's needed
  if (!user && requiredState !== 'visitor') {
    return (
      <>
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <CardTitle>Sign Up Required</CardTitle>
            <CardDescription>
              {feature ? `To use ${feature}, you need to create an account.` : 'Please sign up to continue.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What you'll get:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Save your meal plans</li>
                <li>• Access your history</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Sign Up Free
            </Button>
          </CardContent>
        </Card>
        
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="register"
        />
      </>
    );
  }

  if (user && !user.isSubscribed && requiredState === 'subscribed') {
    return (
      <>
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="flex items-center justify-center gap-2">
              Premium Required
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Zap className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </CardTitle>
            <CardDescription>
              {feature ? `${feature} is available with a premium subscription.` : 'Upgrade to access premium features.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Premium features include:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multi-week meal plans (1-4 weeks)</li>
                <li>• Tweak and customize meals</li>
                <li>• Smart grocery list integration</li>
                <li>• Advanced nutrition tracking</li>
                <li>• Feedback and meal rating</li>
              </ul>
            </div>
            <Button 
              onClick={() => setShowSubscriptionModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
        
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
        />
      </>
    );
  }

  return <>{children}</>;
};
