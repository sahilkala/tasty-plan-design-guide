
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChefHat, ArrowRight, Check, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface PlanGenerationFlowProps {
  onComplete?: () => void;
}

export const PlanGenerationFlow = ({ onComplete }: PlanGenerationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [customPreferences, setCustomPreferences] = useState({
    cuisines: [] as string[],
    restrictions: [] as string[],
    goals: [] as string[]
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const steps = ["Duration", "Preferences", "Generate"];

  const durations = [
    { weeks: 1, label: '1 Week', description: 'Perfect for trying out', available: true },
    { weeks: 2, label: '2 Weeks', description: 'Build healthy habits', available: user?.isSubscribed || false },
    { weeks: 3, label: '3 Weeks', description: 'Establish routines', available: user?.isSubscribed || false },
    { weeks: 4, label: '4 Weeks', description: 'Complete transformation', available: user?.isSubscribed || false },
  ];

  const cuisineOptions = [
    "Mediterranean", "Asian", "Italian", "Mexican",
    "Indian", "American", "Thai", "French"
  ];

  const restrictionOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free",
    "Nut-Free", "Low-Carb", "Keto", "Paleo"
  ];

  const goalOptions = [
    "Weight Loss", "Muscle Gain", "Heart Health",
    "Energy Boost", "Better Sleep", "General Wellness"
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const generatePlan = () => {
    toast({
      title: "Generating meal plan...",
      description: `Creating your ${selectedDuration}-week personalized meal plan`,
    });
    
    // Simulate plan generation
    setTimeout(() => {
      toast({
        title: "Meal plan ready!",
        description: "Your personalized meal plan has been generated successfully.",
      });
      if (onComplete) {
        onComplete();
      }
    }, 2000);
  };

  const handleCuisineToggle = (cuisine: string) => {
    setCustomPreferences(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  const handleRestrictionToggle = (restriction: string) => {
    setCustomPreferences(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setCustomPreferences(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Plan Duration</h2>
              <p className="text-gray-600">How long would you like your meal plan to be?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onClick={() => duration.available && setSelectedDuration(duration.weeks)}
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
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Preferences</h2>
              <p className="text-gray-600">Fine-tune your meal plan (optional)</p>
            </div>
            
            {user?.preferences && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Your Saved Preferences:</h3>
                <p className="text-sm text-blue-700">
                  We'll use your saved preferences. You can modify them below if needed.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Cuisines</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={customPreferences.cuisines.includes(cuisine) ? "default" : "outline"}
                      className={`cursor-pointer p-2 text-center justify-center hover:scale-105 transition-transform ${
                        customPreferences.cuisines.includes(cuisine) 
                          ? "bg-orange-500 hover:bg-orange-600" 
                          : "hover:border-orange-300"
                      }`}
                      onClick={() => handleCuisineToggle(cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Dietary Restrictions</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {restrictionOptions.map((restriction) => (
                    <Badge
                      key={restriction}
                      variant={customPreferences.restrictions.includes(restriction) ? "default" : "outline"}
                      className={`cursor-pointer p-2 text-center justify-center hover:scale-105 transition-transform ${
                        customPreferences.restrictions.includes(restriction) 
                          ? "bg-orange-500 hover:bg-orange-600" 
                          : "hover:border-orange-300"
                      }`}
                      onClick={() => handleRestrictionToggle(restriction)}
                    >
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Health Goals</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {goalOptions.map((goal) => (
                    <Badge
                      key={goal}
                      variant={customPreferences.goals.includes(goal) ? "default" : "outline"}
                      className={`cursor-pointer p-2 text-center justify-center hover:scale-105 transition-transform ${
                        customPreferences.goals.includes(goal) 
                          ? "bg-orange-500 hover:bg-orange-600" 
                          : "hover:border-orange-300"
                      }`}
                      onClick={() => handleGoalToggle(goal)}
                    >
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Ready to Generate!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your {selectedDuration}-week personalized meal plan
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Plan Summary:</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-700">Duration: </span>
                  <span className="text-sm text-gray-600">{selectedDuration} week{selectedDuration > 1 ? 's' : ''}</span>
                </div>
                {(customPreferences.cuisines.length > 0 || user?.preferences?.cuisines?.length) && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Cuisines: </span>
                    <span className="text-sm text-gray-600">
                      {customPreferences.cuisines.length > 0 
                        ? customPreferences.cuisines.join(", ")
                        : user?.preferences?.cuisines?.join(", ")
                      }
                    </span>
                  </div>
                )}
                {(customPreferences.restrictions.length > 0 || user?.preferences?.dietaryRestrictions?.length) && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Restrictions: </span>
                    <span className="text-sm text-gray-600">
                      {customPreferences.restrictions.length > 0 
                        ? customPreferences.restrictions.join(", ")
                        : user?.preferences?.dietaryRestrictions?.join(", ")
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </CardTitle>
            <div className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {renderStepContent()}
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button 
              onClick={currentStep === steps.length - 1 ? generatePlan : nextStep}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              {currentStep === steps.length - 1 ? "Generate Plan" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
